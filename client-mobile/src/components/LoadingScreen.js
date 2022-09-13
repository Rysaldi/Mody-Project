import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingScreen() {
	return (
		<View style={style.container}>
			<ActivityIndicator size="large" color="#2d3436" />
		</View>
	);
}

const style = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
});
