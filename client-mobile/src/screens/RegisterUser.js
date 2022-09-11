import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { userRegister } from "../store/actionCreator/users/users";
import { useDispatch } from "react-redux";
export default function RegisterUser() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    dispatch(userRegister({ email, username, password }))
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.form}>
        <View style={styles.signUp}>
          <Text style={styles.fontInter}>Sign Up</Text>
        </View>
        <View style={styles.formInput}>
          <View style={styles.formInputEmail}>
            <Image
              source={require("../../assets/icons/ad.png")}
              style={styles.emailIcon}
            />

            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              name="email"
            />
          </View>
          <View style={styles.formInputFullName}>
            <Image
              source={require("../../assets/icons/account.png")}
              style={styles.accountIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
          </View>
          <View style={styles.formInputPassword}>
            <Image
              source={require("../../assets/icons/password1.png")}
              style={styles.emailIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>

          <Pressable style={styles.buttonTemp} onPress={onSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
          <View style={styles.registerAccount}>
            <Text style={styles.textDetail}>
              Already have an account? click{" "}
            </Text>
            <Pressable>
              <Text
                style={styles.toLogin}
                onPress={() => navigation.navigate("SignIn")}
              >
                here
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.45,
    padding: 25,
    backgroundColor: "#fff",
  },
  signUp: {
    justifyContent: "center",
  },
  formInput: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  fontInter: {
    fontWeight: "bold",
    fontSize: 24,
  },
  formInputEmail: {
    flexDirection: "row",
    alignItems: "center",

    height: Dimensions.get("window").height * 0.05,
  },
  emailIcon: {
    width: Dimensions.get("window").width * 0.05,
    height: Dimensions.get("window").height * 0.03,
  },
  formInputFullName: {
    flexDirection: "row",
    alignItems: "center",

    height: Dimensions.get("window").height * 0.05,
  },
  accountIcon: {
    width: Dimensions.get("window").width * 0.045,
    height: Dimensions.get("window").height * 0.03,
  },
  formInputPassword: {
    flexDirection: "row",
    alignItems: "center",

    height: Dimensions.get("window").height * 0.05,
  },

  image: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.5,
  },
  input: {
    height: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.55,
    marginLeft: 20,

    paddingRight: 10,
    paddingLeft: 5,
    borderBottomWidth: 2,
    borderColor: "#d9d9d9",
  },

  buttonTemp: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    height: Dimensions.get("window").height * 0.045,
    width: Dimensions.get("window").width * 0.67,
    borderRadius: 20,
    backgroundColor: "#2F6FFF",
    marginTop: 30,
  },
  buttonText: {
    color: "white",
  },
  registerAccount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.045,
    width: Dimensions.get("window").width * 0.67,
    marginTop: 15,
  },
  textDetail: {
    fontWeight: "500",
    fontSize: 10,
  },
  toLogin: {
    fontSize: 10,
    fontWeight: "500",
    color: "#2F6FFF",
  },
});
