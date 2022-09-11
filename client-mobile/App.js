import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Dimensions } from "react-native";
import DashboardScreen from "./src/screens/DashboardScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterUser from "./src/screens/RegisterUser";
import WalletScreen from "./src/screens/WalletScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import ReportScreen from "./src/screens/ReportScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Provider, useSelector } from "react-redux";
import store from "./src/store/store";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const StackWallet = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="WalletApp"
        component={WalletScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TransactionApp" component={TransactionScreen} />
      <Stack.Screen name="ReportApp" component={ReportScreen} />
      <Stack.Screen name="HistoryApp" component={HistoryScreen} />
    </Stack.Navigator>
  );

  const StackSettings = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsApp"
        component={LogoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileApp"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
  const StackLoginRegister = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={RegisterUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Wallet"
            component={StackWallet}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Settings"
            component={StackSettings}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="LoginRegister"
            component={StackLoginRegister}
            options={{ headerShown: false, tabBarStyle: { display: "none" } }}
          />
        </Tab.Navigator>

        {/* <DashboardScreen /> */}
        {/* <ProfileScreen/> */}
        {/* <LoginScreen/> */}
        {/* <LogoutScreen /> */}
        {/* <StatusBar style="auto" /> */}

        {/* <Stack.Navigator> */}
        {/* <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterUser}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen name="Report" component={ReportScreen} /> */}
        {/* <Stack.Screen name="History" component={HistoryScreen} /> */}
        {/* </Stack.Navigator> */}
      </NavigationContainer>
    </Provider>
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
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 15,
    width: Dimensions.get("window").width * 0.63,
  },
});
