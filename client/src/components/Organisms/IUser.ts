interface IUser {
    about?: string,
    accessToken: string,
    activatedEmail: boolean
    avatar?: null
    createdAt: Date
    email: string,
    firstname?: string
    id: number
    last_login?: Date
    lastname?: string
    password: string,
    status?: string,
    updatedAt: Date,
    username: string,
}

interface ProfileArticle {
    id: number,
    header: string,
    disclaimer: string
}

interface UserInfo extends IUser {
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


export type {IUser, ProfileArticle, UserInfo}
export {initialUser}
