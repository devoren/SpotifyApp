import { action } from "typesafe-actions";

import reducers from "./reducer";
import TYPE from "./types";

export const setSelectedSong = (data: any) => (dispatch: any) => {
	dispatch(action(TYPE.SET_SELECTED, data));
};

export default reducers;
