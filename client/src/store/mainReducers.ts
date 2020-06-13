import { combineReducers } from 'redux'

import rootReducer  from './reducers'

export default combineReducers({
    auth: rootReducer,
});