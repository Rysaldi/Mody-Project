import { USER_LOGIN, USER_LOGOUT, LOADING_SET } from "../actionTypes";
const initialState = {
	authenticated: false,
	loading: false,
};

function userReducer(state = initialState, action) {
	// switch action.type
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				authenticated: action.payload,
			};
		case USER_LOGOUT:
			return {
				...state,
				authenticated: action.payload,
			};
		case LOADING_SET:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
}

export default userReducer;
