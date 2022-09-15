import {
	StyleSheet,
	View,
	Text,
	FlatList,
	Dimensions,
	ScrollView,
	Image,
	Pressable,
	Alert,
	ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { fetchDetail } from "../store/actionCreator/wallet";
import LoadingScreen from "../components/LoadingScreen";
import { deleteTransaction } from "../store/actionCreator/transaction";
import { VictoryPie } from "victory-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatCurrency } from "react-native-format-currency";
import { deleteUserWallet } from "../store/actionCreator/userWallet";
import { loadingFetchDetailWallet, successFetchDetailWallet } from "../store/actionCreator/wallet";

export default function ReportScreen({ navigation, route }) {
	const { id, sesuatu } = route.params;
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [startDate, setStartDate] = React.useState(null);
	const [endDate, setEndDate] = React.useState(null);
	const [pickerStartDateShow, setPickerStartDateShow] = React.useState(false);
	const [pickerEndDateShow, setPickerEndDateShow] = React.useState(false);
	const { detailWallet, loadingDetail } = useSelector((state) => {
		return state.walletReducer;
	});
	const [showFilteredData, setshowFilteredData] = useState(null);
	const [adaperubahan, setAdaPerubahan] = useState(false);

	const setTotalIncome = (transactions) => {
		if (!transactions || transactions.length === 0) {
			return 0;
		}
		let totalIncome = 0;
		transactions.forEach((transaction) => {
			if (transaction.Category.type === "Income") {
				totalIncome = totalIncome + Number(transaction.amount);
			}
		});
		return totalIncome;
	};

	const setTotalExpense = (transactions) => {
		if (!transactions || transactions.length === 0) {
			return 0;
		}
		let totalExpense = 0;
		transactions.forEach((transaction) => {
			if (transaction.Category.type === "Expense") {
				totalExpense = totalExpense + Number(transaction.amount);
			}
		});
		return totalExpense;
	};

	const percentageIncome = (amount) => {
		return (setTotalIncome(amount) / (setTotalIncome(amount) + setTotalExpense(amount))) * 100;
	};

	const errorAlert = (msg) => {
		return Alert.alert("", `${msg}`, [{ text: "OK" }]);
	};

	const percentageExpenses = (amount) => {
		return (setTotalExpense(amount) / (setTotalIncome(amount) + setTotalExpense(amount))) * 100;
	};

	const wantedGraphicData = (transaction) => {
		return [
			{
				x: "Expense",
				y: percentageExpenses(transaction),
			},
			{
				x: "Income",
				y: percentageIncome(transaction),
			},
		];
	};

	const hapusTransaction = (transactionId) => {
		dispatch(deleteTransaction(transactionId))
			.then(() => {
				dispatch(fetchDetail(id))
					.then(() => {
						setLoading(true);
						if (adaperubahan === false) {
							setAdaPerubahan(true);
						} else {
							setAdaPerubahan(false);
						}
					})
					.catch((err) => {
						errorAlert(err.message);
					})
					.finally(() => {
						dispatch(loadingFetchDetailWallet(false));
						setLoading(false);
					});
			})
			.catch((err) => errorAlert(err.name));
	};

	const setCategoryName = (transaction) => {
		let obj = {};
		const newArr = [];
		const categoryName = transaction.map((el) => {
			return { name: el.Category.name, amount: el.amount };
		});
		categoryName.forEach((el) => {
			if (!obj[el.name]) {
				obj[el.name] = el.amount;
			} else {
				obj[el.name] = obj[el.name] + el.amount;
			}
		});
		for (const key in obj) {
			newArr.push({ name: key, amount: obj[key] });
		}
		const colorOption = [
			"#FFE9A0",
			"#367E18",
			"#F57328",
			"#CC3636",
			"#CDF0EA",
			"#25316D",
			"#5F6F94",
			"#97D2EC",
			"#FEF5AC",
			"#FDEEDC",
			"#FFD8A9",
			"#F1A661",
			"#E38B29",
			"#76BA99",
			"#876445",
			"#5BB318",
			"#7DCE13",
			"#EAE509",
		];
		for (let i = 0; i < newArr.length; i++) {
			newArr[i].color = colorOption[i];
		}
		return newArr;
	};

	const sameColorCategory = (categories) => {
		const color = [];
		categories.forEach((el) => {
			color.push(el.color);
		});
		return color;
	};

	const renderListWalletWithColor = ({ item }) => {
		return (
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					marginRight: 25,
				}}>
				<View
					style={{
						width: 20,
						height: 20,
						backgroundColor: item.color,
					}}
				/>
				<Text> {item.name}</Text>
			</View>
		);
	};

	const wantedGraphicDataByCategory = (categoryName) => {
		const wantedGraphicDataByCategories = categoryName.map((el) => {
			return {
				x: " ",
				y:
					(el.amount / (setTotalIncome(showFilteredData) + setTotalExpense(showFilteredData))) *
					100,
			};
		});
		return wantedGraphicDataByCategories;
	};

	function toastSuccessDeleteCollaborator() {
		console.log("ERROR DISINI");
		ToastAndroid.show("Successfully delete a collaborator!", ToastAndroid.SHORT);
	}

	const deleteCollaborator = (userWalletId) => {

		dispatch(deleteUserWallet(userWalletId))
			.then(() => {
				toastSuccessDeleteCollaborator();
				dispatch(fetchDetail(id));
			}
			)
			.catch((err) => errorAlert(err.message))
			.finally(() => {
				dispatch(loadingFetchDetailWallet(false));
			});
	};

	const renderUserWallets = ({ item, index }) => {
		return (
			<>
				<View style={styles.walletCard}>
					<View style={styles.cardDetail}>
						<Text style={styles.roleText}>{item.role}</Text>
						<Text>{item.User.email}</Text>
					</View>
				</View>

				<View style={styles.deleteCollaborator}>
					<Pressable
						onPress={() => {
							deleteCollaborator(item.id);
						}}>
						<Image
							source={require("../../assets/icons/red_trash.png")}
							style={styles.buttonDelete}
						/>
					</Pressable>
				</View>
			</>
		);
	};

	const showPickerStartDate = () => {
		if (!startDate) {
			setStartDate(new Date());
		} else {
			setStartDate(new Date(startDate));
		}
		setPickerStartDateShow(true);
	};

	const hidePickerStartDate = () => {
		setPickerStartDateShow(false);
	};

	const onChangeStartDate = (event, value) => {
		hidePickerStartDate();
		setStartDate(new Date(value));
	};

	const showPickerEndDate = () => {
		if (!endDate) {
			setEndDate(new Date());
		} else {
			setEndDate(new Date(endDate));
		}
		setPickerEndDateShow(true);
	};

	const hidePickerEndDate = () => {
		setPickerEndDateShow(false);
	};

	const onChangeEndDate = (event, value) => {
		hidePickerEndDate();
		setEndDate(new Date(value));
	};

	const resetFilter = () => {
		setEndDate(null);
		setStartDate(null);
	};

	const filterDate = (data, startDate, endDate) => {
		if (!startDate && !endDate) {
			setshowFilteredData(data);
			return;
		}
		if (!startDate && endDate) {
			const filtered = data.filter((e) => {
				return new Date(e.date) < new Date(endDate);
			});
			setshowFilteredData(filtered);
			return;
		}
		if (!endDate && startDate) {
			const filtered = data.filter((e) => {
				return new Date(e.date) > new Date(startDate);
			});
			setshowFilteredData(filtered);
			return;
		}

		const filtered = data.filter((e) => {
			return new Date(e.date) > new Date(startDate) && new Date(e.date) < new Date(endDate);
		});
		setshowFilteredData(filtered);
		return;
	};

	const renderItem = ({ item }) => {
		return (
			<View style={styles.walletCard}>
				<View>
					<View style={styles.cardDetail}>
						<Text style={styles.incomeName}>Type</Text>
						<>
							{item.Category.type === "Income" ? (
								<Text style={styles.incomeDetailsIncome}>{item.Category.type}</Text>
							) : (
								<Text style={styles.incomeDetailsExpense}>{item.Category.type}</Text>
							)}
						</>
					</View>
					<View style={styles.cardDetail}>
						<Text style={styles.incomeName}>Name</Text>
						<Text style={styles.incomeDetails}>{item.name}</Text>
					</View>
					<View style={styles.cardDetail}>
						<Text style={styles.incomeName}>Amount</Text>
						<Text style={styles.incomeDetails}>
							{
								formatCurrency({
									amount: item.amount,
									code: "IDR",
								})[0]
							}
						</Text>
					</View>
					<View style={styles.cardDetail}>
						<Text style={styles.incomeName}>Category</Text>
						<Text style={styles.incomeDetails}>{item.Category.name}</Text>
					</View>
					<View style={styles.cardDetail}>
						<Text style={styles.incomeName}>Date</Text>
						<Text style={styles.incomeDetails}>{new Date(item.date).toLocaleString()}</Text>
					</View>
					<View style={styles.iconPositions}>
						<Pressable
							style={styles.backgroundButtonEdit}
							onPress={() => navigation.navigate("Edit Transaction", { id: item.id })}>
							<Image
								source={require("../../assets/icons/editReport.png")}
								style={styles.buttonEdit}
							/>
							<Text style={{ color: "#8d6e03" }}>Edit</Text>
						</Pressable>

						<Pressable
							style={styles.backgroundButtonDelete}
							onPress={() => {
								hapusTransaction(item.id);
							}}>
							<Image
								source={require("../../assets/icons/red_trash.png")}
								style={styles.buttonDeleteTrans}
							/>
							<Text style={{ color: "#c70404" }}>Delete</Text>
						</Pressable>
					</View>
				</View>
			</View>
		);
	};

	useEffect(() => {
		dispatch(loadingFetchDetailWallet(true));
		setLoading(true);
		dispatch(fetchDetail(id))
			.then((data) => {
				dispatch(successFetchDetailWallet(data));
				setshowFilteredData(data.Transactions);
			})
			.finally(() => {
				setLoading(false);
				dispatch(loadingFetchDetailWallet(false));
			});
	}, [adaperubahan, sesuatu]);

	useEffect(() => {
		filterDate(detailWallet.Transactions, startDate, endDate);
	}, [startDate, endDate]);

	return (
		<>
			{loadingDetail ? (
				<LoadingScreen />
			) : (
				<View style={styles.container}>
					<View style={{ flexDirection: "row" }}>
						<View style={styles.formInput}>
							<Text style={styles.inputName}>Start date</Text>
							<Pressable onPress={showPickerStartDate}>
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
									<Text>{!startDate ? null : startDate.toLocaleString().slice(0, 10)}</Text>
									<Image
										style={{ width: 14, height: 14 }}
										source={require("../../assets/icons/arrowBottom.png")}
									/>
								</View>
							</Pressable>
							<>
								{pickerStartDateShow && (
									<DateTimePicker
										value={startDate}
										mode="date"
										positiveButtonLabel="Confirm"
										display="default"
										onChange={onChangeStartDate}
									/>
								)}
							</>
						</View>
						<View style={styles.formInput}>
							<Text style={styles.inputName}>End date</Text>
							<Pressable onPress={showPickerEndDate}>
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
									<Text>{!endDate ? null : endDate.toLocaleString().slice(0, 10)}</Text>
									<Image
										style={{ width: 14, height: 14 }}
										source={require("../../assets/icons/arrowBottom.png")}
									/>
								</View>
							</Pressable>
							<>
								{pickerEndDateShow && (
									<DateTimePicker
										value={endDate}
										mode="date"
										positiveButtonLabel="Confirm"
										display="default"
										onChange={onChangeEndDate}
									/>
								)}
							</>
						</View>
						<View style={styles.buttonToAdd}>
							<Pressable style={styles.buttonAdd} onPress={resetFilter}>
								<Text style={styles.buttonText}>Reset</Text>
							</Pressable>
						</View>
					</View>
					{loading && <LoadingScreen />}
					{!loading && (
						<ScrollView style={styles.scrollView}>
							{showFilteredData.length === 0 ? (
								<View style={styles.boxEmpty}>
									<Text style={styles.emptyValue}>Opss... no transaction data available</Text>
								</View>
							) : (
								<>
									<View style={styles.pieChart}>
										<Text style={styles.walletName}>{detailWallet.name}</Text>

										<VictoryPie
											colorScale={["#cc5656", "#7eb764"]}
											animate={{ easing: "exp", duration: 2000 }}
											data={wantedGraphicData(showFilteredData)}
											innerRadius={20}
											width={400}
											height={300}
											style={{
												data: {
													stroke: "#fff",
													strokeWidth: 0.5,
												},
											}}
										/>

										<View style={styles.total}>
											<View style={styles.income}>
												<Text style={styles.incomeText}>Income</Text>
												<Text style={styles.amountIncome}>
													{
														formatCurrency({
															amount: setTotalIncome(showFilteredData),
															code: "IDR",
														})[0]
													}
												</Text>
											</View>
											<View style={styles.outcome}>
												<Text style={styles.incomeText}>Expenses</Text>
												<Text style={styles.amountOutcome}>
													{
														formatCurrency({
															amount: setTotalExpense(showFilteredData),
															code: "IDR",
														})[0]
													}
												</Text>
											</View>
										</View>
									</View>

									<View style={styles.pieChartbyCategory}>
										<VictoryPie
											colorScale={sameColorCategory(setCategoryName(showFilteredData))}
											animate={{ easing: "exp", duration: 2000 }}
											data={wantedGraphicDataByCategory(setCategoryName(showFilteredData))}
											innerRadius={20}
											width={540}
											height={300}
											style={{
												data: {
													stroke: "#fff",
													strokeWidth: 0.5,
												},
											}}
										/>
									</View>
								</>
							)}
							<View style={styles.categoryList}>
								<FlatList
									data={setCategoryName(showFilteredData)}
									renderItem={renderListWalletWithColor}
									keyExtractor={(item, index) => index}
									horizontal={true}
									persistentScrollbar={true}
									style={{ height: 30 }}
								/>
							</View>
							<View style={styles.walletList}>
								<View style={styles.collaborator}>
									<Text style={styles.textCollaborator}>Collaborator</Text>
									<FlatList
										data={detailWallet.UserWallets}
										renderItem={renderUserWallets}
										keyExtractor={(el) => el.id}
									/>
								</View>

								<View style={styles.transaction}>
									<Text style={styles.textTransaction}>Transaction Detail</Text>
									<FlatList
										data={showFilteredData}
										renderItem={renderItem}
										keyExtractor={(el) => el.id}
									/>
								</View>
							</View>
						</ScrollView>
					)}
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",

		height: Dimensions.get("window").height,
		marginTop: 10,
	},
	walletCard: {
		marginTop: 15,
		marginBottom: 5,
		marginHorizontal: 5,
		backgroundColor: "white",
		paddingVertical: 20,
		borderRadius: 10,
		flexDirection: "row",
		paddingLeft: 15,
		paddingRight: 15,
		width: Dimensions.get("window").width * 0.8,
		position: "relative",
		elevation: 5,
	},
	walletList: {
		width: Dimensions.get("window").width,
		paddingTop: 35,
	},
	scrollView: {
		width: Dimensions.get("window").width,
	},
	transaction: {
		alignItems: "center",
		justifyContent: "center",
		width: Dimensions.get("window").width,
		position: "relative",
	},
	pieChart: {
		alignItems: "center",
		justifyContent: "center",
	},
	walletName: {
		fontWeight: "bold",
		fontSize: 22,
	},
	total: {
		width: Dimensions.get("window").width * 0.8,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 25,
		paddingRight: 25,
		height: Dimensions.get("window").height * 0.1,
		backgroundColor: "white",
		alignItems: "center",
		borderRadius: 10,
		elevation: 5,
	},
	incomeText: {
		fontWeight: "bold",
		fontSize: 18,
	},
	amountOutcome: {
		color: "#cc5656",
		fontWeight: "bold",
		fontSize: 14,
	},
	amountIncome: {
		color: "#7eb764",
		fontWeight: "bold",
		fontSize: 14,
	},
	pieChartbyCategory: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50,
		elevation: 10,
	},
	collaborator: {
		marginBottom: 25,
		alignItems: "center",
		justifyContent: "center",
		width: Dimensions.get("window").width,
	},

	emptyValue: {
		fontSize: 15,
	},
	boxEmpty: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height * 0.1,
		alignItems: "center",
		justifyContent: "center",
	},
	cardDetail: {
		flexDirection: "row",
		marginBottom: 5,
	},
	incomeDetails: {
		marginLeft: 15,
		fontWeight: "bold",
		width: Dimensions.get("window").width * 0.42,
	},
	incomeName: {
		width: Dimensions.get("window").width * 0.2,
	},

	incomeDetailsExpense: {
		color: "#cc5656",
		fontWeight: "bold",
		fontSize: 14,
		marginLeft: 15,
	},
	incomeDetailsIncome: {
		color: "#7eb764",
		fontWeight: "bold",
		fontSize: 14,
		marginLeft: 15,
	},
	buttonDelete: {
		width: Dimensions.get("window").width * 0.04,
		height: Dimensions.get("window").height * 0.03,
	},
	backgroundButtonEdit: {
		display: "flex",
		flexDirection: "row",
		borderWidth: 1,
		paddingVertical: 3,
		paddingHorizontal: 10,
		borderRadius: 10,
		borderColor: "#8d6e03",
		backgroundColor: "#fffbeb",
		justifyContent: "center",
		alignItems: "center",
		marginEnd: 5,
	},
	backgroundButtonDelete: {
		display: "flex",
		flexDirection: "row",
		borderWidth: 1,
		paddingVertical: 3,
		paddingHorizontal: 10,
		borderRadius: 10,
		borderColor: "#c70404",
		backgroundColor: "#ffeaea",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonEdit: {
		width: Dimensions.get("window").width * 0.03,
		height: Dimensions.get("window").height * 0.018,
		marginEnd: 6,
	},
	buttonDeleteTrans: {
		width: Dimensions.get("window").width * 0.03,
		height: Dimensions.get("window").height * 0.018,
		marginEnd: 6,
	},
	trashPosition: {
		position: "absolute",
		right: 10,
		top: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	iconPositions: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: Dimensions.get("window").width * 0.5,
		height: Dimensions.get("window").height * 0.05,
	},
	textCollaborator: {
		fontWeight: "bold",
		fontSize: 18,
	},
	textTransaction: {
		fontWeight: "bold",
		fontSize: 18,
	},
	roleText: {
		fontWeight: "bold",
		width: Dimensions.get("window").width * 0.2,
	},
	categoryList: {
		marginBottom: 30,
		paddingLeft: 10,
		paddingRight: 10,
		width: Dimensions.get("window").width,
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
		marginBottom: 20,
		marginHorizontal: 5,
	},
	buttonToAdd: {
		justifyContent: "center",
		alignItems: "center",
	},
	buttonAdd: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		height: Dimensions.get("window").height * 0.05,
		width: Dimensions.get("window").width * 0.12,
		backgroundColor: "#2F6FFF",
		borderRadius: 10,
		marginLeft: 5,
	},
	buttonText: {
		color: "white",
	},
	deleteCollaborator: {
		position: "absolute",
		right: 15,
		top: 37,
		alignItems: "center",
		justifyContent: "center",
	},
});
