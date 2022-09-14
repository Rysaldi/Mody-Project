import {
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  FlatList
} from "react-native";
import CardLatesHistory from "../components/CardLatesHistory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  userHistory,
  loadingUserHistoryDispatch,
} from "../store/actionCreator/user";
import LoadingScreen from "../components/LoadingScreen";
import { formatCurrency } from "react-native-format-currency";

export default function DashboardScreen() {
  const dispatch = useDispatch();
  const { userDetail, loadingUserHistory } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    dispatch(userHistory())
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(loadingUserHistoryDispatch(false));
      });
  }, []);

  const renderItemUserWallets = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
      <View style={styles.mainCard}>
        <View style={styles.contentMainCard}>
          <View style={styles.frameMainLogo}>
            <Image
              style={styles.mainLogo}
              source={require("../../assets/icons/wallet_new.png")}
            />
          </View>
          <View>
            <Text style={styles.textCard}>{item.Wallet.name}</Text>
            <Text style={styles.textName}>role: {item.role}</Text>
          </View>
        
        </View>
        <View style={styles.amountDetail}>
        {item.Wallet.balance < 0 ? <Text style={styles.minusNumber}>{formatCurrency({ amount: 10000, code: "IDR" })[0]}</Text> : <Text style={styles.plusNumber}>{formatCurrency({ amount: item.Wallet.balance, code: "IDR" })}</Text>}
       </View>
      </View>
    </View>
    )
  };

  return (
    <>
      {loadingUserHistory ? (
        <LoadingScreen />
      ) : (
        <>
          {/* Navbar */}
          <View style={styles.mainContainer}>
            <View style={styles.containerNavbar}>
              <Image
                style={styles.logo}
                source={require("../../assets/moody_pertama.png")}
              />
              <View style={styles.frameImgNav}>
                <Image
                  style={styles.imgNav}
                  source={{ uri: userDetail.Profile.profilePicture }}
                />
              </View>
            </View>

            {/* Header */}
            <View style={styles.containerHeader}>
              <View>
                <Text style={styles.textHeader}>Welcome to Your</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={styles.textHeaderDash}>Dash</Text>
                  <Text style={styles.textHeaderBoard}>board</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.textHeader}>Your Wallets</Text>
              </View>
              <FlatList
                data={userDetail.UserWallets}
                renderItem={renderItemUserWallets}
                keyExtractor={(item) => item.id}
              />
            </View>

            <View style={{ flex: 2, paddingTop: 20 }}>
              <View>
                <Text style={styles.textHeaderTran}>
                  Your transactions history
                </Text>
                <CardLatesHistory />
                <CardLatesHistory />
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#242525",
    marginBottom: 5,
  },
  textHeaderTran: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#242525",
    // marginBottom: 20,
    marginStart: 20,
  },
  frameImgNav: {
    width: 50,
    height: 50,
    backgroundColor: "#ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 70,
    overflow: "hidden",
  },
  logo: {
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").height * 0.12,
  },
  imgNav: {
    width: 50,
    height: 50,
  },
  containerNavbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    marginTop: 10,
  },
  containerHeader: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textHeaderDash: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#242525",
  },
  textHeaderBoard: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2F6FFF",
  },
  frameHeaderIconPlus: {
    width: 25,
    height: 25,
    backgroundColor: "#ccf0bb",
    borderRadius: 50,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  frameHeaderIconMinus: {
    width: 25,
    height: 25,
    backgroundColor: "#f5d0d0",
    borderRadius: 50,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconHeader: {
    width: 18,
    height: 18,
  },
  containerContentIconHeader: {
    alignItems: "center",
    marginRight: 10,
  },
  mainCard: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",


   width: Dimensions.get("window").width * 0.9,
   height: Dimensions.get("window").height * 0.1,

   backgroundColor: "white",
    borderRadius: 10,
    elevation:5
  },
  frameMainLogo: {
    width: 50,
    height: 50,
    marginRight: 15,
    overflow: "hidden",
    justifyContent: "center",
    marginLeft:15
 
  
    
  },
  mainLogo: {
    width: 30,
    height: 30,
  },
  contentMainCard: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  textCard: {
    fontSize: 18,
  },
  minusNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#a21a1a",
  },
  plusNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#388c12",
  },
  textName: {
    color: "#808080",
    fontSize: 12,
  },amountDetail:{
    marginRight:15
  }
});
