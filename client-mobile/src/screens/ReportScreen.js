import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { fetchDetail } from "../store/actionCreator/wallet";

import { VictoryPie } from "victory-native";
import { fetchCategories } from "../store/actionCreator/category";
export default function ReportScreen({ route }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { detailWallet } = useSelector((state) => {
    return state.walletReducer;
  });

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

  const renderItem = ({ item }) => {
    return (
      <View style={styles.walletCard}>
        <Text style={styles.item}>
          {item.name} - Rp. {item.amount} - {item.Category.type} -{" "}
          {item.Category.name}
        </Text>
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

  const percentageIncome = (amount) => {
    return (
      (setTotalIncome(amount) /
        (setTotalIncome(amount) + setTotalExpense(amount))) *
      100
    );
  };

  const percentageExpenses = (amount) => {
    return (
      (setTotalExpense(amount) /
        (setTotalIncome(amount) + setTotalExpense(amount))) *
      100
    );
  };

  const wantedGraphicData = [
    {
      x: " ",
      y: percentageIncome(detailWallet.Transactions),
    },
    {
      x: " ",
      y: percentageExpenses(detailWallet.Transactions),
    },
  ];
  const graphicColor = [
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
  const defaultGraphicData = [{ x: "Empty", y: 100 }];
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
    dispatch(fetchDetail(id));
  }, []);
  const categoryName = detailWallet.Transactions.map((el) => {
    return { name: el.Category.name, amount: el.amount };
  });

  const wantedGraphicDataByCategory = categoryName.map((el) => {
    return {
      x: el.name,
      y: (el.amount / setTotalIncome(detailWallet.Transactions)) * 100,
    };
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.pieChart}>
          <Text style={styles.walletName}>{detailWallet.name}</Text>
          <VictoryPie
            colorScale={["#cc5656", "#7eb764"]}
            animate={{ easing: "exp", duration: 2000 }}
            data={graphicData}
            innerRadius={20}
            width={350}
            height={250}
            style={{
              data: {
                stroke: "#fff",
                strokeWidth: 2,
              },
            }}
          />
          <View style={styles.total}>
            <View style={styles.income}>
              <Text style={styles.incomeText}>Income</Text>
              <Text style={styles.amountIncome}>
                Rp. {setTotalIncome(detailWallet.Transactions)}
              </Text>
            </View>
            <View style={styles.outcome}>
              <Text style={styles.incomeText}>Expenses</Text>
              <Text style={styles.amountOutcome}>
                Rp. {setTotalExpense(detailWallet.Transactions)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.pieChartbyCategory}>
          <VictoryPie
            colorScale={[
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
            ]}
            animate={{ easing: "exp", duration: 5000 }}
            data={wantedGraphicDataByCategory}
            // innerRadius={20}
            labelRadius={({ innerRadius }) => innerRadius + 95}
            padAngle={({ datum }) => datum.x}
            width={450}
            height={250}
            style={{
              data: {
                stroke: "#fff",
                strokeWidth: 2,
              },
            }}
          />
        </View>
        <View style={styles.walletList}>
          <View style={styles.collaborator}>
            <Text>Collaborator</Text>
            <FlatList
              data={detailWallet.UserWallets}
              renderItem={renderUserWallets}
              keyExtractor={(el) => el.id}
            />
          </View>

          <View style={styles.transaction}>
            <Text>Transaction Detail</Text>
            <FlatList
              data={detailWallet.Transactions}
              renderItem={renderItem}
              keyExtractor={(el) => el.id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 4,
    elevation: 5,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,

    alignItems: "center",
  },
  walletList: {
    width: Dimensions.get("window").width,

    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
  },
  scrollView: {
    width: Dimensions.get("window").width,
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
    elevation: 10,
    backgroundColor: "white",
    alignItems: "center",
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
  },
  collaborator: {
    marginBottom: 25,
  },
});
