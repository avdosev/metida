import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";
import Profile from "./Profile";

export default function ProfilePage() {
    return (<SimpleTemplate header={<Header />} content={<Profile />} />)
}