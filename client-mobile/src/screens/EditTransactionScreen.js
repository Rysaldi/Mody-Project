import {
	View,
	Text,
	Pressable,
	StyleSheet,
	Dimensions,
	TextInput,
	Image,
	ScrollView,
	ToastAndroid,
	Alert,
	FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import { editTransactions, getTransactionDetailhandle } from "../store/actionCreator/transaction";
import { fetchCategories, setLoadingCategories } from "../store/actionCreator/category";
import { fetchDetail, loadingFetchDetailWallet } from "../store/actionCreator/wallet";

export default function EditTransactionScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const { id } = route.params;
	const [formAddTransaction, setFormAddTransaction] = React.useState({
		name: "",
		amount: "",
		CategoryId: "",
		description: "",
		// photo: "",
	});
	const [Wallet, setWallet] = React.useState(0);

	const { loadingCategories, categories } = useSelector((state) => state.categoryReducer);

	const [date, setDate] = React.useState(new Date(Date.now()));
	const [isPickerShow, setIsPickerShow] = React.useState(false);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [openType, setOpenType] = useState(false);
	const [valueType, setValueType] = useState("Income");
	const [itemsType, setItemsType] = useState([
		{ label: "Income", value: "Income" },
		{ label: "Expense", value: "Expense" },
	]);

	useEffect(() => {
		dispatch(setLoadingCategories(true));
		dispatch(fetchCategories())
			.then((categories) => {
				const showCategory = categories.map((category) => {
					return { label: category.name, value: category.id };
				});
				setItems(showCategory);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		let newCategory = [];
		categories.forEach((category) => {
			if (valueType === category.type) {
				newCategory.push({ label: category.name, value: category.id });
			}
		});

		setItems(newCategory);
	}, [valueType]);

	useEffect(() => {
		dispatch(getTransactionDetailhandle(id))
			.then((data) => {
				setFormAddTransaction({
					name: data.name,
					amount: String(data.amount),
					description: data.description,
				});
				setValueType(data.Category.type);
				setValue(data.Category.id);
				setWallet(data.Wallet.id);
			})
			.catch((err) => {
				navigation.navigate("Report Detail", { id: Wallet });
				errorAlert(err.message);
			})
			.finally(() => dispatch(setLoadingCategories(false)));
	}, []);

	const handleChange = (e) => {
		const keys = Object.keys(e)[0];
		const values = Object.values(e)[0];

		setFormAddTransaction({
			...formAddTransaction,
			[keys]: values,
		});
	};

	const showPicker = () => {
		setIsPickerShow(true);
	};

	const hidePicker = () => {
		setIsPickerShow(false);
	};

	const onChange = (event, value) => {
		hidePicker();
		setDate(value);
	};

	function showToast() {
		ToastAndroid.show("Successfully edit transaction!", ToastAndroid.SHORT);
	}

	const errorAlert = (msg) => {
		return Alert.alert("", `${msg}`, [{ text: "OK" }]);
	};

	const submitEditTransaction = () => {
		dispatch(loadingFetchDetailWallet(true));
		dispatch(setLoadingCategories(true));
		dispatch(
			editTransactions(id, {
				...formAddTransaction,
				CategoryId: value,
				date,
				WalletId: Wallet,
			})
		)
			.then(() => {
				dispatch(fetchDetail(Wallet))
					.then(() => {
						navigation.navigate("Report Detail", { id: Wallet, sesuatu: Math.random()*1000 });
						showToast();
					})
					.finally(() => {
						dispatch(setLoadingCategories(false));
					});
			})
			.catch((err) => {
				errorAlert(err.message);
			});
	};

	return (
		<>
			{loadingCategories ? (
				<LoadingScreen />
			) : (
				<ScrollView style={styles.container}>
					<View style={styles.formAddTransaction}>
						<View style={styles.formInput}>
							<Text style={styles.inputNameForm}>Name</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) =>
									handleChange({
										name: text,
									})
								}
								value={formAddTransaction.name}
								placeholder="Transaction Name"
							/>
						</View>
						<View style={styles.formInput}>
							<Text style={styles.inputNameForm}>Amount</Text>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								onChangeText={(text) =>
									handleChange({
										amount: text,
									})
								}
								value={formAddTransaction.amount}
								placeholder="Transaction Amount"
							/>
						</View>
						<View style={styles.formInput}>
							<Text style={styles.inputName}>Category type</Text>
							<DropDownPicker
								open={openType}
								value={valueType}
								items={itemsType}
								setOpen={setOpenType}
								setValue={setValueType}
								setItems={setItemsType}
								style={{ borderColor: "#ddd" }}
							/>
						</View>
						<View style={styles.formInput}>
							<Text style={styles.inputName}>Date</Text>
							<Pressable onPress={showPicker}>
								<View
									style={{
										borderColor: "#ddd",
										borderWidth: 1,
										padding: 15,
										backgroundColor: "white",
										borderRadius: 7,
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
									}}>
									<Text>{date.toLocaleString()}</Text>
									<Image
										style={{ width: 14, height: 14 }}
										source={require("../../assets/icons/arrowBottom.png")}
									/>
								</View>
							</Pressable>
							<>
								{isPickerShow && (
									<DateTimePicker
										value={date}
										mode="date"
										positiveButtonLabel="Confirm"
										display="default"
										onChange={onChange}
									/>
								)}
							</>
						</View>
						<View style={styles.formInput}>
							<Text style={styles.inputName}>Category</Text>
							<DropDownPicker
								open={open}
								value={value}
								items={items}
								setOpen={setOpen}
								setValue={setValue}
								setItems={setItems}
								style={{ borderColor: "#ddd" }}
							/>
						</View>
						<View style={styles.formInput}>
							<Text style={styles.inputName}>Description</Text>
							<TextInput
								style={styles.input}
								onChangeText={(text) =>
									handleChange({
										description: text,
									})
								}
								value={formAddTransaction.description}
								placeholder="Transaction Description"
							/>
						</View>
						<View style={styles.buttonToAdd}>
							<Pressable style={styles.buttonAdd} onPress={submitEditTransaction}>
								<Text style={styles.buttonText}>Submit</Text>
							</Pressable>
						</View>
					</View>
				</ScrollView>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	formAddTransaction: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height * 0.95,
		paddingTop: 20,
		paddingLeft: 25,
		paddingRight: 25,
	},
	inputName: {
		fontWeight: "bold",
		marginBottom: 12,
	},
	inputNameForm: {
		fontWeight: "bold",
		marginBottom: 12,
	},
	input: {
		height: Dimensions.get("window").height * 0.065,
		borderWidth: 2,
		borderRadius: 8,
		paddingHorizontal: 10,
		borderColor: "#d9d9d9",
		color: "#424242",
		backgroundColor: "#fff",
	},
	formInput: {
		marginTop: 15,
	},
	buttonToAdd: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.06,
	},
	buttonAdd: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 5,
		height: Dimensions.get("window").height * 0.06,
		width: Dimensions.get("window").width * 0.4,
		borderRadius: 10,
		backgroundColor: "#2F6FFF",
		marginTop: 25,
	},
	buttonText: {
		color: "white",
	},
});
