import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Dimensions } from "react-native";
import DashboardScreen from "./src/screens/DashboardScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterUser from "./src/screens/RegisterUser";
import WalletScreen from "./src/screens/WalletScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import ReportScreen from "./src/screens/ReportScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import AddUserToWallet from "./src/screens/AddUserToWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLoginDispatch } from "./src/store/actionCreator/users/users";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.userReducer);
  const getToken = async () => {
    try {
      const response = await AsyncStorage.getItem("access_token");
      return response;
    } catch (error) {}
  };
  useEffect(() => {
    getToken().then((response) => {
      if (response) {
        dispatch(userLoginDispatch(true));
      } else dispatch(userLoginDispatch(false));
    });
  }, []);

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
      <Stack.Screen name="AddToWallet" component={AddUserToWallet} />
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

  return (
    <>
      {authenticated ? (
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
        </Tab.Navigator>
      ) : (
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
      )}
    </>
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
