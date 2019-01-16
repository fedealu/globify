import { combineReducers } from 'redux';

import userReducer from "@reducers/userReducer";
import playerReducer from "@reducers/playerReducer";
import searchReducer from "@reducers/searchReducer";
import resultsReducer from "@reducers/resultsReducer";

export default combineReducers({
    userReducer,
    playerReducer,
    searchReducer,
    resultsReducer
})