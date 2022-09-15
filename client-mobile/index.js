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
import AddUserToWallet from "./src/screens/AddUserToWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadingUserLoginDispatch, userLoginDispatch } from "./src/store/actionCreator/user";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./src/components/LoadingScreen";
import EditTransactionScreen from "./src/screens/EditTransactionScreen";
import { userHistory, loadingUserHistoryDispatch } from "./src/store/actionCreator/user";

export default function index({ navigation }) {
	const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();

	const dispatch = useDispatch();
	const { authenticated, loadingUserLogin } = useSelector((state) => state.userReducer);

	const getToken = async () => {
		try {
			const response = await AsyncStorage.getItem("access_token");
			return response;
		} catch (error) {}
	};

	useEffect(() => {
		getToken()
			.then((response) => {
				if (response) {
					dispatch(userLoginDispatch(true));
					dispatch(userHistory())
						.catch((error) => {
							console.log(error);
						})
						.finally(() => {
							dispatch(loadingUserHistoryDispatch(false));
						});
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				dispatch(loadingUserLoginDispatch(false));
			});
	}, [authenticated]);

	const StackWallet = () => (
		<Stack.Navigator>
			<Stack.Screen name="WalletApp" component={WalletScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Add Transaction" component={TransactionScreen} />
			<Stack.Screen name="Report Detail" component={ReportScreen} />
			<Stack.Screen name="Add Collaborator" component={AddUserToWallet} />
			<Stack.Screen name="Edit Transaction" component={EditTransactionScreen} />
		</Stack.Navigator>
	);

	const StackSettings = () => (
		<Stack.Navigator>
			<Stack.Screen name="SettingsApp" component={LogoutScreen} options={{ headerShown: false }} />
			<Stack.Screen name="ProfileApp" component={ProfileScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);

	return (
		<>
			{loadingUserLogin ? (
				<LoadingScreen />
			) : (
				<>
					{!loadingUserLogin && authenticated && (
						<Tab.Navigator
							screenOptions={({ route }) => ({
								tabBarIcon: ({ color, size }) => {
									if (route.name === "Home") {
										return <Entypo name="home" size={size} color={color} />;
									} else if (route.name === "Wallet") {
										return <Entypo name="wallet" size={size} color={color} />;
									} else if (route.name === "Settings") {
										return <Ionicons name="settings" size={size} color={color} />;
									}
								},
								tabBarActiveTintColor: "#2F6FFF",
								tabBarInactiveTintColor: "gray",
							})}>
							<Tab.Screen
								name="Home"
								component={DashboardScreen}
								options={{ headerShown: false }}
							/>
							<Tab.Screen name="Wallet" component={StackWallet} options={{ headerShown: false }} />
							<Tab.Screen
								name="Settings"
								component={StackSettings}
								options={{ headerShown: false }}
							/>
						</Tab.Navigator>
					)}
					{!loadingUserLogin && !authenticated && (
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
