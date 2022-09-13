const initialState = {
  profile: {},
  // updateProfile: {},
  loadingFetchProfile: true,
  loadingUpdateProfile: true,
};

import {
  LOADING_FETCH_PROFILE,
  SUCCESS_FETCH_PROFILE,
  // SUCCESS_UPDATE_PROFILE,
  LOADING_UPDATE_PROFILE,
} from "../actionTypes";

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
        loadingFetchProfile: action.payload,
      };
    // case SUCCESS_UPDATE_PROFILE:
    //   return {
    //     ...state,
    //     updateProfile: action.payload,
    //   };
    case LOADING_UPDATE_PROFILE:
      return {
        ...state,
        loadingUpdateProfile: action.payload,
      };

    default:
      return state;
  }
}

export default profileReducer;
