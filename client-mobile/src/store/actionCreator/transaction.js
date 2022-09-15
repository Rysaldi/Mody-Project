import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseUrl = "https://9251-180-242-194-246.ap.ngrok.io/";
const baseUrl = "https://mody-server.herokuapp.com/";

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken;
  } catch (error) {}
};

export const addTransaction = (payload) => {
  return async (dispatch) => {
    const access_token = await getAccessToken();

    return fetch(`${baseUrl}transactions`, {
      method: "POST",
      headers: {
        access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((result) => {
      if (!result.ok) {
        return result.json().then((message) => {
          throw message;
        });
      }
      return result.json();
    });
  };
};

export const deleteTransaction = (transactionId) => {
  return async (dispatch) => {
    const access_token = await getAccessToken();
    return fetch(`${baseUrl}transactions/${transactionId}`, {
      method: "DELETE",
      headers: {
        access_token,
        "Content-Type": "application/json",
      },
    }).then((result) => {
      if (!result.ok) {
        return result.json().then((message) => {
          throw message;
        });
      }
      return result.json();
    });
  };
};

export const editTransactions = (transactionId, payload) => {
  return async (dispatch) => {
    const access_token = await getAccessToken();
    return fetch(`${baseUrl}transactions/${transactionId}`, {
      method : "PUT",
      headers: {
        access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((result) => {
      if (!result.ok) {
        return result.json().then(data => {
          throw data
        });
      }
      return result.json();
    });
  }
}

export const getTransactionDetailhandle = (transactionId) => {
  return async (dispatch) => {
    const access_token = await getAccessToken();
    return fetch(`${baseUrl}transactions/${transactionId}` , {
      method : "get",
      headers: {
        access_token,
        "Content-Type": "application/json",
      },
    }).then((result) => {
      if (!result.ok) {
        return result.json().then(data => {
          throw data
        });
      }
      return result.json();
    });
  }
}
