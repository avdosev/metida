
export function get(item: string) {
    return localStorage.getItem(item)
}

export function set(item: string, data: string) {
    console.log(item, data)
    localStorage.setItem(item, data)
}

export function remove(item: string) {
    localStorage.removeItem(item)
}