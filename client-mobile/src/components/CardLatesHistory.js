import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  userHistory,
  loadingUserHistoryDispatch,
} from "../store/actionCreator/user";
import LoadingScreen from "./LoadingScreen";

export default function CardLatesHistory() {
  const dispatch = useDispatch();
  const { userDetail, loadingUserHistory } = useSelector(
    (state) => state.userReducer
  );
  const [latestTransaction, setLatestTransaction] = useState([]);

  useEffect(() => {
    dispatch(userHistory())
      .then(async (data) => {
        setLatestTransaction(data.Transactions.slice(0, 1));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log(loadingUserHistory);
        dispatch(loadingUserHistoryDispatch(false));
      });
  }, []);

  const renderItemHistory = ({ item }) => {
    return (
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.textHeader}>{item.Wallet.name}</Text>

              <Text style={{ fontSize: 12, color: "#808080" }}>
                {new Date(item.date).toLocaleString()}
              </Text>
            </View>
          </View>
          <Text
            style={{
              backgroundColor: "#ccf0bb",
              color: "#7eb764",
              padding: 5,
              borderRadius: 5,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {item.Category.name}
          </Text>
          {item.Category.type === "Income" ? (
            <Text style={styles.plusNumber}>Rp. {item.amount}</Text>
          ) : (
            <Text style={styles.minusNumber}>Rp. {item.amount}</Text>
          )}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <>
      {loadingUserHistory ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={latestTransaction}
          renderItem={renderItemHistory}
          keyExtractor={(index) => index}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  framePictureHistory: {
    width: 50,
    height: 0,
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 70,
    overflow: "hidden",
    marginTop: 10,
    marginRight: 20,
  },
  textHeader: {
    fontSize: 16,
    color: "#242525",
  },
  minusNumber: {
    color: "#cc5656",
    fontWeight: "bold",
    fontSize: 12,
  },
  plusNumber: {
    color: "#7eb764",
    fontWeight: "bold",
    fontSize: 12,
  },
});
