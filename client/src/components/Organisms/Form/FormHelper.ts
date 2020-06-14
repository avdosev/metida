import {get, post} from "../../../services/router";
import {IPublicUser} from "../IPrivateUser";
import {writeUserInLS} from "../../../services/localstorage";


interface IPush {
    [name: string]: string
}

export const loginQuery = async (e: any, serverRoute: string, allFields: IPush) => {
    console.log(allFields)

    const response = await post(serverRoute, allFields, (res) => res)
    console.log(response)
    if (response.ok) {
        const userinfo = await response.json()
        const accessToken = userinfo.accessToken

        let publicUser = await get(`/api/author/${userinfo.username}`) // TODO специфическая херня
        delete publicUser['articles'] // я бы хотел на сервере иметь роут для возвращения безопасных значений юзера
        publicUser['accessToken'] = accessToken

        writeUserInLS(publicUser)
        console.log(publicUser)
        return ''
    }
    else {
        const error = await response.text()
        console.error(error)
        return error
    }
}

