import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet, Text, View } from "react-native";
import RegisterUser from "./src/screens/RegisterUser";
import WalletScreen from "./src/screens/WalletScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import ReportScreen from "./src/screens/ReportScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      {/* <Tab.Navigator>
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator> */}
      <Stack.Navigator>
        {/* <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterUser}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen name="Report" component={ReportScreen} /> */}
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },
  input: { 
    borderBottomWidth:1, 
    padding: 5, 
    marginBottom:15, 
    width:Dimensions.get('window').width * 0.63 
  }
});
