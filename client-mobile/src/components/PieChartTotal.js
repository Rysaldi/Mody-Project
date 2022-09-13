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
export default function PieChartTotal() {
  //   const { id } = route.params;
  //   const dispatch = useDispatch();
  //   const { detailWallet } = useSelector((state) => {
  //     return state.walletReducer;
  //   });
  //   React.useEffect(() => {
  //     dispatch(fetchDetail(id));
  //   }, []);

  //   const setTotalIncome = (transactions) => {
  //     if (!transactions || transactions.length === 0) {
  //       return 0;
  //     }
  //     let totalIncome = 0;
  //     transactions.forEach((transaction) => {
  //       if (transaction.Category.type === "Income") {
  //         totalIncome = totalIncome + Number(transaction.amount);
  //       }
  //     });
  //     return totalIncome;
  //   };

  //   const setTotalExpense = (transactions) => {
  //     if (!transactions || transactions.length === 0) {
  //       return 0;
  //     }
  //     let totalExpense = 0;
  //     transactions.forEach((transaction) => {
  //       if (transaction.Category.type === "Expense") {
  //         totalExpense = totalExpense + Number(transaction.amount);
  //       }
  //     });
  //     return totalExpense;
  //   };

  //   const percentageIncome = (amount) => {
  //     return (
  //       (setTotalIncome(amount) /
  //         (setTotalIncome(amount) + setTotalExpense(amount))) *
  //       100
  //     );
  //   };

  //   const percentageExpenses = (amount) => {
  //     return (
  //       (setTotalExpense(detailWallet.Transactions) /
  //         (setTotalIncome(detailWallet.Transactions) +
  //           setTotalExpense(detailWallet.Transactions))) *
  //       100
  //     );
  //   };

  //   const wantedGraphicData = [
  //     {
  //       x: " ",
  //       y: percentageIncome(detailWallet.Transactions),
  //     },
  //     {
  //       x: " ",
  //       y: percentageExpenses(detailWallet.Transactions),
  //     },
  //   ];

  //   const defaultGraphicData = [
  //     { x: "Income", y: 0 },
  //     { x: "Expenses", y: 0 },
  //   ];
  //   const [graphicData, setGraphicData] = useState(defaultGraphicData);
  //   useEffect(() => {
  //     setGraphicData(wantedGraphicData); // Setting the data that we want to display
  //   }, []);

  return;
}
