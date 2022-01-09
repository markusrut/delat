import { useContext } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { AppTabsNavProps } from "../navigation/AppTabs";
import { AuthContext } from "../providers/AuthProvider";

export default function MainScreen({}: AppTabsNavProps<"Main">) {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main</Text>
      <Text>Welcome {user?.username} </Text>
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
