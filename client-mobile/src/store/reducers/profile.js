const initialState = {
	profile: {},
	loading: true,
};

import { LOADING_FETCH_PROFILE, SUCCESS_FETCH_PROFILE } from "../actionTypes";

function profileReducer(state = initialState, action) {
	// switch action.type
	switch (action.type) {
		case SUCCESS_FETCH_PROFILE:
			return {
				...state,
				profile: action.payload,
			};

		case LOADING_FETCH_PROFILE:
			return {
				...state,
				loading: action.payload,
			};

		default:
			return state;
	}
}

module.exports = profileReducer;
