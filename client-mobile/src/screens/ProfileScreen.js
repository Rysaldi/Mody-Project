import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateProfile } from "../store/actionCreator/profile";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profileReducer);
  //   const [fullName, onChangeFullName] = React.useState("");
  //   const [email, onChangeEmail] = React.useState("");
  //   const [password, onChangePassword] = React.useState("");
  //   const [profilePicture, onChangeProfilePicture] = React.useState("");
  const [inputProfile, setInputProfile] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    profilePicture: "",
  });

  const onChange = (event) => {
    let key = Object.keys(event)[0];
    let value = Object.values(event)[0];
    setInputProfile({
      ...inputProfile,
      [key]: value,
    });
  };

  const submitProfile = () => {
    dispatch(updateProfile(inputProfile));
  };

  useEffect(() => {
    // fetch profile
    dispatch(fetchProfile()).then(() => {
      // set state inputProfile
      setInputProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        profilePicture: profile.profilePicture,
      });
    });
  }, []);
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.containerHeader}>
            <View style={styles.outlineFrame}>
              <View style={styles.frame}>
                <Image
                  style={styles.profilePicture}
                  source={require("../../assets/pp.jpg")}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 2.5 }}>
            <Text style={styles.textHeader}>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChange({ firstName: text })}
              // onChangeText={onChangeFullName}
              value={inputProfile.firstName}
            />
            <Text style={styles.textHeader}>Last Name</Text>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeEmail}
              // value={email}
              onChangeText={(text) => onChange({ lastName: text })}
              value={inputProfile.lastName}
            />
            {/* <Text style={styles.textHeader}>Password</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangePassword}
            // value={password}
            secureTextEntry={true}
          /> */}
            <Text style={styles.textHeader}>Phone</Text>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeProfilePicture}
              // value={profilePicture}
              onChangeText={(text) => onChange({ phone: text })}
              value={inputProfile.phone}
            />
            <Text style={styles.textHeader}>Profile Picture</Text>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeProfilePicture}
              // value={profilePicture}
            />
            <Pressable
              style={{ display: "flex", alignItems: "center" }}
              onPress={submitProfile}
            >
              <Text style={styles.button}>Edit</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
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
    fontSize: 23,
    color: "#242525",
  },
  input: {
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 10,
    paddingTop: 10,
    color: "#242525",
    borderWidth: 2,
    borderRadius: 7,
    borderColor: "#ddd",
    marginTop: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2F6FFF",
    padding: 12,
    width: Dimensions.get("window").width * 0.8,
    color: "white",
    textAlign: "center",
    borderRadius: 25,
    marginTop: 10,
  },
});
