import { musiclibrary } from "src/components/PlayerWidget/Data";
import TYPE from "./types";

interface SongState {
	song: {
		id: number;
		url: string;
		title: string;
		artist: string;
		album: string;
		genre: string;
		date: string; // RFC 3339
		artwork: string;
		duration: number; // Duration in seconds
	};
}
const initialState: SongState = {
	song: {
		id: musiclibrary[0].id,
		url: "",
		title: musiclibrary[0].title,
		artist: musiclibrary[0].artist,
		album: "",
		genre: "",
		date: "", // RFC 3339
		artwork: musiclibrary[0].artwork,
		duration: musiclibrary[0].id, // Duration in seconds
	},
};

export default (state: SongState = initialState, action: any) => {
	switch (action.type) {
		case TYPE.SET_SELECTED:
			return {
				...state,
				song: action.payload,
			};

		default:
			return state;
	}
};
