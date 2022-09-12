const initialState = {
  newUserWallet: {},
  loadingNewUserWallet: true,
};

import {
  LOADING_ADD_USER_TO_WALLET,
  SUCCESS_ADD_USER_TO_WALLET,
} from "../actionTypes";

export default function userWalletReducer(state = initialState, action) {
  // switch action.type
  switch (action.type) {
    case SUCCESS_ADD_USER_TO_WALLET:
      return {
        ...state,
        newUserWallet: action.payload,
      };
    case LOADING_ADD_USER_TO_WALLET:
      return {
        ...state,
        loadingNewUserWallet: action.payload,
      };
      default : return state
  }
}
