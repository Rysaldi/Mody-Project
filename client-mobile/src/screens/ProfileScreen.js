
{*import {
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
  }; *}

*{ import { Text, View, Image, Dimensions, StyleSheet, TextInput, Button, ScrollView, Pressable } from "react-native"
import React, { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker'
export default function ProfileScreen() {
    const [hashGalleryPermission, setHashGalleryPermission] = React.useState(null);
    const [image, setImage] = React.useState(null);
    const [fullName, onChangeFullName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHashGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    if (hashGalleryPermission === false) {
        return <Text>No Access to internal Storage</Text>
    }

    const cancel = () => {
        setImage(null)
    }

    const displayImage = () => {
        return (
            <>
                <View style={{ width: 150, height: 150, marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                    <Pressable style={{ position: "absolute", top: -10, left: 135, zIndex: 99, backgroundColor: "#ffecec", paddingHorizontal: 7, borderRadius: 20, }} onPress={() => cancel()}>
                        <Text style={{ fontSize: 20, color: '#c80000', fontWeight: "bold" }}>X</Text>
                    </Pressable>
                    <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 10 }} />
                </View>
            </>
        )
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.outlineFrame}>
                        <View style={styles.frame}>
                            <Image style={styles.profilePicture} source={require('../../assets/pp.jpg')} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 2.5, height: 100 }}>
                    <ScrollView style={{ padding: 30 }}>
                        <Text style={styles.textHeader}>Full Name</Text>
                        <TextInput style={styles.input} onChangeText={onChangeFullName} value={fullName} />
                        <Text style={styles.textHeader}>Email</Text>
                        <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} />
                        <Text style={styles.textHeader}>Password</Text>
                        <TextInput style={styles.input} onChangeText={onChangePassword} value={password} secureTextEntry={true} />
                        <Text style={styles.textHeader}>Profile Picture</Text>
                        <Pressable onPress={() => pickImage()} style={{borderColor:"#ddd", borderWidth:2, borderRadius:7, padding:5, alignItems:"center", marginVertical:10}}>
                            <Text style={{ fontSize: 25, fontWeight:"bold", color:"#ddd", borderColor:"#ddd"}}>+</Text>
                        </Pressable>
                        {image && displayImage()}
                        < View style={{ display: "flex", alignItems: "center" }}>
                            <Text style={styles.button}>Edit</Text>
                        </View>
                    </ScrollView>
                </View>
            </View >*}


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
    },
    containerHeader: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        padding: 30
    },
    profilePicture: {
        width: 120,
        height: 120,

    },
    outlineFrame: {
        backgroundColor: '#d9d9d9',
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 130,
        height: 130,
        borderRadius: 70,
        elevation: 5,
    },
    frame: {
        backgroundColor: 'white',
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
        color: '#242525',
    },
    input: {
        paddingLeft: 17,
        paddingRight: 17,
        paddingBottom: 10,
        paddingTop: 10,
        color: "#242525",
        borderWidth: 2,
        borderRadius: 7,
        borderColor: '#ddd',
        marginTop: 8,
        marginBottom: 15
    },
    button: {
        backgroundColor: '#2F6FFF',
        padding: 12,
        width: Dimensions.get('window').width * 0.8,
        color: "white",
        textAlign: 'center',
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 40
    }
})
