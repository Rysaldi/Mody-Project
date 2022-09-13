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

export default function WalletScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [walletName, setWalletName] = React.useState("");

  const submitAddWallet = () => {
    dispatch(
      addNewWallet({
        name: walletName,
      })
    ).then((_) => {
      setWalletName("");
    });
  };

  const submitDeleteWallet = (walletId) => {
    dispatch(deleteWallet(walletId));
  };

  const { wallets } = useSelector((state) => {
    return state.walletReducer;
  });
  React.useEffect(() => {
    dispatch(fetchWallets()).catch((err) => {});
  }, []);

  const renderCategoryList = ({ item }) => {
    return (
      <View style={styles.walletCard}>
        <View style={styles.walletTitle}>
          <Text style={styles.walletName}>{item.name}</Text>
        </View>
        <View style={styles.features}>
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
          <Pressable
            style={styles.buttonToReport}
            onPress={() => navigation.navigate("AddToWallet", { id: item.id })}
          >
            <Image
              style={styles.imageIcon}
              source={require("../../assets/icons/addContributorYellow.png")}
            />
          </Pressable>
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
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formAdd}>
        <Text style={styles.headerText}>Wallet</Text>
        <Text style={styles.textAdd}>Add New Wallet</Text>
        <View style={styles.formAddWallet}>
          <Text style={styles.textAdd}>Name</Text>
          <TextInput
            value={walletName}
            onChangeText={setWalletName}
            style={styles.input}
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
      <View style={styles.walletList}>
        <FlatList
          data={wallets}
          renderItem={renderCategoryList}
          keyExtractor={(el) => el.id}
          horizontal={false}
          style={{ paddingHorizontal: 25 }}
        />
      </View>
    </View>
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
    paddingLeft: 25,
    paddingRight: 25,
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
    justifyContent: "space-between",
    marginTop: 15,
  },
  input: {
    height: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.55,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderColor: "white",
    color: "white",
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
    borderRadius: 20,
    backgroundColor: "white",
    marginTop: 15,
    elevation: 5,
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
    marginTop: 15,
    backgroundColor: "white",
    paddingVertical: 20,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
    width: Dimensions.get("window").width * 0.88,
    height: Dimensions.get("window").height * 0.13,
    alignItems: "center",
  },
  walletIcon: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").height * 0.055,
  },
  walletName: {
    fontSize: 18,
    color: "#000",
    marginLeft: 25,
    marginBottom: 5,
    width: Dimensions.get("window").width * 0.8,
    fontWeight: "bold",
  },
  buttonToTransaction: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonToReport: {
    justifyContent: "center",
    alignItems: "center",
  },
  features: {
    flexDirection: "row",

    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.8,
  },
  walletTitle: {
    width: Dimensions.get("window").width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageIcon: {
    height: Dimensions.get("window").height * 0.035,
    width: Dimensions.get("window").width * 0.055,
  },
});
