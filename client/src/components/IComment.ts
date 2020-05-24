import React from "react";

interface IComments {
    id: number,
    commentAuthorId: number,
    text: string,
    articleId: number,
    answeringId: number | null,
    raiting: number | null,
    createdAt: Date,
    updatedAt: Date,
    user: {
        username: string,
        about: null,
        lastname: null,
        firstname: null,
        avatar: null
    },
    child: Array<IComments> | null
}

export type {IComments}