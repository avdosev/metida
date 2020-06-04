console.log(process.env.NODE_ENV)
let serverUri: string;

if (process.env.NODE_ENV === "development") {
    const host = "localhost"
    const serverPort = 7080
    serverUri = `http://${host}:${serverPort}`
} else {
    serverUri = ''

}

export {serverUri}
