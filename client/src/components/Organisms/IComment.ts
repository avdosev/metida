import {initialUser, IPrivateUser, IPublicUser} from "./IPrivateUser";

interface IComment {
    id: number,
    commentAuthorId: number,
    text: string,
    articleId: string,
    answeringId: number | null,
    raiting: number | null,
    createdAt: Date,
    updatedAt: Date,
    user: IPublicUser
}

interface ITreeComments {
    comment: IComment,
    childs: Array<ITreeComments>
}

const initialComment: IComment = {
    id: 0,
    commentAuthorId: 0,
    text: "",
    articleId: "",
    answeringId: null,
    raiting: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: initialUser
}

export type {IComment as IComments, ITreeComments}

export {initialComment}
