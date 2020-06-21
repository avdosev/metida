// нужно для корректного распознавание css модулей
export {};

declare global{
    namespace Express {
        interface Request {
            userId: number
        }
        interface Response {
            values: any
        }
    }
}