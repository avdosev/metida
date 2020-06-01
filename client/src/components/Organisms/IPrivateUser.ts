interface IPrivateUser extends IPublicUser{
    activatedEmail: boolean
    email: string,
    password: string,
    accessToken: string,

}

interface IPublicUser {
    about?: string,
    avatar?: null
    createdAt: Date
    firstname?: string
    id: number
    last_login?: Date
    lastname?: string
    status?: string,
    updatedAt: Date,
    username: string,
}

interface ProfileArticle {
    id: number,
    header: string,
    disclaimer: string
}

interface UserInfo extends IPrivateUser {
    articles: Array<ProfileArticle>
}

const initialUser: UserInfo = {
    articles: [],
    accessToken: "",
    activatedEmail: false,
    createdAt: new Date(),
    email: "",
    id: 0,
    password: "",
    updatedAt: new Date(),
    username: ""
}


export type {IPrivateUser, ProfileArticle, UserInfo, IPublicUser}
export {initialUser}
