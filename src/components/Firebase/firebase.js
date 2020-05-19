import app from 'firebase/app';
import 'firebase/auth';
import {config} from "./config";


class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }
}

export default Firebase;

