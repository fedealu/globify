import { combineReducers } from 'redux';

import userReducer from "@reducers/userReducer";
import playerReducer from "@reducers/playerReducer";
import searchReducer from "@reducers/searchReducer";

export default combineReducers({
    userReducer,
    playerReducer,
    searchReducer
})