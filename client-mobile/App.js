import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View, Image, TextInput, Button } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const onChange = () => {
    console.log("ok")
  }
  const Press = () => {

  }
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
          <Image style={{ width: Dimensions.get('window').width * 0.7, height: Dimensions.get('window').height * 0.5 }} source={require('./assets/moody_pertama.png')} />
        </View>
        <View style={{ flex: 1, paddingStart: 30, paddingEnd: 30 }}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "left" }}>Sign In</Text>
          </View>
          <View style={{ flex: 0.3, flexDirection:"row", marginTop:5, alignItems:"center" }}>
            <Image style={{ width: 20, height: 20, marginRight:20}} source={require('./assets/ad.png')} />
            <TextInput style={styles.input} onChangeText={onChange} value={''} />
          </View>
          <View style={{ flex: 0.3, flexDirection:"row", marginTop:5, alignItems:"center"}}>
            <Image style={{ width: 20, height: 20, marginRight:20}} source={require('./assets/password.png')} />
            <TextInput style={styles.input} onChangeText={onChange} value={''} />
          </View>
          <Text style={{ backgroundColor: '#2F6FFF', paddingTop: 5, paddingBottom: 5, color: "white", textAlign: 'center', borderRadius: 25 }}>Submit</Text>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', marginTop: 20 }}>
            <Text>Don't have account ? </Text>
            <Text style={{ color: '#2F6FFF' }}>Create an Account</Text>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30
  },
  input: { 
    borderBottomWidth:1, 
    padding: 5, 
    marginBottom:15, 
    width:Dimensions.get('window').width * 0.63 
  }
});
