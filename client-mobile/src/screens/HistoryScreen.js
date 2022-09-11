import { Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        <Text style={styles.walletName}>Wallet 1 History</Text>
        <View style={styles.histories}>
          <View style={styles.transactionDetail}>
            <Text style={styles.transactionName}>Bubur</Text>
            <Text style={styles.transactionDate}>At 18 November 2022</Text>
          </View>
          <View style={styles.transactionPrice}>
            <Text style={styles.transactionAmount}>Rp. 12.000,00</Text>
          </View>
        </View>
        <View style={styles.histories}>
          <View style={styles.transactionDetail}>
            <Text style={styles.transactionName}>Bubur</Text>
            <Text style={styles.transactionDate}>At 18 November 2022</Text>
          </View>
          <View style={styles.transactionPrice}>
            <Text style={styles.transactionAmount}>Rp. 12.000,00</Text>
          </View>
        </View>
        <View style={styles.histories}>
          <View style={styles.transactionDetail}>
            <Text style={styles.transactionName}>Bubur</Text>
            <Text style={styles.transactionDate}>At 18 November 2022</Text>
          </View>
          <View style={styles.transactionPrice}>
            <Text style={styles.transactionAmount}>Rp. 12.000,00</Text>
          </View>
        </View>
        <View style={styles.histories}>
          <View style={styles.transactionDetail}>
            <Text style={styles.transactionName}>Bubur</Text>
            <Text style={styles.transactionDate}>At 18 November 2022</Text>
          </View>
          <View style={styles.transactionPrice}>
            <Text style={styles.transactionAmount}>Rp. 12.000,00</Text>
          </View>
        </View>
        <View style={styles.histories}>
          <View style={styles.transactionDetail}>
            <Text style={styles.transactionName}>Bubur</Text>
            <Text style={styles.transactionDate}>At 18 November 2022</Text>
          </View>
          <View style={styles.transactionPrice}>
            <Text style={styles.transactionAmount}>Rp. 12.000,00</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  historyContainer: {
    padding: 25,
  },
  walletName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  histories: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  transactionName: {
    fontSize: 18,
  },
  transactionDate: {
    color: "#d9d9d9",
  },
  transactionPrice: {
    alignItems: "center",
    justifyContent: "center",
  },
  transactionAmount: {
    color: "#32C92F",
  },
});
