import React from "react";
import {FieldTextarea} from "../../Molecules/Field/FieldTextarea";
import {initialValidator, Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";
import {isAuth} from "../../Router";
import Form from "../Form/Form";

interface IProps {
}

interface IState extends IIState {
    isAuth: boolean,
    comment: Field
}

export default class CommentForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isAuth: false,
            comment: {value: '', valid: false},
            validators: initialValidator
        }

    }


    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value)
        this.setState({[event.target.name]: {value: event.target.value, valid: valid}})
    }

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = fieldValue.match(this.state.validators![fieldName].regexp)
        return !!fieldValid;
    }

    onValidatorChange = async (validators: Validators) => {
        this.setState({validators: validators})

        const authed = await isAuth()
        this.setState({isAuth: authed})
        console.log(authed)
    }

    submitBtn = (event: any) => {

    }


    render() {

        let comment: JSX.Element
        if (this.state.isAuth) {
            comment =
                <>
                    <h3> Оставить комментарий</h3>
                    <Form onValidatorChange={this.onValidatorChange} action="#####" onSubmit={this.submitBtn}
                          className="comment" buttonName="Отправить">
                        <FieldTextarea fieldClass="comment_area"
                                       placeholder="Комментарий..."
                                       fieldName="comment"
                                       regexp={this.state.validators.comment.regexp}
                                       value={this.state.comment.value}
                                       valid={this.state.comment.valid}
                                       validateFunc={this.handleUserInput}/>
                        <div className="button_block">
                            {/*<button className="EnterButton" value="Отправить"/>*/}
                            <input type="button" id="veiw" value="Предпросмотр"/>
                        </div>
                    </Form>
                </>
        } else {
            comment = <p>Зарегистрируйся, если хочешь оставить коммент</p>
        }
        return comment

    }
}

