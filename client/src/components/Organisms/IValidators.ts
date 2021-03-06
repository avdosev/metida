import { IVerifiable, ValidatorState, verifyByRegexp } from '../../services/validator/validator';
import React from 'react';

export { ValidatorState } from '../../services/validator/validator';

export interface Field {
    value: string;
    valid: ValidatorState;
}

export class VerifiableField implements IVerifiable, Field {
    validator: (str: string) => ValidatorState;
    value: string;
    valid: ValidatorState;

    constructor(value: string, validator: (str: string) => ValidatorState) {
        this.value = value;
        this.valid = validator(value);
        this.validator = validator;
    }

    validate = (): ValidatorState => {
        return this.validator(this.value);
    };

    changeValidatorState(state: ValidatorState): void {
        this.valid = state;
    }

    updatedValue(value: string) {
        this.value = value;
        return this;
    }
}

export function UpdateVerifiableField<T extends React.Component, K extends keyof T['state']>(
    obj: T,
    fieldKey: K,
    callback?: (() => void) | undefined
) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.persist();
        obj.setState(
            (state: T['state']) => ({
                // @ts-ignore
                [fieldKey]: state[fieldKey].updatedValue(event.target.value),
            }),
            callback
        );
    };
}

export interface ValidatorFields {
    error_str: string;
    regexp: string;
    EventError?: Array<string>;
}

export function validateField(field: ValidatorFields): (str: string) => ValidatorState {
    const regexp = new RegExp(field.regexp);
    return (str: string) => verifyByRegexp(str, regexp);
}

export interface Validators {
    header: ValidatorFields;
    comment: ValidatorFields;
    disclaimer: ValidatorFields;
    content: ValidatorFields;
    email: ValidatorFields;
    repassword: ValidatorFields;
    password: ValidatorFields;
    login: ValidatorFields;
}

export const validators: Validators = {
    comment: {
        error_str: 'Коммент уж слишком маленький. Прям как ...',
        EventError: ['Коммент не удовлетворяет требованиям'],
        regexp: '^.{6,}',
    },
    header: {
        error_str: 'Заголовок должен быть длиннее',
        EventError: ['Тебе не стыдно?'],
        regexp: '.{10,}',
    },
    disclaimer: {
        error_str: 'Дисклеймер должен быть длиннее',
        EventError: ['Почему ты такой немногословный?'],
        regexp: '.{10,}',
    },
    content: {
        error_str: 'Контент должен быть длиннее',
        EventError: ['Все совсем плохо? Напиши мне на почту, побеседуем'],
        regexp: '.{10,}',
    },
    email: {
        error_str: 'Проверьте правильность введенного e-mail',
        EventError: ['Вводи почту правильно'],
        regexp: '.+@.+\\..+',
    },
    password: {
        error_str: 'Пароль должен содержать более 5 символов',
        regexp: '.{5,}',
    },
    repassword: {
        error_str: 'Введенные пароли не совпадают',
        regexp: '.{5,}',
    },
    login: {
        error_str: 'Логин должен состоять более чем из 3 символов',
        regexp: '.{3,}',
    },
};
