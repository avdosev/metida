import React from "react";
import FieldTextarea from "../../Molecules/Field/FieldTextarea";
import {Field, validators, Validators, ValidatorState} from "../IValidators";
import {get, post} from "../../../services/router";
import {getCurrentUser, isAuth} from "../../../services/user"
import {getArticleId} from "../../../services/comments";
import {IComments} from "../IComment";
import ValidateForm from "../ValidableForm/ValidateForm";
import {Container} from "../../../services/validator/container";
import {IntermediateIsValid} from "../../../services/validator/show_error_strategies";
import {verifyByRegexp} from "../../../services/validator/validator";

interface IProps {
    onCommentChanged: (comment: Array<IComments>) => void
    replyCommentId?: number
    replyCommentAuthorName?: string
    onReplyCommentSend?: () => void
}

interface IState {
    isAuth: boolean,
    isRendered: boolean,
    comment: Field,
    linkToSend: string,
    articleId: string
}

function verifyComment(str: string): ValidatorState {
    return verifyByRegexp(str, new RegExp(validators.comment.regexp))
}

export default class CommentForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const articleId = getArticleId()
        this.state = {
            isAuth: false,
            comment: {value: '', valid: ValidatorState.Intermediate},
            isRendered: false, // нужно для того, чтобы сразу после рендера добавить никнейм автора, на который  мы отвечаем
            articleId: articleId,
            linkToSend: `/api/post/${articleId}/comments`
        }
    }

    async componentDidMount() {
        const authed = await isAuth()
        console.log(this.props)
        if (authed && !this.state.isRendered ) {
            const replyCommentAuthorName =  this.props.replyCommentId || this.props.replyCommentAuthorName ? this.props.replyCommentAuthorName + ", " : ""
            this.setState({
                isAuth: authed,
                isRendered: true,
                comment: {
                    value: replyCommentAuthorName,
                    valid: verifyComment(this.state.comment.value)
                }
            })
        }
    }

    submitBtn = async (event: any) => {
        const user = getCurrentUser()
        if (!user) {
            console.error("Непредвиденная ситуация")
            return
        }

        const response = await post(this.state.linkToSend, {
            userId: user.id,
            articleId: this.state.articleId,
            comment: this.state.comment.value,
            answeringId: this.props.replyCommentId
        })
        console.log(response)
        const newComments = await get(this.state.linkToSend)

        this.props.onCommentChanged(newComments)

        if (this.props.onReplyCommentSend) // это тупо затычка для того, чтобы закрывать окошко ответа на коммент после его отправки
            this.props.onReplyCommentSend()
    }


    render() {
        let comment: JSX.Element
        if (this.state.isAuth) {
            const commentInput = new FieldTextarea ({
                fieldClass: "comment_area",
                placeholder: "Комментарий...",
                fieldName: "comment",
                regexp: validators.comment.regexp,
                value: this.state.comment.value,
                errorText: validators.comment.error_str,
                validate: verifyComment,
                showErrorStrategy: IntermediateIsValid
            })

            const container = new Container(commentInput);

            comment = <ValidateForm
                action={this.state.linkToSend}
                onSubmit={this.submitBtn}
                className="comment"
                verifiableElements={container}
            >

                {commentInput}

                <div className="button_block">
                    <button type="submit" className="mainButton" >Отправить </button>
                    <button type="button" className="mainButton" >Предпросмотр </button>
                </div>

            </ValidateForm>
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