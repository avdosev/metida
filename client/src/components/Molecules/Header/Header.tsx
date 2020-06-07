import React, {FunctionComponent, useEffect, useState} from "react";
import "./header.css"
import "../../styles/flex.css"
import "../../styles/main.css"
import {
    Link
} from "react-router-dom";
import Burger from "../Burger/Burger";
import {isAuth} from "../../../services/user";
import {initialUser, IPublicUser} from "../../Organisms/IPrivateUser";
import {UserConsumer} from "../UserContextProvider";

interface IHeader {
    user: IPublicUser | undefined
}

export const UserContext = React.createContext<IHeader>({user: initialUser})


const Header: () => JSX.Element = () => {
    const [authorised, setAuthorised] = useState(false)


    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuth()
            setAuthorised(auth)
        }
        checkAuth() // не смотря на предупреждение, все работает корректно
    })

    return (
        <UserConsumer>
            { ({user}: IHeader) => (
                <header className="header">
                    <div className="header_inner flex alignCenter space_between_inner">
                        <div className="logo">
                            <Link to="/">
                                <img className="logo__image" src={process.env.PUBLIC_URL + '/img/fav.svg'} alt="Metida"
                                     width="100"/>
                                <div className="logo__title">
                                    <div className="logo__underline"/>
                                </div>
                            </Link>
                        </div>

                        {console.log(user)}

                        <div className="regSection">
                            {user?.username}
                            <Burger authorised={authorised}/>
                        </div>

                    </div>
                    <hr/>
                </header>
            )}

        </UserConsumer>)
}


export default Header