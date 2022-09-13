import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import categoryReducer from "./reducers/category";
import profileReducer from "./reducers/profile";

import userReducer from "./reducers/user";
import userWalletReducer from "./reducers/userWallet";
import walletReducer from "./reducers/wallet";

const rootReducer = combineReducers({
  categoryReducer,
  profileReducer,

  userReducer,
  userWalletReducer,
  walletReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
