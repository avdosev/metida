interface IPrivateUser extends IPublicUser {
    activatedEmail: boolean;
    email: string;
    password: string;
}

interface IPublicUser {
    about?: string;
    accessToken: string;
    avatar?: null;
    createdAt: Date;
    firstname?: string;
    id: number;
    last_login?: Date;
    lastname?: string;
    status?: string;
    updatedAt: Date;
    username: string;
    articles: Array<any>;
}

interface ProfileArticle {
    id: number;
    header: string;
    disclaimer: string;
}

interface UserInfo {
    // придет после запроса на author/username, а также будет лежать в хранилище
    id: number;
    accessToken: string;
    avatar: null | string;
    about: null | string;
    username: string;
    firstname: null | string;
    lastname: null | string;
    articles?: Array<ProfileArticle>;
}

const initialUser: IPublicUser = {
    createdAt: new Date(),
    id: 0,
    accessToken: '',
    updatedAt: new Date(),
    username: '',
    articles: [],
};

const initialAuthor: UserInfo = {
    id: 0,
    accessToken: '',
    username: '',
    about: null,
    avatar: null,
    firstname: null,
    lastname: null,
    articles: [],
};

export type { IPrivateUser, ProfileArticle, UserInfo, IPublicUser };
export { initialUser, initialAuthor };
