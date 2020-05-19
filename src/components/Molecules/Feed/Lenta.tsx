import React from "react";
import {Post} from "../../Atoms/Post/Post";


export default function Lenta(props: any) {
    return (<div className="lenta">
        {props.children}
    </div>)

}