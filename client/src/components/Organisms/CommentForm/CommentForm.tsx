import React from "react";
import {FieldTextarea} from "../../Molecules/Field/FieldTextarea";
import {initialValidator, Validators} from "../IValidators";
import {Field, IIState} from "../IAuth";
import {get, post} from "../../../services/router";
import {getCurrentUser, isAuth} from "../../../services/user"
import Form from "../Form/Form";
import {getArticleId} from "../../../services/comments";
import {IComments} from "../IComment";
import {loginQuery} from "../Form/FormHelper";

interface IProps {
    onCommentChanged: (comment: Array<IComments>) => void
    replyCommentId?: number
    replyCommentAuthorName?: string
    onReplyCommentSend?: () => void
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
            validators: initialValidator,
            isRendered: false
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

    async componentDidMount() {
        const authed = await isAuth()
        this.setState({isAuth: authed})
    }

    onValidatorChange = async (validators: Validators) => {
        this.setState({validators: validators})
    }

    submitBtn = async (event: any) => {
        const articleId = getArticleId()

        const user = getCurrentUser()
        const response = await post(`/api/post/${articleId}/comments`, {
            userId: user.id,
            articleId: articleId,
            comment: this.state.comment.value,
            answeringId: this.props.replyCommentId
        })
        console.log(response)
        const newComments = await get(`/api/post/${articleId}/comments`)

        this.props.onCommentChanged(newComments)

        if (this.props.onReplyCommentSend) // это тупо затычка для того, чтобы закрывать окошко ответа на коммент после его отправки
            this.props.onReplyCommentSend()
    }


    render() {

        let comment: JSX.Element

        if (this.state.isAuth) {
            if (!this.state.isRendered && (this.props.replyCommentId || this.props.replyCommentAuthorName)) {
                this.setState({
                    isRendered: true,
                    comment: {value: this.props.replyCommentAuthorName + ", ", valid: false}
                })
            } // TODO вызывает серьезный варнинг

            comment = <>
                <Form onValidatorChange={this.onValidatorChange} action="#####"
                      onSubmit={this.submitBtn} // TODO определиться с экшеном
                      className="comment" buttonName="Отправить"><FieldTextarea fieldClass="comment_area"
                                                                                placeholder="Комментарий..."
                                                                                fieldName="comment"
                                                                                regexp={this.state.validators.comment.regexp}
                                                                                value={this.state.comment.value}
                                                                                valid={this.state.comment.valid}
                                                                                text={this.state.validators.comment.error_str}
                                                                                validateFunc={this.handleUserInput}/>
                    <div className="button_block">
                        <input type="button" id="veiw" value="Предпросмотр"/>
                    </div>
                </Form>
            </>

        } else {
            comment = <p>Зарегистрируйся, если хочешь оставить коммент</p>
        }

        return (
            <>
                <h3>Оставить комментарий</h3>
                {comment}
            </>)

    }
}

