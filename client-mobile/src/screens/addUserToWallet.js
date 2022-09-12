import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ImageBackground,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function addUserToWallet(route) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.formAdd}>
          <Text style={styles.headerText}>Add User Wallet</Text>
          <Text style={styles.textAdd}>Add New User</Text>
          <View style={styles.formAddWallet}>
            <Text style={styles.textAdd}>Name</Text>
            <TextInput
              value={walletName}
              onChangeText={setWalletName}
              style={styles.input}
            />
          </View>
          <View style={styles.buttonToAdd}>
            <Pressable style={styles.buttonAdd}>
              <Text style={styles.buttonText} onPress={submitAddWallet}>
                Add Wallet
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
