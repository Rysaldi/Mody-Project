import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchWallets,
  addNewWallet,
  deleteWallet,
} from "../store/actionCreator/wallet";
import LoadingScreen from "../components/LoadingScreen";
import {
  userHistory,
  loadingUserHistoryDispatch,
} from "../store/actionCreator/user";

export default function WalletScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [walletName, setWalletName] = React.useState("");
  const { wallets, loadingWallets } = useSelector((state) => {
    return state.walletReducer;
  });

  React.useEffect(() => {
    dispatch(fetchWallets()).catch((error) => {
      console.log(error);
    });
  }, []);

  const submitAddWallet = () => {
    dispatch(loadingUserHistoryDispatch(true));
    dispatch(
      addNewWallet({
        name: walletName,
      })
    )
      .then((_) => {
        dispatch(userHistory());
        setWalletName("");
      })
      .finally(() => {
        dispatch(loadingUserHistoryDispatch(false));
      });
  };

  const submitDeleteWallet = (walletId) => {
    dispatch(loadingUserHistoryDispatch(true));
    dispatch(deleteWallet(walletId))
      .then(() => {
        dispatch(userHistory());
      })
      .finally(() => {
        dispatch(loadingUserHistoryDispatch(false));
      });
  };

  const renderCategoryList = ({ item }) => {
    return (
      <View style={styles.walletCard}>
        <View style={styles.walletName}>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "#424242" }}>
            {item.name}
          </Text>
        </View>
        <View style={styles.features}>
          <View style={styles.iconGroup}>
            <Pressable
              style={styles.buttonToTransaction}
              onPress={() =>
                navigation.navigate("Add Transaction", { id: item.id })
              }
            >
              <Image
                style={styles.imageIcon}
                source={require("../../assets/icons/TrancsactionGreen.png")}
              />
            </Pressable>
            <Text style={styles.iconText}>Add Transaction</Text>
          </View>

          <View style={styles.iconGroup}>
            <Pressable
              style={styles.buttonToTransaction}
              onPress={() =>
                navigation.navigate("Report Detail", { id: item.id })
              }
            >
              <Image
                style={styles.imageIcon}
                source={require("../../assets/icons/editGreen.png")}
              />
            </Pressable>
            <Text style={styles.iconText}>Report Detail</Text>
          </View>
          <View style={styles.iconGroup}>
            <Pressable
              style={styles.buttonToTransaction}
              onPress={() =>
                navigation.navigate("Add Collaborator", { id: item.id })
              }
            >
              <Image
                style={styles.imageIcon}
                source={require("../../assets/icons/addContributorYellow.png")}
              />
            </Pressable>
            <Text style={styles.iconText}>Add Contact</Text>
          </View>

          <View style={styles.iconGroup}>
            <Pressable
              style={styles.buttonToTransaction}
              onPress={() => {
                submitDeleteWallet(item.id);
              }}
            >
              <Image
                style={styles.imageIcon}
                source={require("../../assets/icons/red_trash.png")}
              />
            </Pressable>
            <Text style={styles.iconText}>Delete</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formAdd}>
          <Text style={styles.headerText}>Wallet</Text>
          <View style={styles.formAddWallet}>
            <TextInput
              value={walletName}
              onChangeText={setWalletName}
              style={styles.input}
              placeholder="Input New Wallet Name"
            />
          </View>
          <View style={styles.buttonToAdd}>
            <Pressable style={styles.buttonAdd}>
              <Text style={styles.buttonText} onPress={submitAddWallet}>
                Add Wallet
              </Text>
            </Pressable>
          </View>
        </View>
        {loadingWallets ? (
          <LoadingScreen />
        ) : (
          <View style={styles.walletList}>
            <FlatList
              data={wallets}
              renderItem={renderCategoryList}
              keyExtractor={(el) => el.id}
              horizontal={false}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formAdd: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.29,
    backgroundColor: "#2F6FFF",
    paddingTop: 35,
    borderBottomRightRadius: 40,
  },

  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
  textAdd: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  formAddWallet: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  input: {
    height: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").width * 0.8,
    paddingLeft: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 7,
  },
  buttonToAdd: {
    alignItems: "center",
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    height: Dimensions.get("window").height * 0.045,
    width: Dimensions.get("window").width * 0.3,
    borderRadius: 7,
    backgroundColor: "white",
    marginTop: 15,
  },
  buttonText: {
    color: "#1a1a1a",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },

  walletList: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
    marginTop: 15,
  },
  walletCard: {
    backgroundColor: "#fff",
    display: "flex",

    borderRadius: 7,
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    width: Dimensions.get("window").width,
  },
  walletIcon: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").height * 0.055,
  },
  walletName: {
    width: Dimensions.get("window").width * 0.25,
  },
  buttonToTransaction: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
  },
  iconGroup: {
    width: 70,
    alignItems: "center",
  },
  iconText: {
    fontSize: 10,
    textAlign: "center",
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  walletTitle: {
    width: Dimensions.get("window").width * 0.8,
  },
  imageIcon: {
    height: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.055,
  },
  buttonSymbol: {
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
  },
});
