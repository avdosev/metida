interface IUser {
    about: string | null
    accessToken: string,
    activatedEmail: boolean
    avatar: null
    createdAt: Date
    email: string,
    firstname: string | null
    id: number
    last_login: Date | null
    lastname: string | null
    password: string,
    status: string | null,
    updatedAt: Date,
    username: string,
}

export type {IUser}