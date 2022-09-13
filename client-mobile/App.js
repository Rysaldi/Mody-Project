import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./index";
import store from "./src/store/store";
export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Index />
			</NavigationContainer>
		</Provider>
	);
}
