import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import {IUser} from "../../Organisms/IUser";
import Profile from "../../Molecules/Profile/Profile";


export default function Home() {
    const userString = localStorage.getItem('user')
    let user: IUser = {accessToken: "", activatedEmail: false, createdAt: new Date(), email: "", id: 0, password: "", updatedAt: new Date(), username: ""}
    if (userString) {
        user = JSON.parse(userString)
        console.log(user)
    }


    return (<SimpleTemplate header={<Header />} content={<Profile user={user} isHome={true}  /> } />
      )
}