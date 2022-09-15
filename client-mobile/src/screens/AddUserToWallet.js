import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNewUserWallet, setLoadingAddUserToWallet } from "../store/actionCreator/userWallet";
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

  const errorAlert = (error) => {
    return Alert.alert(
      "",
      error,
      [{ text: "OK" }]
    );
  };

  const submitAddToWallet = () => {
    dispatch(
      addNewUserWallet({
        email: addToWalletEmail,
        WalletId: id,
        role: value,
      })
    )
      .then((_) => {
        setAddToWalletEmail("");
        navigation.navigate("WalletApp");
      })
      .catch((error) => {
        errorAlert(error.message);
      })
     
  };



  return (
    <>
      <View style={styles.container}>
        <View style={styles.bannerColor}>
          <View style={styles.banner}>
            <Image
              style={styles.imageBanner}
              source={require("../../assets/icons/banner_copy.png")}
            />
          </View>
        </View>
        <KeyboardAvoidingView>
          <View style={styles.formBannerAdd}>
            <View style={styles.formAddWallet}>
              <Text style={styles.textAdd}>Email</Text>
              <TextInput
                value={addToWalletEmail}
                onChangeText={(e) => setAddToWalletEmail(e)}
                style={styles.input}
                placeholder="input collaborator's email"
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
                style={{
                  marginTop: 10,
                  borderColor: "#ddd",
                  height: Dimensions.get("window").height * 0.065,
                }}
              />
            </View>
            <View style={styles.buttonToAdd}>
              <Pressable style={styles.buttonAdd}>
                <Text style={styles.buttonText} onPress={(e) => submitAddToWallet()}>
                  Add collaborator
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomRightRadius: 50,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#424242",
  },
  textAdd: {
    tWeight: "boldnTop: 10",
  },
  formAddWallet: {
    justifyContent: "space-between",
    marginTop: 15,
  },
  input: {
    marginTop: 10,
    height: Dimensions.get("window").height * 0.065,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: "#d9d9d9",
    color: "#424242",
    backgroundColor: "#fff",
  },
  buttonToAdd: {
    alignItems: "center",
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").width * 0.4,
    borderRadius: 10,
    backgroundColor: "#2F6FFF",
    marginTop: 25,
  },
  buttonText: {
    color: "#F4F6FB",
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
    color: "#424242",
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
  banner: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageBanner: {
    height: Dimensions.get("window").height * 0.3,
    width: Dimensions.get("window").width * 0.6,
  },
  textAsking: {
    width: Dimensions.get("window").width * 0.55,
    justifyContent: "center",
    alignItems: "center",
  },
  invitingText: {
    fontSize: 24,
    color: "#F4F6FB",
  },
  askIcon: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
  bannerColor: {
    backgroundColor: "#2F6FFF",
    width: Dimensions.get("window").width,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,

    borderBottomRightRadius: 50,
  },
  formBannerAdd: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
