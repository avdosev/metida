import { ActionType } from "./actionType";
import {SIGN_IN, LOGOUT} from "../actions/events";
import {getCurrentUser} from "../services/user";

const initialState = {
    user: getCurrentUser()
};

function rootReducer(state  = initialState, action: ActionType) {
    switch (action.type) {
        case SIGN_IN:
            return {...state, user: action.payload }
        case LOGOUT:
            return {...state, user: null }
    }
    return state;
}



export default rootReducer;