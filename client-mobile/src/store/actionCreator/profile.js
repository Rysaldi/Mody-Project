import {
  LOADING_FETCH_PROFILE,
  SUCCESS_FETCH_PROFILE,
  // SUCCESS_UPDATE_PROFILE,
  LOADING_UPDATE_PROFILE,
} from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const baseUrl = "https://9251-180-242-194-246.ap.ngrok.io/";

const baseUrl = "https://mody-server.herokuapp.com/";

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
  } catch (error) {}
};

export const setProfile = (payload) => {
  return {
    type: SUCCESS_FETCH_PROFILE,
    payload,
  };
};
// export const setUpdateProfile = (profile) => {
//   return {
//     type: SUCCESS_UPDATE_PROFILE,
//     payload: profile,
//   };
// };

export const setLoadingProfile = (payload) => {
  return {
    type: LOADING_FETCH_PROFILE,
    payload,
  };
};
export const setLoadingUpdateProfile = () => {
  return {
    type: LOADING_UPDATE_PROFILE,
    payload,
  };
};

export const fetchProfile = () => {
  // console.log("masuk fetch profile");
  return async (dispatch) => {
    const access_token = await getAccessToken();

    return fetch(baseUrl + "profiles", {
      headers: {
        access_token,
      },
    })
      .then((response) => {
        // console.log("masuk fetch profile response nih");
        return response.json();
      })
      .then((profile) => {
        dispatch(setProfile(profile));
        // console.log(profile);
      });
  };
};
export const updateProfile = (payload) => {
  console.log("masuk ke store");
  return async (dispatch) => {
    const access_token = await getAccessToken();
    let localUri = payload.profilePicture.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `profilePicture/${match[1]}` : `profilePicture`;
    const data = new FormData();
    data.append("firstName", payload.firstName);
    data.append("lastName", payload.lastName);
    data.append("phone", payload.phone);
    data.append("profilePicture", { uri: localUri, name: filename, type });
    console.log(JSON.stringify(data, null, 2));
    return fetch(baseUrl + "profiles/update", {
      method: "PUT",
      headers: {
        access_token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      .then((response) => {
        // console.log("udah dikirim", data);
        return response.json();
      })
      .then(() => {
        dispatch(fetchProfile());
      })
      .catch((err) => {
        // console.log(err);
      });
  };
};
