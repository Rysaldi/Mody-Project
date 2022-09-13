import { LOADING_FETCH_PROFILE, SUCCESS_FETCH_PROFILE } from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const baseUrl = "https://15bd-103-213-129-77.ap.ngrok.io/";
const baseUrl = "https://mody-server.herokuapp.com/";

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
  } catch (error) {}
};

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
  return async (dispatch) => {
    const access_token = await getAccessToken();

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
	console.log("masuk ke store");
	return async (dispatch) => {
		const access_token = await getAccessToken()
		let localUri = payload.profilePicture.uri;
		let filename = localUri.split('/').pop();
		let match = /\.(\w+)$/.exec(filename);
		let type = match ? `profilePicture/${match[1]}` : `profilePicture`;
		const data = new FormData();
		data.append("firstName", payload.firstName);
		data.append("lastName", payload.lastName);
		data.append("phone", payload.phone);
		data.append("profilePicture", {uri:localUri, name:filename, type});
		return fetch(baseUrl + "profiles/update", {
			method: "PUT",
			headers: {
				access_token,
				"Accept": "application/json",
				"Content-Type": "multipart/form-data",
			},
			body: data,
		})
			.then((response) => {
				console.log("udah dikirim", data);
				return response.json();
			})
			.then(() => {
				// dispatch(fetchProfile());
			})
			.catch((err) => {
				console.log(err);
			});
	};
};
