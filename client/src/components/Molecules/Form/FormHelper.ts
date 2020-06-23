import {get, post} from "../../../services/router";
import {IPublicUser} from "../../Organisms/IPrivateUser";
import {set as setls} from "../../../services/localstorage";
import {userFieldName} from "../../../config/localstorage"
import {curry} from "ramda";

interface IPush {
    [name: string]: string
}

export const loginQuery = async (e: any, serverRoute: string, allFields: IPush) => {
    console.log(allFields)
    const carriedLS = curry(setls)
    const setUser = carriedLS(userFieldName)

    const response = await post(serverRoute, allFields, (res) => res)
    console.log(response)
    if (response.ok) {
        const userinfo = await response.json()
        setUser(JSON.stringify(userinfo))

        console.log(userinfo)
        return ''
    }
    else {
        const error = await response.text()
        console.error(error)
        return error
    }
}

