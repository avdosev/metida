import React from 'react';
import { FieldTextarea } from '../../Atoms/Field/FieldTextarea';
import { initialValidator, Validators } from '../IValidators';
import { Field, IIState, Valid } from '../IAuth';
import { get, post } from '../../../services/router';
import { getCurrentUser, isAuth } from '../../../services/user';
import { getArticleId } from '../../../services/comments';
import { IComments } from '../IComment';
import InnerCommentForm from './InnerCommentForm';

interface IProps {
    onCommentChanged: (comment: Array<IComments>) => void;
    replyCommentId?: number;
    replyCommentAuthorName?: string;
    onReplyCommentSend?: () => void;
}

interface IState extends IIState {
    isAuth: boolean;
    isRendered: boolean;
    comment: Field;
    linkToSend: string;
    articleId: string;
}

export default class CommentForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const articleId = getArticleId();
        this.state = {
            isAuth: false,
            comment: { value: '', valid: Valid.Intermediate },
            validators: initialValidator,
            isRendered: false, // нужно для того, чтобы сразу после рендера добавить никнейм автора, на который  мы отвечаем
            articleId: articleId,
            linkToSend: `/api/post/${articleId}/comments`,
        };
    }

    handleUserInput = (event: any) => {
        const valid = this.validateField(event.target.name, event.target.value);
        this.setState({ [event.target.name]: { value: event.target.value, valid: valid } });
    };

    validateField = (fieldName: string, fieldValue: string) => {
        const fieldValid = !!fieldValue.match(this.state.validators![fieldName].regexp);
        if (fieldValid) return Valid.Acceptable;
        else return Valid.Invalid;
    };

    async componentDidMount() {
        const authed = await isAuth();
        console.log(this.props);
        if (authed && !this.state.isRendered) {
            const replyCommentAuthorName =
                this.props.replyCommentId || this.props.replyCommentAuthorName
                    ? this.props.replyCommentAuthorName + ', '
                    : '';
            this.setState({
                isAuth: authed,
                isRendered: true,
                comment: {
                    value: replyCommentAuthorName,
                    valid: this.validateField('comment', this.state.comment.value),
                },
            });
        }
    }

    onValidatorChange = async (validators: Validators) => {
        this.setState({ validators: validators });
    };

    submitBtn = async (event: any) => {
        const user = getCurrentUser();
        if (!user) {
            console.error('Непредвиденная ситуация');
            return;
        }

        const response = await post(this.state.linkToSend, {
            userId: user.id,
            articleId: this.state.articleId,
            comment: this.state.comment.value,
            answeringId: this.props.replyCommentId,
        });
        console.log(response);
        const newComments = await get(this.state.linkToSend);

        this.props.onCommentChanged(newComments);

        if (this.props.onReplyCommentSend)
            // это тупо затычка для того, чтобы закрывать окошко ответа на коммент после его отправки
            this.props.onReplyCommentSend();
    };

    render() {
        let comment: JSX.Element;
        if (this.state.isAuth) {
            comment = (
                <InnerCommentForm
                    onSubmit={this.submitBtn}
                    onValidatorChange={this.onValidatorChange}
                    validators={this.state.validators}
                    comment={this.state.comment}
                    linkToSend={this.state.linkToSend}
                    validateFunc={this.handleUserInput}
                    extendedButtons={
                        <button type="button" className="mainButton">
                            Предпросмотр
                        </button>
                    }
                />
            );
        } else {
            comment = <p>Зарегистрируйся, если хочешь оставить коммент</p>;
        }

        return (
            <>
                <h3>Оставить комментарий</h3>
                {comment}
            </>
        );
    }
}
