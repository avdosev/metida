export interface IVerifiable {
    validate(): ValidatorState
    changeValidatorState(state: ValidatorState): void
}

export interface IValid {
    valid: ValidatorState
}

export interface regexpVerifiable {
    acceptable: RegExp
    intermediate: RegExp
}

export function verifyByRegexps(str: string, regexps: regexpVerifiable) : ValidatorState {
    if (str.match(regexps.acceptable)) return ValidatorState.Acceptable
    else if (str.match(regexps.intermediate)) return ValidatorState.Intermediate
    else return ValidatorState.Invalid
}

export function verifyByRegexp(str: string, acceptable: RegExp) : ValidatorState {
    if (str.match(acceptable)) return ValidatorState.Acceptable
    else if (str.length === 0) return ValidatorState.Intermediate
    else return ValidatorState.Invalid
}

export enum ValidatorState {
    Invalid,
    Acceptable,
    Intermediate
}