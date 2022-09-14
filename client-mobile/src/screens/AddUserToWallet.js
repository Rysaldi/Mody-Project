import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNewUserWallet } from "../store/actionCreator/userWallet";
import DropDownPicker from "react-native-dropdown-picker";

export default function AddUserToWallet({ navigation, route }) {
  const { id } = route.params;

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [addToWalletEmail, setAddToWalletEmail] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [role, setRole] = React.useState([
    { label: "Manager", value: "Manager" },
    { label: "Member", value: "Member" },
  ]);

  const submitAddToWallet = () => {
    dispatch(
      addNewUserWallet({
        email: addToWalletEmail,
        WalletId: id,
        role: value,
        UserId: 2,
      })
    )
      .then((_) => {
        setAddToWalletEmail("");
        navigation.navigate("WalletApp");
      })
      .finally(() => dispatch(setLoadingAddUserToWallet(false)));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formAddWallet}>
          <Text style={styles.textAdd}>Email</Text>
          <TextInput
            value={addToWalletEmail}
            onChangeText={setAddToWalletEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.formAddWallet}>
          <Text style={styles.textAdd}>Role</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={role}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setRole}
            style={{ marginTop: 10, borderColor: "#ddd" }}
          />
        </View>
        <View style={styles.buttonToAdd}>
          <Pressable style={styles.buttonAdd}>
            <Text style={styles.buttonText} onPress={submitAddToWallet}>
              Add collaborator
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formAdd: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.29,
    backgroundColor: "#2F6FFF",
    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomRightRadius: 50,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#242525",
  },
  textAdd: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#171717",
    marginTop: 10,
  },
  formAddWallet: {
    justifyContent: "space-between",
    marginTop: 15,
  },
  input: {
    height: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.9,

    paddingRight: 10,
    borderBottomWidth: 2,
    borderColor: "#ddd",
    color: "#171717",
    marginTop: 10,
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
    backgroundColor: "#171717",
    paddingVertical: 20,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,

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
    height: Dimensions.get("window").height * 0.04,
    width: Dimensions.get("window").width * 0.15,
  },
  buttonToReport: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.04,
    width: Dimensions.get("window").width * 0.15,
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
    marginBottom: 15,
  },
  imageIcon: {
    height: Dimensions.get("window").height * 0.035,
    width: Dimensions.get("window").width * 0.05,
  },
});
