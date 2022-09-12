import {
  SUCCESS_FETCH_WALLETS,
  SUCCESS_FETCH_DETAIL,
  SUCCESS_POST_WALLETS,
  SUCCESS_DELETE_WALLET,
  SUCCESS_EDIT_WALLET,
  ERROR_FETCH_WALLETS,
  ERROR_FETCH_DETAIL,
  ERROR_POST_WALLETS,
  ERROR_DELETE_WALLET,
  ERROR_EDIT_WALLET,
  LOADING_FETCH_WALLETS,
  LOADING_FETCH_DETAIL,
  LOADING_POST_WALLETS,
  LOADING_DELETE_WALLET,
  LOADING_EDIT_WALLET,
} from "../../actionTypes";

const baseUrl = "https://mody-server.herokuapp.com/";

//-----------------------FETCHALLWALLETS--------------------------
export const successFetchAllWallet = (payload) => {
  return {
    type: SUCCESS_FETCH_WALLETS,
    payload,
  };
};
export const loadingFetchAllWallet = (payload) => {
  return {
    type: LOADING_FETCH_WALLETS,
    payload,
  };
};
export const fetchWallets = () => {
  return (dispatch) => {
    return fetch(`${baseUrl}wallets`, {
      method: "GET",
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyOTA4MTI2fQ.nQmg1YVbpI_lbJ7-wijlnRyL2tijPp2VRFGFgWQ6m8c",
      },
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("fetching wallets failed");
        }
        return result.json();
      })
      .then((data) => {
        dispatch(successFetchAllWallet(data));
      })
      .finally(() => {
        dispatch(loadingFetchAllWallet(false));
      });
  };
};

//-----------------------FETCHALLWALLETS--------------------------------

//-----------------------FETCHWALLETDETAIL-------------------------------
export const successFetchDetailWallet = (payload) => {
  return {
    type: SUCCESS_FETCH_DETAIL,
    payload,
  };
};
export const loadingFetchDetailWallet = (payload) => {
  return {
    type: LOADING_FETCH_DETAIL,
    payload,
  };
};
export const fetchDetail = (id) => {
  return (dispatch) => {
    return fetch(`${baseUrl}wallets/${id}`, {
      method: "GET",
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyOTA4MTI2fQ.nQmg1YVbpI_lbJ7-wijlnRyL2tijPp2VRFGFgWQ6m8c",
      },
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("fetching wallet detail failed");
        }
        return result.json();
      })
      .then((data) => {
        dispatch(successFetchDetailWallet(data));
      })
      .finally(() => {
        dispatch(loadingFetchDetailWallet(false));
      });
  };
};
//-----------------------FETCHWALLETDETAIL-------------------------------

//-----------------------POSTWALLET---------------------------------------
export const addNewWallet = (payload) => {
  return (dispatch) => {
    return fetch(`${baseUrl}wallets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyOTA4MTI2fQ.nQmg1YVbpI_lbJ7-wijlnRyL2tijPp2VRFGFgWQ6m8c",
      },
      body: JSON.stringify(payload),
    }).then((result) => {
      if (!result.ok) {
        return result.json().then((message) => {
          throw message;
        });
      }
      return result
        .json()
        .then((data) => {
          dispatch(fetchWallets())
        })
        .catch((error) => {
          throw error;
        });
    });
  };
};

//-----------------------POSTWALLET---------------------------------------


//-----------------------DELETEWALLET---------------------------------------
export const successDeleteWallet = (payload) => {
    return {
      type: SUCCESS_DELETE_WALLET,
      payload,
    };
  };

export const deleteWallet = (walletId) => {
    return (dispatch) => {
      fetch(`${baseUrl}wallets/${walletId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYyOTA4MTI2fQ.nQmg1YVbpI_lbJ7-wijlnRyL2tijPp2VRFGFgWQ6m8c"
        },
      })
        .then((result) => {
          if (!result.ok) {
            throw new Error("error deleting wallet");
          }
          return result.json();
        })
        .then(() => dispatch(successDeleteWallet(walletId)))
        .then(()=>dispatch(fetchWallets()))
        .catch((err) => {
          throw err
        });
    };
  };
//-----------------------DELETEWALLET---------------------------------------
