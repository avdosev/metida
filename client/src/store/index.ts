import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers";
const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`); // модуль нельзя импортить так
    middlewares.push(logger);
}

export const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);


