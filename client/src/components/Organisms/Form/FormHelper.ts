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
    // пробегаемся по всем элементам и выделяем нужные поля, сендим их
    // ответить сам на вопрос - нужно ли тут проверять поля, или они уэе точно к этому времени проверены?

    // const mycallback = (response: any) => { // ох уж не знаю, мне кажется, это хуйня
    //     console.log(response)
    //     if (response.ok) {
    //         return response.json()
    //     } else {
    //         return response.text()
    //     }
    // }

    const response = await post(ROUTES.SIGN_IN, allFields, (res) => res)
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

