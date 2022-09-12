import {
  SUCCESS_ADD_USER_TO_WALLET,
  LOADING_ADD_USER_TO_WALLET,
} from "../../actionTypes/index";

import AsyncStorage from "@react-native-async-storage/async-storage";
const baseUrl = "https://mody-server.herokuapp.com/";
// const baseUrl = "http://localhost:3000/";
//-----------------------getAccessToken--------------------------
const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
  } catch (error) {}
};
//-----------------------getAccessToken------------------------------

//-----------------------POSTUSERWALLET-------------------------------
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
        UserId : payload.UserId
      }),
    })
    .then((result) => {
      console.log(result);
      if (!result.ok) {
        return result.json().then((message) => {
          throw message;
        });
      }
      return result
        .json()
      })
      .catch((error) => {
        throw error;
      });
  };
};
//-----------------------POSTUSERWALLET-------------------------------
