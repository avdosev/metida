import {Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";


interface IProps {
    onRenderPreview: () => void
}

interface IState extends IIState {
    header: Field,
    content: Field,
    disclaimer: Field,
    previews: boolean,
}

export type {IProps, IState}