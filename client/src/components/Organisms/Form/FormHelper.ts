import {Field, IIState} from "../IAuth";
import {post} from "../../Router";
import * as ROUTES from "../../../config/routes";
import {Redirect} from "react-router-dom";
import React from "react";

interface IPush {
    [name: string]: string
}

export const pushToA = async (e: any, serverRoute: string, allFields: IPush) => {
    console.log(allFields)

    const response = await post(serverRoute, allFields, (res) => res)
    if (response.ok) {
        const userinfo = response.json()
        localStorage.setItem("user", JSON.stringify(userinfo))
        return ''
    }
    else {
        const error = await response.text()
        console.log(error)
        return error
    }

}
