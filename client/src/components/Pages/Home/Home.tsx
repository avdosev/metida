import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import {IUser} from "../../Organisms/IUser";
import Profile from "../../Molecules/Profile/Profile";


export default function Home() {
    return (<SimpleTemplate header={<Header />} content={<Profile isHome={true}  /> } />
      )
}