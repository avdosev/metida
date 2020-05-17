import { serverUri } from "./config";


async function get(url: string) {
    const response = await fetch(serverUri + url);
    const { status } = response;
    if (status === 404) {
        const { statusText } = response;
        console.log('Статус', statusText);
    }
    return response.json();
}

async function post(url: string, data: any, callback: {(response: any): void }) {
    const options = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data
        })
    }

    const response = await fetch(serverUri + url, options);
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


export {get, post}