import {
  LOADING_FETCH_PROFILE,
  SUCCESS_FETCH_PROFILE,
} from "../../actionTypes";

const baseUrl = "https://mody-server.herokuapp.com/";
const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYyOTA2Njc4fQ.iZD5pFdzRKptj285M4gRk65BeoG4aTd811by5RgLPLk";

export const setProfile = (profile) => {
  return {
    type: SUCCESS_FETCH_PROFILE,
    payload: profile,
  };
};

export const setLoading = (loading) => {
  return {
    type: LOADING_FETCH_PROFILE,
    payload: loading,
  };
};

export const fetchProfile = () => {
  return (dispatch) => {
    return fetch(baseUrl + "profiles", {
      headers: {
        access_token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((profile) => {
        dispatch(setProfile(profile));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const updateProfile = (payload) => {
  console.log(payload);
  return (dispatch) => {
    return fetch(baseUrl + "profiles/update", {
      method: "PUT",
      headers: {
        access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        // console.log("udah dikirim", response);
        return response.json();
      })
      .then(() => {
        dispatch(fetchProfile());
      });
  };
};
