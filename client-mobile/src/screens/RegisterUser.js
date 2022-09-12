import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import { userRegister } from "../store/actionCreator/users/users";
import { useDispatch } from "react-redux";
export default function RegisterUser() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const onChange = (e) => {
    const keys = Object.keys(e)[0];
    const values = Object.values(e)[0];
    setRegisterForm({
      ...registerForm,
      [keys]: values,
    });
  };
  const onSubmit = () => {
    dispatch(userRegister(registerForm))
      .then(() => {
        navigation.navigate("SignIn");
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
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
                onChangeText={(text) => onChange({ email: text })}
                value={registerForm.email}
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
                onChangeText={(text) => onChange({ username: text })}
                value={registerForm.username}
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
                onChangeText={(text) => onChange({ password: text })}
                value={registerForm.password}
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  form: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.45,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  signUp: {
    justifyContent: "center",
  },
  formInput: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
    marginBottom: 10,
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
    fontSize: 17,
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
  toLogin: {
    color: "#2F6FFF",
  },
});
