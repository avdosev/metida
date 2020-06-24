import { Validators } from '../IValidators';
import { IIState, Field } from '../IAuth';

interface IProps {}

interface IState extends IIState {
    repassword: Field;
    login: Field;
    email: Field;
    password: Field;
    serverError: Field;
}

export type { IState, IProps };
