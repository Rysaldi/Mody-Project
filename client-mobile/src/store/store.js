import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import categoryReducer from "./reducers/category";
import profileReducer from "./reducers/profile";
import transactionReducer from "./reducers/transaction";
import userReducer from "./reducers/user";
import userWalletReducer from "./reducers/userWallet";
import walletReducer from "./reducers/wallet";

const rootReducer = combineReducers({
  // categoryReducer,
  // profileReducer,
  // transactionReducer,
  userReducer,
  // userWalletReducer,
  // walletReducer
});

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;
