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

export type {IUser}