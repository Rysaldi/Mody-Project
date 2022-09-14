import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  userHistory,
  loadingUserHistoryDispatch,
} from "../store/actionCreator/user";
import LoadingScreen from "./LoadingScreen";
import { formatCurrency } from "react-native-format-currency";

export default function CardLatesHistory() {
  const { userDetail, loadingUserHistory } = useSelector(
    (state) => state.userReducer
  );
  const [latestTransaction, setLatestTransaction] = useState([]);

  useState(() => {
    setLatestTransaction(userDetail.Transactions)
  }, [])

  const renderItemHistory = ({ item }) => {
    // console.log(item)
    return (
      <SafeAreaView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal:20
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
              <Text style={styles.textHeader}>{item.name}</Text>

              <Text style={{ fontSize: 12, color: "#808080" }}>
                {new Date(item.date).toLocaleString()}
              </Text>
            </View>
          </View>
          {/* <View style={{position:"absolute", right:100}}>
          <Text
            style={{
              backgroundColor: "#797b80",
              color: "#fff",
              padding: 5,
              borderRadius: 5,
              fontSize: 12,
              fontWeight: "bold",
              width:Dimensions.get("window").width * 0.3,
              textAlign:"center",
            }}
          >
            {item.Category.name}
          </Text>
          </View> */}
          {item.Category.type === "Income" ? (
            <Text style={styles.plusNumber}>{formatCurrency({ amount: item.amount, code: "IDR"})[0]}</Text>
          ) : (
            <Text style={styles.minusNumber}>{formatCurrency({ amount: item.amount, code: "IDR"})[0]}</Text>
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
          keyExtractor={(item, index) => {
            return index
          }}
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
    fontSize: 15,
    color: "#242525",
  },
  minusNumber: {
    color:"#fff",
    fontWeight:"bold",
    fontSize:12,
    padding:5,
    borderRadius:5,
    backgroundColor:"#a21a1a",
    width : Dimensions.get("window").width * 0.3,
    textAlign:"center"
  },
  plusNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    padding:5,
    borderRadius:5,
    backgroundColor:"#388c12",
    width : Dimensions.get("window").width * 0.3,
    textAlign:"center"
  },
});
