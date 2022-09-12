import {
  SUCCESS_FETCH_WALLETS,
  SUCCESS_FETCH_DETAIL,
  SUCCESS_POST_WALLETS,
  SUCCESS_DELETE_WALLET,
  LOADING_FETCH_WALLETS,
  LOADING_FETCH_DETAIL,
  LOADING_POST_WALLETS,
  LOADING_DELETE_WALLET,
} from "../actionTypes";

const initialState = {
  wallets: [],
  detailWallet: {},
  newWallet: {},
  deleteWallet: "",
  loadingWallets: true,
  loadingDetail: true,
  loadingNewWallet: true,
  loadingDeleteWallet: true,
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

    case SUCCESS_POST_WALLETS:
      return {
        ...state,
        newWallet: action.payload,
      };

    case LOADING_POST_WALLETS:
      return {
        ...state,
        loadingNewWallet: action.payload,
      };

    case SUCCESS_DELETE_WALLET:
      const postDeleteWallet = state.wallets.filter((el) => {
        return el.id !== action.payload;
      });
      return {
        ...state,
        wallets: postDeleteWallet,
        deleteNews: "delete wallet success",
      };

    case LOADING_DELETE_WALLET:
      return {
        ...state,
        loadingDeleteWallet: action.payload,
      };

    default:
      return state;
  }
}

export default walletReducer;
