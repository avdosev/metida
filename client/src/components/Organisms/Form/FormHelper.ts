import {post} from "../../Router";


interface IPush {
    [name: string]: string
}

export const pushToA = async (e: any, serverRoute: string, allFields: IPush) => {
    console.log(allFields)

    const response = await post(serverRoute, allFields, (res) => res)
    console.log(response)
    if (response.ok) {
        const userinfo = await response.json()
        console.log(userinfo)
        localStorage.setItem("user", JSON.stringify(userinfo))
        return ''
    }
    else {
        const error = await response.text()
        console.log(error)
        return error
    }

}

