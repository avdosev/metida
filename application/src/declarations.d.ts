export {};

declare global {
    namespace Express {
        interface Request {
            userId: number;
            values: any;
            user: any;
        }

        interface Response {
            values: any;
        }
    }
}
