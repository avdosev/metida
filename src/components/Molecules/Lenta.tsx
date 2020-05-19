import React from "react";
import {Post} from "../Atoms/Post";


export default function Lenta(props: any) {
    return (<div className="lenta">
        {props.children}
    </div>)

}