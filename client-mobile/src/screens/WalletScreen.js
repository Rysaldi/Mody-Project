import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Image,
} from "react-native";
export default function WalletScreen() {
  const [addWalletForm, setAddWalletForm] = React.useState({
    name: "",
  });
  return (
    <View style={styles.container}>
      <View style={styles.formAdd}>
        <Text style={styles.headerText}>Wallet</Text>
        <Text style={styles.textAdd}>Add New Wallet</Text>
        <View style={styles.formAddWallet}>
          <Text style={styles.textAdd}>Name</Text>
          <TextInput
            value={addWalletForm.name}
            onChangeText={setAddWalletForm}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonToAdd}>
          <Pressable style={styles.buttonAdd}>
            <Text style={styles.buttonText}>Add Wallet</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.walletList}>
        <View style={styles.walletCard}>
          <Image
            source={require("../../assets/icons/wallet.png")}
            style={styles.walletIcon}
          />
          <Text style={styles.walletName}>Wallet 1</Text>
          <Pressable style={styles.buttonToTransaction}>
            <Text style={styles.buttonText}>Transaction</Text>
          </Pressable>
          <Pressable style={styles.buttonToReport}>
            <Text style={styles.buttonText}>See Report</Text>
          </Pressable>
        </View>
        <View style={styles.walletCard}>
          <Image
            source={require("../../assets/icons/wallet.png")}
            style={styles.walletIcon}
          />
          <Text style={styles.walletName}>Wallet 1</Text>
          <Pressable style={styles.buttonToTransaction}>
            <Text style={styles.buttonText}>Transaction</Text>
          </Pressable>
          <Pressable style={styles.buttonToReport}>
            <Text style={styles.buttonText}>See Report</Text>
          </Pressable>
        </View>
        <View style={styles.walletCard}>
          <Image
            source={require("../../assets/icons/wallet.png")}
            style={styles.walletIcon}
          />
          <Text style={styles.walletName}>Wallet 1</Text>
          <Pressable style={styles.buttonToTransaction}>
            <Text style={styles.buttonText}>Transaction</Text>
          </Pressable>
          <Pressable style={styles.buttonToReport}>
            <Text style={styles.buttonText}>See Report</Text>
          </Pressable>
        </View>
        <View style={styles.walletCard}>
          <Image
            source={require("../../assets/icons/wallet.png")}
            style={styles.walletIcon}
          />
          <Text style={styles.walletName}>Wallet 1</Text>
          <Pressable style={styles.buttonToTransaction}>
            <Text style={styles.buttonText}>Transaction</Text>
          </Pressable>
          <Pressable style={styles.buttonToReport}>
            <Text style={styles.buttonText}>See Report</Text>
          </Pressable>
        </View>
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
    backgroundColor: "#d9d9d9",
    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
  },

  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#000",
  },
  textAdd: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
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
    borderColor: "#000",
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
    backgroundColor: "#2F6FFF",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
  },

  walletList: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
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
  walletIcon: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").height * 0.055,
  },
  walletName: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },
  buttonToTransaction: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.035,
    width: Dimensions.get("window").width * 0.2,

    backgroundColor: "#2F6FFF",
    marginLeft: 25,
  },
  buttonToReport: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.035,
    width: Dimensions.get("window").width * 0.2,

    backgroundColor: "#2F6FFF",
    marginLeft: 25,
  },
});
