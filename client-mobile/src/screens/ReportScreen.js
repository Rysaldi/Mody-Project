import { StyleSheet, View } from "react-native";
import Pie from "react-native-pie";
import { fetchDetail } from "../store/actionCreator/wallets";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
export default function ReportScreen({route}) {
  const {id} = route.params
  const dispatch = useDispatch();
  const { detailWallet } = useSelector((state) => {
    // console.log(state);
    return state.walletReducer;
  });
  React.useEffect(() => {
    dispatch(fetchDetail(id));
  }, []);
  // console.log(detailWallet);


  // return (
  //   <View style={styles.container}>
  //     <View
  //       style={{
  //         paddingVertical: 15,
  //         flexDirection: "row",
  //         width: 350,
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <Pie
  //         radius={80}
  //         innerRadius={60}
  //         sections={[
  //           {
  //             percentage: 10,
  //             color: "#C70039",
  //           },
  //           {
  //             percentage: 20,
  //             color: "#44CD40",
  //           },
  //           {
  //             percentage: 30,
  //             color: "#404FCD",
  //           },
  //           {
  //             percentage: 40,
  //             color: "#EBD22F",
  //           },
  //         ]}
  //         dividerSize={4}
  //         strokeCap={"round"}
  //       />
  //       <Pie
  //         radius={80}
  //         innerRadius={60}
  //         sections={[
  //           {
  //             percentage: 10,
  //             color: "#C70039",
  //           },
  //           {
  //             percentage: 20,
  //             color: "#44CD40",
  //           },
  //           {
  //             percentage: 30,
  //             color: "#404FCD",
  //           },
  //           {
  //             percentage: 40,
  //             color: "#EBD22F",
  //           },
  //         ]}
  //         dividerSize={6}
  //         strokeCap={"butt"}
  //       />
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 1050,
  },
});
