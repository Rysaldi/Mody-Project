import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { userLogout } from "../store/actionCreator/user";
import { useDispatch } from "react-redux";

export default function LogoutScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onTapLogout = () => {
    dispatch(userLogout()).finally(() => dispatch(loadingUserLogout(false)));
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.outlineFrame}>
            <View style={styles.frame}>
              <Image
                style={styles.profilePicture}
                source={require("../../assets/pp.jpg")}
              />
            </View>
          </View>
          <Text style={styles.textHeader}>Rohmat HT</Text>
          <Text style={styles.textEmail}>rohmathidayattullah@gmail.com</Text>
          <View style={{ display: "flex", alignItems: "center" }}>
            <View style={styles.button}>
              <Text
                style={styles.textBotton}
                onPress={() => navigation.navigate("ProfileApp")}
              >
                Edit Profile
              </Text>
              <Image
                style={{ width: 12, height: 12 }}
                source={require("../../assets/icons/arrowRightWhite.png")}
              />
            </View>
          </View>
        </View>
        <View style={{ flex: 2, marginTop: 30 }}>
          <Text
            style={{
              backgroundColor: "#ddd",
              padding: 10,
              fontSize: 18,
              fontWeight: "bold",
              color: "#242525",
            }}
          >
            Preferences
          </Text>
          <Pressable onPress={onTapLogout}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 30, height: 30, marginRight: 10 }}
                  source={require("../../assets/icons/logout.png")}
                />
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Logout</Text>
              </View>
              <Image
                style={{ width: 12, height: 12 }}
                source={require("../../assets/icons/arrowRight.png")}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: 120,
    height: 120,
  },
  outlineFrame: {
    backgroundColor: "#d9d9d9",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 70,
    elevation: 5,
  },
  frame: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 70,
    overflow: "hidden",
  },
  textHeader: {
    fontWeight: "700",
    fontSize: 25,
    color: "#242525",
  },
  textEmail: {
    fontWeight: "700",
    fontSize: 18,
    color: "#808080",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2F6FFF",
    paddingHorizontal: 15,
    paddingVertical: 7,
    width: Dimensions.get("window").width * 0.4,
    textAlign: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  textBotton: {
    fontSize: 15,
    color: "white",
  },
});
