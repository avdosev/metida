import {ActionType, IStore} from "./typings/actionType";
import {SIGN_IN, LOGOUT} from "../actions/events";
import {getCurrentUser} from "../services/user";

const initialState = {
    user: getCurrentUser()
};

function rootReducer(state: IStore  = initialState, action: ActionType) {
    console.log(action.payload)
    switch (action.type) {
        case SIGN_IN:
            return {...state, user: action.payload }
        case LOGOUT:
            return {...state, user: action.payload }

    }
    return state;
}



export default rootReducer;