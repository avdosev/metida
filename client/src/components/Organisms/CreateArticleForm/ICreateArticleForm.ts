import {Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";


interface IProps {
    onRenderPreview: (header: string, disclaimer: string, content: string) => void
}

interface IState extends IIState {
    header: Field,
    content: Field,
    disclaimer: Field,
    isPreview: boolean,
}

export type {IProps, IState}