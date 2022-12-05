import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import song from "./song";
const rootReducer = combineReducers({
	song,
});

export type State = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
