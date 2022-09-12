import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";
import store from "./src/store/store";
export default function index() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
}
