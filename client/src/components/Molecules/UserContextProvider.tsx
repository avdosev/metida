import React, { createContext } from 'react';
import {initialUser, IPublicUser} from "../Organisms/IPrivateUser";

const UserContext = createContext({
    user: initialUser,
    updateUser: (user: IPublicUser) => {},
});

export class UserProvider extends React.Component {
    updateUser = (user: IPublicUser) => {
        this.setState({ user: user });
    };

    state = {
        user: initialUser,
        updateUser: this.updateUser,
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export const UserConsumer = UserContext.Consumer;
