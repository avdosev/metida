export function getData(url: string) {
    return fetch(url).then(response => {
        if (response.ok)
            return response.text()
        else {
            return Promise.reject(response)
        }
    }).then(text => {
        return JSON.parse(text, (key, value) => {
            if (key === 'regexp') {
                return RegExp(value);
            } else {
                return value;
            }
        })
    })        
}