import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	LOADING_FETCH_CATEGORIES,
	SUCCESS_FETCH_CATEGORIES,
	// SUCCESS_FETCH_CATEGORY,
	// LOADING_FETCH_CATEGORY,
} from "../actionTypes";
const baseUrl = "https://e526-180-254-67-19.ap.ngrok.io/";
// const baseUrl = "https://mody-server.herokuapp.com/";

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

// export const setLoadingCategory = (loading) => {
//   return {
//     type: LOADING_FETCH_CATEGORY,
//     payload: loading,
//   };
// };

const getAccessToken = async () => {
	try {
		const accessToken = await AsyncStorage.getItem("access_token");
		return accessToken;
	} catch (error) {}
};

export const fetchCategories = () => {
	return async (dispatch) => {
		const access_token = await getAccessToken();
		return fetch(baseUrl + "categories", {
			headers: {
				access_token,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((categories) => {
				// console.log(categories);
				dispatch(setCategories(categories));
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
};
