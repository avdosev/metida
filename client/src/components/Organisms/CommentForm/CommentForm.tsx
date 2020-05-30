import React from "react";
import {FieldTextarea} from "../../Molecules/Field/FieldTextarea";
import {initialValidator, Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";
import {post} from "../../../services/router";
import {getCurrentUser, isAuth} from "../../../services/user"
import Form from "../Form/Form";
import {getArticleId} from "../../Pages/Post/comments";
import {IComments} from "../IComment";

interface IProps {
    onCommentChanged: (comment: IComments) => void
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
    }

    submitBtn = async (event: any) => {
        const articleId = getArticleId()
        const user = getCurrentUser()
        const response = await post("/api/post/" + articleId + "/comments", {
            userId: user.id,
            articleId: articleId,
            comment: this.state.comment.value
        })
        console.log(response)

        const comment: IComments = {
            raiting: null,
            answeringId: null,
            articleId: articleId,
            child: [],
            commentAuthorId: 0,
            id: 0,
            text: this.state.comment.value,
            updatedAt: new Date(), createdAt: new Date(),
            user: user
        }


        this.props.onCommentChanged(comment)
    }


    render() {

        let comment: JSX.Element
        if (this.state.isAuth) {
            comment = <>
                <FieldTextarea fieldClass="comment_area"
                               placeholder="Комментарий..."
                               fieldName="comment"
                               regexp={this.state.validators.comment.regexp}
                               value={this.state.comment.value}
                               valid={this.state.comment.valid}
                               text={this.state.validators.comment.error_str}
                               validateFunc={this.handleUserInput}/>
                <div className="button_block">
                    {/*<button className="EnterButton" value="Отправить"/>*/}
                    <input type="button" id="veiw" value="Предпросмотр"/>
                </div>
            </>

        } else {
            comment = <p>Зарегистрируйся, если хочешь оставить коммент</p>
        }

        return <>
            <h3> Оставить комментарий</h3>
            <Form onValidatorChange={this.onValidatorChange} action="#####" onSubmit={this.submitBtn}
                  className="comment" buttonName="Отправить">
                {comment}
            </Form>
        </>

    }
}

