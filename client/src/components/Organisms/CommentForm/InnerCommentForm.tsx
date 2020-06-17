import React, {ChangeEvent, FC} from "react";
import Form from "../../Molecules/Form/Form";
import {FieldTextarea} from "../../Atoms/Field/FieldTextarea";
import {Validators} from "../IValidators";
import {Field} from "../IAuth";

interface IProps {
    onValidatorChange: (validators: Validators) => void
    onSubmit: (event: any) => void,
    linkToSend: string,
    comment: Field,
    validators: Validators,
    validateFunc: (event: React.ChangeEvent<any>) => void
    extendedButtons?: Array<JSX.Element> | JSX.Element
}

const InnerCommentForm: FC<IProps> = (props: IProps) =>  {

    return (
    <Form onValidatorChange={props.onValidatorChange}
          action={props.linkToSend}
          onSubmit={props.onSubmit}
          extendedButtons={props.extendedButtons}
          className="comment"
          buttonName="Отправить">

        <FieldTextarea fieldClass="comment_area"
                       placeholder="Комментарий..."
                       fieldName="comment"
                       regexp={props.validators.comment.regexp}
                       value={props.comment.value}
                       valid={props.comment.valid}
                       text={props.validators.comment.error_str}
                       validateFunc={props.validateFunc}/>
    </Form>)
}

export default InnerCommentForm