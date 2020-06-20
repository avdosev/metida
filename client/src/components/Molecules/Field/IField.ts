import {IValid} from "../../../services/validator/validator";
import {ITextField} from "../../Atoms/ITextField";
import {IShowStrategy} from "../../../services/validator/show_error_strategies";

interface ITextFieldErrored extends ITextField {
    regexp: string,
    showErrorStrategy: IShowStrategy
}

export type {ITextFieldErrored}