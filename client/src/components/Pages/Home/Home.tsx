import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import {IPrivateUser} from "../../Organisms/IPrivateUser";
import Profile from "../../Molecules/Profile/Profile";


export default function Home() {
    return (<SimpleTemplate content={<Profile isHome={true}  /> } />
      )
}