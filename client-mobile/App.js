import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// rohmat
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet} from "react-native";
import DashboardScreen from "./src/screens/DashboardScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// dedi
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
   //rohmat
      {/* <DashboardScreen /> */}
      {/* <ProfileScreen/> */}
      {/* <LoginScreen/> */}
      {/* <LogoutScreen /> */}
      {/* <StatusBar style="auto" /> */}

   //dedi
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
        
        {/* <Stack.Screen name="History" component={HistoryScreen} /> */}
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