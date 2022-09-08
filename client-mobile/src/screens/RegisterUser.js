import React from "react";
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
export default function RegisterUser() {
  const [formRegister, setFormRegister] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.imageBackground}>
        <Image
          source={require("../../assets/icons/moody_pertama.png")}
          style={styles.image}
        />
      </View>
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
              onChangeText={setFormRegister}
              value={formRegister.email}
              placeholder="Email"
            />
          </View>
          <View style={styles.formInputFullName}>
            <Image
              source={require("../../assets/icons/account.png")}
              style={styles.accountIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={setFormRegister}
              value={formRegister.username}
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
              onChangeText={setFormRegister}
              value={formRegister.password}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.formInputButton}>
            <Pressable style={styles.buttonTemp}>
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
            <View style={styles.registerAccount}>
              <Text style={styles.textDetail}>
                Already have an account? click{" "}
              </Text>
              <Pressable>
                <Text style={styles.toLogin}>here</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
  },
  form: {
    flex: 1.2,
  },
  signUp: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 35,
    paddingRight: 35,
  },
  formInput: {
    flex: 5,
    paddingLeft: 35,
    paddingRight: 35,
  },
  fontInter: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 24,
  },
  formInputEmail: {
    flex: 4.5,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,

    paddingRight: 35,
  },
  emailIcon: {
    width: Dimensions.get("window").width * 0.05,
    height: Dimensions.get("window").height * 0.03,
  },
  formInputFullName: {
    flex: 4.5,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  accountIcon: {
    width: Dimensions.get("window").width * 0.045,
    height: Dimensions.get("window").height * 0.03,
  },
  formInputPassword: {
    flex: 4.5,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  formInputButton: {
    flex: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.5,
  },
  input: {
    height: Dimensions.get("window").height * 0.03,
    width: Dimensions.get("window").width * 0.7,
    marginLeft: 20,

    paddingRight: 10,
    borderBottomWidth: 2,
  },
  buttonTemp: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 25,
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

//exp://192.168.1.4:19000
