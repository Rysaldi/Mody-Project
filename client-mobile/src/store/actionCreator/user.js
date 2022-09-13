import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOGIN, USER_LOGOUT, USER_HISTORY, LOADING_SET } from "../actionTypes";

const baseUrl = "https://15bd-103-213-129-77.ap.ngrok.io/";

export const userLoginDispatch = (payload) => {
	return {
		type: USER_LOGIN,
		payload,
	};
};

export const userHistoryDispatch = (payload) => {
	return {
		type: USER_HISTORY,
		payload,
	};
};

const userLogoutDispatch = (payload) => {
	return {
		type: USER_LOGOUT,
		payload,
	};
};

export const loadingSet = (payload) => {
	return {
		type: LOADING_SET,
		payload,
	};
};

const setAccessToken = async (token) => {
	try {
		await AsyncStorage.setItem("access_token", token);
	} catch (error) {}
};

export const userRegister = (registerUserForm) => {
	return (dispatch) => {
		dispatch(loadingSet(true));
		return fetch(`${baseUrl}users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerUserForm),
		}).then((response) => {
			if (!response.ok) {
				return response.json().then((message) => {
					throw message;
				});
			}
			return response.json();
		});
	};
};

export const userLogin = (loginUserForm) => {
	return async (dispatch) => {
		dispatch(loadingSet(true));
		return fetch(`${baseUrl}users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginUserForm),
		})
			.then((response) => {
				if (!response.ok) {
					return response.json().then((message) => {
						throw message;
					});
				}
				return response.json();
			})
			.then((response) => {
				setAccessToken(response.access_token);
				dispatch(userLoginDispatch(true));
			});
	};
};

export const userLogout = () => {
	return (dispatch) => {
		AsyncStorage.clear().then((_) => {
			dispatch(userLogoutDispatch(false));
		});
	};
};

export const userHistory = () => (dispatch) => {
	return fetch(baseUrl + "/users/detail", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(loginUserForm),
	});
};
