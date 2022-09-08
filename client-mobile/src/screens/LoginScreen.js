import React from "react";
import { Dimensions, StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
export default function LoginScreen() {
    const [user, onChangeUser] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    return (
        <>
            <View style={styles.containerImage}>
                <Image style={styles.imgHeader} source={require('../../assets/moody_pertama.png')} />
            </View>
            <View style={styles.containerContent}>
                <View style={{ flex: 0.3 }}>
                    <Text style={styles.textHeader}>Sign In</Text>
                </View>
                <View style={styles.containerInput}>
                    <Image style={styles.imgIcon} source={require('../../assets/ad.png')} />
                    <TextInput style={styles.input} onChangeText={onChangeUser} value={user} placeholder="Email" />
                </View>
                <View style={styles.containerInput}>
                    <Image style={styles.imgIcon} source={require('../../assets/password.png')} />
                    <TextInput style={styles.input} onChangeText={onChangePassword} value={password} secureTextEntry={true} placeholder="Password" />
                </View>
                <Text style={styles.button}>Submit</Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', marginTop: 20 }}>
                    <Text>Don't have account ? </Text>
                    <Text style={{ color: '#2F6FFF' }}>Create an Account</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containerImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    imgHeader: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5
    },
    input: {
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 15,
        width: Dimensions.get('window').width * 0.63
    },
    containerContent: {
        flex: 1,
        paddingStart: 30,
        paddingEnd: 30
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "left"
    },
    containerInput: {
        flex: 0.3,
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center"
    },
    imgIcon: {
        width: 20,
        height: 20,
        marginRight: 20
    },
    button: {
        backgroundColor: '#2F6FFF',
        paddingTop: 5,
        paddingBottom: 5,
        color: "white",
        textAlign: 'center',
        borderRadius: 25,
        marginTop: 20
    }
}
)