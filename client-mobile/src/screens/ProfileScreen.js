import { Text, View, Image, Dimensions, StyleSheet, TextInput } from "react-native"
import React from "react";
export default function ProfileScreen() {
    const [fullName, onChangeFullName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [profilePicture, onChangeProfilePicture] = React.useState("");
    return (
        <>
            <View style={styles.containerHeader}>
                <View style={styles.frame}>
                    <Image style={styles.profilePicture} source={require('../../assets/icons/account.png')} />
                </View>
            </View>
            <View style={{ flex: 2.5 }}>
                <Text style={styles.textHeader}>Full Name</Text>
                <TextInput style={styles.input} onChangeText={onChangeFullName} value={fullName} />
                <Text style={styles.textHeader}>Email</Text>
                <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} />
                <Text style={styles.textHeader}>Password</Text>
                <TextInput style={styles.input} onChangeText={onChangePassword} value={password} secureTextEntry={true} />
                <Text style={styles.textHeader}>Profile Picture</Text>
                <TextInput style={styles.input} onChangeText={onChangeProfilePicture} value={profilePicture} />
                <View style={{ display: "flex", alignItems: "center" }}>
                    <Text style={styles.button}>Edit</Text>
                </View>
            </View>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 30
    },
    containerHeader: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    profilePicture: {
        width: Dimensions.get('window').width * 0.22,
        height: Dimensions.get('window').height * 0.16
    },
    frame: {
        backgroundColor: 'white',
        padding: 10,
        width: 120,
        height: 120,
        borderRadius: 70,
        overflow: "hidden"
    },
    textHeader: {
        fontWeight: "700",
        fontSize: 23,
        color: '#242525'
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
    }
})