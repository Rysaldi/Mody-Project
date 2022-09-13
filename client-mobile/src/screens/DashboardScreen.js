import {
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import CardLatesHistory from "../components/CardLatesHistory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  userHistory,
  loadingUserHistoryDispatch,
} from "../store/actionCreator/user";
import LoadingScreen from "../components/LoadingScreen";

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

  useEffect(() => {}, []);
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

            {/* Main Sections */}
            <View style={{ flex: 2.7, paddingTop: 10 }}>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.textHeader}>This week expenses</Text>
              </View>
              <ScrollView style={{ paddingHorizontal: 20, paddingTop: 15 }}>
                {/* ITEM */}
                <View style={styles.mainCard}>
                  <View style={styles.contentMainCard}>
                    <View style={styles.frameMainLogo}>
                      <Image
                        style={styles.mainLogo}
                        source={require("../../assets/icons/food.png")}
                      />
                    </View>
                    <Text style={styles.textCard}>Food</Text>
                  </View>
                  <Text style={styles.minusNumber}>- Rp. 20.000.,00</Text>
                </View>
                {/* ITEM */}
                <View style={styles.mainCard}>
                  <View style={styles.contentMainCard}>
                    <View style={styles.frameMainLogo}>
                      <Image
                        style={styles.mainLogo}
                        source={require("../../assets/icons/entertaiment.png")}
                      />
                    </View>
                    <Text style={styles.textCard}>Entertainment</Text>
                  </View>
                  <Text style={styles.minusNumber}>- Rp. 20.000.,00</Text>
                </View>
                {/* ITEM */}
                <View style={styles.mainCard}>
                  <View style={styles.contentMainCard}>
                    <View style={styles.frameMainLogo}>
                      <Image
                        style={styles.mainLogo}
                        source={require("../../assets/icons/holiday.png")}
                      />
                    </View>
                    <Text style={styles.textCard}>Holiday</Text>
                  </View>
                  <Text style={styles.minusNumber}>- Rp. 20.000.,00</Text>
                </View>
                {/* ITEM */}
                <View style={styles.mainCard}>
                  <View style={styles.contentMainCard}>
                    <View style={styles.frameMainLogo}>
                      <Image
                        style={styles.mainLogo}
                        source={require("../../assets/icons/investasi.png")}
                      />
                    </View>
                    <Text style={styles.textCard}>Investasi</Text>
                  </View>
                  <Text style={styles.plusNumber}>Rp. 20.000.,00</Text>
                </View>
              </ScrollView>
            </View>

            {/* latest history */}
            <View style={{ flex: 2, paddingHorizontal: 20, paddingTop: 20 }}>
              <View>
                <Text style={styles.textHeader}>
                  Latest Transactions History
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
    marginBottom: 10,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  frameMainLogo: {
    width: 45,
    height: 45,
    backgroundColor: "#ddd",
    borderRadius: 50,
    marginRight: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  mainLogo: {
    width: 30,
    height: 30,
  },
  contentMainCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textCard: {
    fontSize: 18,
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
