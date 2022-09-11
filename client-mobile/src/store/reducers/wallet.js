import {
  SUCCESS_FETCH_WALLETS,
  SUCCESS_FETCH_DETAIL,
  SUCCESS_POST_WALLETS,
  SUCCESS_DELETE_WALLET,
  SUCCESS_EDIT_WALLET,
  ERROR_FETCH_WALLETS,
  ERROR_FETCH_DETAIL,
  ERROR_POST_WALLETS,
  ERROR_DELETE_WALLET,
  ERROR_EDIT_WALLET,
  LOADING_FETCH_WALLETS,
  LOADING_FETCH_DETAIL,
  LOADING_POST_WALLETS,
  LOADING_DELETE_WALLET,
  LOADING_EDIT_WALLET,
} from "../actionTypes";

const initialState = {
  wallets: [],
  detailWallet: {},
  loadingWallets: true,
  loadingDetail: true,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_FETCH_WALLETS:
      return {
        ...state,
        wallets: action.payload,
      };

    case LOADING_FETCH_WALLETS:
      return {
        ...state,
        loadingWallets: action.payload,
      };

    case SUCCESS_FETCH_DETAIL:
      return {
        ...state,
        detailWallet: action.payload,
      };

    case LOADING_FETCH_DETAIL:
      return {
        ...state,
        loadingDetail: action.payload,
      };

      default:return state
  }
}

export default walletReducer
