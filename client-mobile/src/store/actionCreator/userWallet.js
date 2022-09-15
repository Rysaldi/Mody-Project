import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SUCCESS_ADD_USER_TO_WALLET,
  SUCCESS_DELETE_USER_WALLET,
  LOADING_ADD_USER_TO_WALLET,
} from "../actionTypes/index";

const baseUrl = "https://mody-server.herokuapp.com/";
// const baseUrl = "https://9251-180-242-194-246.ap.ngrok.io/";

//-----------------------getAccessToken--------------------------
const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
  } catch (error) {}
};

//-----------------------POSTUSERWALLET-------------------------------
export const setLoadingAddUserToWallet = () => {
  return {
    type: LOADING_ADD_USER_TO_WALLET,
    payload,
  };
};

export const addNewUserWallet = (payload) => {
  // console.log(payload);
  return async (dispatch) => {
    const accessToken = await getAccessToken();
    return fetch(`${baseUrl}userWallets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken,
      },
      body: JSON.stringify({
        role: payload.role,
        WalletId: payload.WalletId,
        email: payload.email,
        UserId: payload.UserId,
      }),
    })
      .then((result) => {
        console.log(result);
        if (!result.ok) {
          return result.json().then((message) => {
            throw message;
          });
        }
        return result.json();
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const deleteUserWallet = (userWalletId) =>{
  return async (dispatch) => {
    const accessToken = await getAccessToken();
    return fetch(`${baseUrl}userWallets/${userWalletId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: accessToken,
      },
    })
      .then((result) => {
        if (!result.ok) {
          return result.json().then((message) => {
            throw message;
          });
        }
        return result.json();
      })
      .catch((error) => {
        throw error;
      });
  };
}
