import React from "react";
import SimpleTemplate from "../../Templates/SimpleTemplate";
import Header from "../../Molecules/Header/Header";

export default function Offline() {
    return (<SimpleTemplate header={Header} content={
        <div className="layout_body">
             <h1> Есть интернет? А если найду? </h1>
        </div>
    } />)
}