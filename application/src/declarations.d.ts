import { DecodedObject } from './controllers/logged';

export {};

declare global {
    namespace Express {
        interface Request {
            userId: number;
            values: any;
            user: any;
            status: DecodedObject | null;
        }

        interface Response {
            values: any;
        }
    }
}
