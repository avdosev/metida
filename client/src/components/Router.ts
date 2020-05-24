import { serverUri } from "./config";


async function query(method: string, url: string, data: any=null, callback?: {(response: any): void } ) {
    let response;
    if (method == "post") {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data
            })
        }
        response = await fetch(serverUri + url, options);

    }
    else {
        response = await fetch(serverUri + url);

    }



    if (!!callback) { // тут тип ты можешь сделать свой анализ запроса
        return callback(response)
    }
    else {
        const { status } = response;
        if (status === 404) {
            const { statusText } = response;
            console.log('Статус', statusText);
        }
        return response.json();
    }
}

async function get(url: string) {
    return await query("get", url)
}

async function post(url: string, data: any, callback?: {(response: any): void }) {
    return  await query("post", url, data, callback);
}


export {get, post}