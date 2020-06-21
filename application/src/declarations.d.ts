// нужно для корректного распознавание css модулей
export {};

declare global{
    namespace Express {
        interface Request {
            userId: number,
            values: any,
            user: any
        }
        interface Response {
            values: any
        }
    }
}