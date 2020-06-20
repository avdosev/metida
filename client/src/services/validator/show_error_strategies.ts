import {ValidatorState} from "./validator";

export interface IShowStrategy {
    (validatorState: ValidatorState): boolean;
}

const IntermediateIsValid: IShowStrategy = function (validatorState) {
    return validatorState === ValidatorState.Invalid
};

const IntermediateIsInvalid: IShowStrategy = function (validatorState) {
    return validatorState !== ValidatorState.Acceptable
};

export {IntermediateIsInvalid, IntermediateIsValid};