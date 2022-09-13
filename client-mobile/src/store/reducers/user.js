import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_HISTORY,
  LOADING_USER_LOGIN,
  LOADING_USER_LOGOUT,
  LOADING_USER_HISTORY,
} from "../actionTypes";

const initialState = {
  authenticated: false,
  loadingProfile: true,
  userDetail: "",
  loadingUserLogin: true,
  loadingUserLogout: true,
  loadingUserHistory: true,
};

function userReducer(state = initialState, action) {
  // switch action.type
  switch (action.type) {
    case USER_HISTORY:
      return {
        ...state,
        userDetail: action.payload,
      };
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
    case LOADING_USER_LOGIN:
      return {
        ...state,
        loadingUserLogin: action.payload,
      };
    case LOADING_USER_LOGOUT:
      return {
        ...state,
        loadingUserLogout: action.payload,
      };
    case LOADING_USER_HISTORY:
      return {
        ...state,
        loadingUserHistory: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
