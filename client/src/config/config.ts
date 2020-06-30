console.log(process.env.NODE_ENV);
let serverUri: string;

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    const host = 'localhost';
    const serverPort = 7080;
    serverUri = `http://${host}:${serverPort}`;
} else {
    serverUri = '';
}

console.log(serverUri);
export { serverUri };
export const lexTableUrl = '/json/lexem_table.json';
