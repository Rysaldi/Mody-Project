import {
  LOADING_FETCH_CATEGORIES,
  SUCCESS_FETCH_CATEGORIES,
  SUCCESS_FETCH_CATEGORY,
  LOADING_FETCH_CATEGORY,
} from "../../actionTypes";
const baseUrl = "https://mody-server.herokuapp.com/";

export const setCategories = (categories) => {
  return {
    type: SUCCESS_FETCH_CATEGORIES,
    payload: categories,
  };
};

export const setLoading = (loading) => {
  return {
    type: LOADING_FETCH_CATEGORIES,
    payload: loading,
  };
};

export const setCategory = (category) => {
  return {
    type: SUCCESS_FETCH_CATEGORY,
    payload: category,
  };
};

export const setLoadingCategory = (loading) => {
  return {
    type: LOADING_FETCH_CATEGORY,
    payload: loading,
  };
};

// akses token dari server
const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYyOTA2Njc4fQ.iZD5pFdzRKptj285M4gRk65BeoG4aTd811by5RgLPLk";

export const fetchCategories = () => {
  return (dispatch) => {
    return fetch(baseUrl + "categories", {
      headers: {
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        dispatch(setCategories(categories));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const fetchCategory = (id) => {
  return (dispatch) => {
    return fetch(baseUrl + `categories/${id}`, {
      headers: {
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((category) => {
        dispatch(setCategory(category));
      })
      .finally(() => {
        dispatch(setLoadingCategory(false));
      });
  };
};
