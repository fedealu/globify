import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import userReducer from "@reducers/userReducer";
import playerReducer from "@reducers/playerReducer";
import searchReducer from "@reducers/searchReducer";
import resultsReducer from "@reducers/resultsReducer";
import songsReducer from "@reducers/songsReducer";

const reducer = combineReducers({
    userReducer,
    playerReducer,
    searchReducer,
    resultsReducer,
    songsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, promise))
);

export default store;