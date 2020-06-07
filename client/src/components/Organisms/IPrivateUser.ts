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
    articles: Array<any>
}

interface ProfileArticle {
    id: number,
    header: string,
    disclaimer: string
}

interface UserInfo extends IPrivateUser {
    articles: Array<ProfileArticle>
}

const initialUser: IPublicUser = {
    createdAt: new Date(),
    id: 0,
    updatedAt: new Date(),
    username: "",
    articles: []
}


export type {IPrivateUser, ProfileArticle, UserInfo, IPublicUser}
export {initialUser}
