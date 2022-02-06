import React, { useContext } from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { AuthContext } from "../providers/AuthProvider";

export default function ProfileScreen() {
  const { setLoggedOut: logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button title="logout" onPress={() => logout()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
