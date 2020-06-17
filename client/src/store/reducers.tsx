import {ActionType} from "./typings/actionType";
import {SIGN_IN, LOGOUT} from "../actions/events";
import {getCurrentUser} from "../services/user";
import {IStore} from "./typings/IStore";

const initialState = {
    user: getCurrentUser()
};

function rootReducer(state: IStore  = initialState, action: ActionType) {
    switch (action.type) {
        case SIGN_IN:
            return {...state, user: action.payload }
        case LOGOUT:
            return {...state, user: action.payload }

    }
    return state;
}



export default rootReducer;