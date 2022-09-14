import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  setLoadingProfile,
} from "../store/actionCreator/profile";
import { userHistory } from "../store/actionCreator/user";
import LoadingScreen from "../components/LoadingScreen";

export default function ProfileScreen({ navigation }) {
  const [hashGalleryPermission, setHashGalleryPermission] =
    React.useState(null);
  const [image, setImage] = React.useState(null);
  const [inputProfile, setInputProfile] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    profilePicture: "",
  });

  const dispatch = useDispatch();

  const { loadingFetchProfile } = useSelector((state) => {
    return state.profileReducer;
  });

  useEffect(() => {
    dispatch(fetchProfile())
      .then((profile) => {
        setInputProfile({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
          profilePicture: profile.profilePicture,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoadingProfile(false));
      });

    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHashGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  function showToast() {
    ToastAndroid.show("Successfully edit your profile!", ToastAndroid.SHORT);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };

  if (hashGalleryPermission === false) {
    return <Text>No Access to internal Storage</Text>;
  }

  const submitProfile = () => {
    if (!image) {
      setImage("");
    }
    dispatch(setLoadingProfile(true));
    dispatch(
      updateProfile({
        ...inputProfile,
        profilePicture: image,
      })
    )
      .then(() => {
        showToast();
        dispatch(userHistory());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigation.navigate("SettingsApp");
      });
  };

  const onChange = (event) => {
    let key = Object.keys(event)[0];
    let value = Object.values(event)[0];
    setInputProfile({
      ...inputProfile,
      [key]: value,
    });
  };

  return (
    <>
      {loadingFetchProfile ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <View style={styles.containerHeader}>
          <Pressable
              onPress={() => pickImage()}
            >
              <View style={styles.frame}>
                {!image ? (
                  <Image
                    style={styles.profilePicture}
                    source={{ uri: inputProfile.profilePicture }}
                  />
                ) : (
                  <Image
                    style={styles.profilePicture}
                    source={{ uri: image.uri }}
                  />
                )}
              </View>
             <View 
              style={{
                borderColor:"rgba(255, 255, 255, 0.5)",
                borderWidth: 2,
                borderRadius: 30,
                paddingHorizontal: 10,
                alignItems: "center",
                marginVertical: 10,
                position: "absolute",
                right: 10,
                bottom:-12
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                +
              </Text>
              </View>
            </Pressable>
          </View>
          <View style={{ flex: 2.5, height: 100 }}>
            <ScrollView style={{ padding: 30 }}>
              <Text style={styles.textHeader}>First Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChange({ firstName: text })}
                value={inputProfile.firstName}
              />
              <Text style={styles.textHeader}>Last Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChange({ lastName: text })}
                value={inputProfile.lastName}
              />
              <Text style={styles.textHeader}>Phone</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChange({ phone: text })}
                value={inputProfile.phone}
              />
              <Pressable
                style={{ display: "flex", alignItems: "center" }}
                onPress={submitProfile}
              >
                <Text style={styles.button}>Edit</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#2F6FFF",
    borderBottomRightRadius: 50,
  },

  profilePicture: {
    width: 140,
    height: 140,
  },

  outlineFrame: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 70,
    elevation: 5,
  },
  frame: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 140,
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
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 40,
  },
});
