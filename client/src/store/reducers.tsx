import { ActionType } from "./typings/actionType";
import {SIGN_IN, LOGOUT} from "../actions/events";
import {getCurrentUser} from "../services/user";

const initialState = {
    user: getCurrentUser()
};

function rootReducer(state  = initialState, action: ActionType) {
    switch (action.type) {
        case SIGN_IN || LOGOUT:
            return {...state, user: action.payload }
    }
    return state;
}



export default rootReducer;