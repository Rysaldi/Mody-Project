import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";
const initialState = {
  authenticated: false,
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

    default:
      return state;
  }
}

export default userReducer;
