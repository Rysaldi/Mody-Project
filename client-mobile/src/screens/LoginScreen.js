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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import {
  loadingUserLoginDispatch,
  userLogin,
  setAccessToken,
  userLoginDispatch,
} from "../store/actionCreator/user";

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loadingUserLogin } = useSelector((state) => state.userReducer);

  const [formAdd, setFormAdd] = React.useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const keys = Object.keys(e)[0];
    const values = Object.values(e)[0];

    setFormAdd({
      ...formAdd,
      [keys]: values,
    });
  };

  const errorAlert = (msg) => {
    return Alert.alert("", `${msg}`, [{ text: "OK" }]);
  };

  const onSubmit = () => {
    dispatch(userLogin(formAdd))
      .then((response) => {
        setAccessToken(response.access_token);
        dispatch(userLoginDispatch(true));
      })
      .catch((error) => {
        errorAlert(error.message);
      })
      .finally(() => {
        dispatch(loadingUserLoginDispatch(false));
      });
  };

  return (
    <>
      {loadingUserLogin ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <ImageBackground
            source={require("../../assets/bg.jpg")}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.containerContent}>
              <View>
                <Text style={styles.textHeader}>Sign In</Text>
              </View>
              <View style={styles.containerInput}>
                <Image
                  style={styles.imgIcon}
                  source={require("../../assets/icons/ad.png")}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    onChange({
                      email: text,
                    })
                  }
                  value={formAdd.email}
                  placeholder="Email"
                />
              </View>
              <View style={styles.containerInput}>
                <Image
                  style={styles.imgIcon}
                  source={require("../../assets/icons/password.png")}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) =>
                    onChange({
                      password: text,
                    })
                  }
                  value={formAdd.password}
                  secureTextEntry={true}
                  placeholder="Password"
                />
              </View>
              <Pressable onPress={onSubmit}>
                <Text style={styles.button}>Submit</Text>
              </Pressable>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text style={styles.detailText}>Don't have account ? </Text>
                <Text
                  style={{ color: "#2F6FFF" }}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Create an Account
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    height: Dimensions.get("screen").height * 0.4,
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 15,
    paddingTop: 25,
    borderRadius: 10,
    elevation: 7,
  },
  input: {
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 15,
    width: Dimensions.get("window").width * 0.63,
    color: "#242525",
    fontSize: 17,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
    color: "#424242",
  },
  containerInput: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  imgIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: "#2F6FFF",
    paddingTop: 5,
    paddingBottom: 5,
    color: "white",
    textAlign: "center",
    borderRadius: 25,
    marginTop: 20,
    fontSize: 18,
  },
  detailText: {
    color: "#424242",
  },
});
