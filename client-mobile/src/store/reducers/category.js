const initialState = {
  categories: [],
  detailCategory: {},
  loading: true,
  loadingDetailCategory: true,
};

import {
  LOADING_FETCH_CATEGORIES,
  LOADING_FETCH_CATEGORY,
  SUCCESS_FETCH_CATEGORIES,
  SUCCESS_FETCH_CATEGORY,
} from "../actionTypes";

function categoryReducer(state = initialState, action) {
  // switch action.type
  switch (action.type) {
    case SUCCESS_FETCH_CATEGORIES:
      return {
        ...initialState,
        categories: action.payload,
      };

    case LOADING_FETCH_CATEGORIES:
      return {
        ...initialState,
        loading: action.payload,
      };
    case SUCCESS_FETCH_CATEGORY:
      return {
        ...initialState,
        detailCategory: action.payload,
      };
    case LOADING_FETCH_CATEGORY:
      return {
        ...initialState,
        loadingDetailCategory: action.payload,
      };

    default:
      return state;
  }
}

module.exports = categoryReducer;
