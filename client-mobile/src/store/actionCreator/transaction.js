import SUCCESS_POST_TRANSACTION from "../actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseUrl = "https://9251-180-242-194-246.ap.ngrok.io/";
const baseUrl = "https://mody-server.herokuapp.com/";

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
  } catch (error) {}
};

export const transactionAddDispatch = (payload) => {
  return {
    type: SUCCESS_POST_TRANSACTION,
    payload,
  };
};

export const addTransaction = (newTransaction) => {
  return async (dispatch) => {
    const access_token = await getAccessToken();
    console.log(newTransaction);
    // return fetch(`${baseUrl}wallets`, {
    // 	method: "POST",
    // 	headers: {
    // 		access_token,
    // 		"Content-Type": "application/json",
    // 	},
    //   body: JSON.stringify(newTransaction)
    // })
    // 	.then((result) => {
    // 		if (!result.ok) {
    // 			throw new Error("post new trasaction failed");
    // 		}
    // 		return result.json();
    // 	})
    // 	.then((data) => {

    // 	})
    // 	.catch((err) => {
    // 		throw err;
    // 	})
  };
};
