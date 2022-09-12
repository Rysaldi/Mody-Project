const initialState = {
  categories: [],
  detailCategory: {},
  loading: true,
  loadingDetailCategory: true,
};

import {
  LOADING_FETCH_CATEGORIES,
  // LOADING_FETCH_CATEGORY,
  SUCCESS_FETCH_CATEGORIES,
  // SUCCESS_FETCH_CATEGORY,
} from "../actionTypes";

function categoryReducer(state = initialState, action) {
  // switch action.type
  switch (action.type) {
    case SUCCESS_FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case LOADING_FETCH_CATEGORIES:
      return {
        ...state,
        loading: action.payload,
      };
    // case SUCCESS_FETCH_CATEGORY:
    //   return {
    //     ...state,
    //     detailCategory: action.payload,
    //   };
    // case LOADING_FETCH_CATEGORY:
    //   return {
    //     ...state,
    //     loadingDetailCategory: action.payload,
    //   };

    default:
      return state;
  }
}

module.exports = categoryReducer;
