import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
export default function ReportScreen({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { detailWallet } = useSelector((state) => {
    // console.log(state);
    return state.walletReducer;
  });
  React.useEffect(() => {
    dispatch(fetchDetail(id));
    console.log(id);
  }, []);

  const setTotalIncome = (transactions) => {
    console.log(transactions);
    ;
    if (!transactions || transactions.length === 0) {
      return 0;
    }
    let totalIncome = 0;
    transactions.forEach(transaction => {
      if (transaction.Category.type === "Income") {
        totalIncome = totalIncome + Number(transaction.amount);
      };
    });
    return totalIncome;
  };

  const setTotalExpense = (transactions) => {
    console.log(transactions);
    if (!transactions || transactions.length === 0) {
      return 0;
    }
    let totalExpense = 0;
    transactions.forEach(transaction => {
      if (transaction.Category.type === "Expense") {
        totalExpense = totalExpense + Number(transaction.amount);
      };
    });
    return totalExpense;
  };








  const renderItem = ({ item }) => {
    return (
      <View style={styles.walletCard}>
        <Text style={styles.item}>{item.name} - </Text>
        <Text style={styles.item}>Rp. {item.amount} - </Text>
        {/* <Text style={styles.item}>{item.date}</Text> */}
        <Text style={styles.item}>{item.Category.type} - </Text>
        <Text style={styles.item}>{item.Category.name}</Text>
      </View>
    );
  };

  const renderUserWallets = ({ item }) => {
    return (
      <View style={styles.walletCard}>
        <Text style={styles.item}>{item.User.email} - </Text>
        <Text style={styles.item}>{item.User.username} - </Text>
        <Text style={styles.item}>{item.role} - </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text>{detailWallet.name}</Text>
      <Text>Rp. {detailWallet.balance}</Text>
      <Text>Total Income : {setTotalIncome(detailWallet.Transactions)}</Text>
      <Text>total Expense : {setTotalExpense(detailWallet.Transactions)}</Text>

      <View style={styles.walletList}>
        <Text>User</Text>
        <FlatList
          data={detailWallet.UserWallets}
          renderItem={renderUserWallets}
          keyExtractor={el => el.id}
        />

        <Text>Transaction</Text>
        <FlatList
          data={detailWallet.Transactions}
          renderItem={renderItem}
          keyExtractor={el => el.id}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    height: Dimensions.get("window").height,
    marginTop: 10
  },
  walletCard: {
    marginTop: 15,
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 4,
    elevation: 15,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,

    alignItems: "center",
  },
  walletList: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
