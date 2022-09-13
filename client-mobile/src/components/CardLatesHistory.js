import { View, StyleSheet, Image, Text } from 'react-native'
export default function () {
    return (
        <>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.framePictureHistory}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/pp.jpg')} />
                    </View>
                    <View>
                        <Text style={styles.textHeader}>Nama Wallet</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 13, color: "#808080" }}>Sabtu, 11 Septeber 2022</Text>
                    </View>
                </View>
                <Text style={{backgroundColor:"#ccf0bb", color:"#7eb764", padding:5, borderRadius:5, fontSize:12, fontWeight:"bold"}}>Category</Text>
                <Text style={styles.plusNumber}>Rp. 20.000,00</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    framePictureHistory: {
        width: 50,
        height: 50,
        backgroundColor: "#ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 70,
        overflow: "hidden",
        marginTop: 10,
        marginRight: 20
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#242525"
    },
    minusNumber: {
        color: "#cc5656",
        fontWeight: "bold",
        fontSize: 12
    },
    plusNumber: {
        color: "#7eb764",
        fontWeight: "bold",
        fontSize: 12
    },
})