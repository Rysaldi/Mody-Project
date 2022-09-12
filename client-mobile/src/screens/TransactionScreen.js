import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actionCreator/categories";
export default function TransactionScreen({ route }) {
  dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);
  const [formAddTransaction, setFormAddTransaction] = React.useState({
    name: "",
    amount: "",
    category: "",
  });
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = React.useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const onChange = (event, value) => {
    setDate(value);

    // on cancel set date value to previous date
    if (event?.type === "dismissed") {
      setIsPickerShow(false);
      return;
    } else if (event?.type === "set") {
      setIsPickerShow(false);
      return;
    }
  };
  useEffect(() => {
    dispatch(fetchCategories());
    console.log(categories);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.formAddTransaction}>
        <View style={styles.formInput}>
          <Text style={styles.inputName}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFormAddTransaction}
            value={formAddTransaction.name}
            placeholder="Transaction Name"
          />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.inputName}>Amount</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFormAddTransaction}
            value={formAddTransaction.amount}
            placeholder="Transaction Amount"
          />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.inputName}>Date</Text>
          <Text onPress={showPicker}>{date.toUTCString()}</Text>
          <>
            {isPickerShow && (
              <DateTimePicker
                value={date}
                is24Hour={true}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </>
        </View>
        <View style={styles.formInput}>
          <Text style={styles.inputName}>Category</Text>
          {/* <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          /> */}
          <TextInput
            style={styles.input}
            onChangeText={setFormAddTransaction}
            value={formAddTransaction.category}
            placeholder="Transaction Name"
          />
        </View>
        <View style={styles.buttonToAdd}>
          <Pressable style={styles.buttonCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.buttonAdd}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formAddTransaction: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  inputName: {
    fontWeight: "bold",
  },
  input: {
    height: Dimensions.get("window").height * 0.05,

    borderBottomWidth: 2,
    borderColor: "#d9d9d9",
  },
  formInput: {
    marginTop: 15,
  },
  buttonToAdd: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonCancel: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    height: Dimensions.get("window").height * 0.045,
    width: Dimensions.get("window").width * 0.3,
    borderRadius: 20,
    backgroundColor: "#000",
    marginTop: 25,
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    height: Dimensions.get("window").height * 0.045,
    width: Dimensions.get("window").width * 0.3,
    borderRadius: 20,
    backgroundColor: "#2F6FFF",
    marginTop: 25,
  },
  buttonText: {
    color: "white",
  },
});
