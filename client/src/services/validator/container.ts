import { IVerifiable, ValidatorState } from './validator';

export interface VerifiableContainer {
    elements: Iterable<IVerifiable>;
    verifyElements(): void;
    add(...items: IVerifiable[]): void;
    allValid(): boolean;
}

export class Container implements VerifiableContainer {
    elements: Array<IVerifiable>;

    constructor(...items: IVerifiable[]) {
        this.elements = [...items];
    }

    verifyElements(): void {
        for (const element of this.elements) {
            const state = element.validate();
            element.changeValidatorState(state);
        }
    }

    add(...items: IVerifiable[]): void {
        this.elements.push(...items);
    }

    allValid(): boolean {
        const isAcceptable = (state: ValidatorState) => state === ValidatorState.Acceptable;
        return this.elements.reduce<boolean>((acc, cur) => {
            return acc && isAcceptable(cur.validate());
        }, true);
    }
}
