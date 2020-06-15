import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../../containers/ChangeHeaderEvent/HeaderContainer";
import {IPrivateUser} from "../../Organisms/IPrivateUser";
import Profile from "../../Molecules/Profile/Profile";


export default function Home() {
    return (<SimpleTemplate>
            <Profile isHome={true}/>
        </SimpleTemplate>
      )
}