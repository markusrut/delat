import React, { useContext, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "../components/Themed";
import { AppTabsNavProps } from "../navigation/AppTabs";
import { AuthContext } from "../providers/AuthProvider";

export default function MainScreen({}: AppTabsNavProps<"Main">) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const callApi = async () => {
    const url = "http://192.168.1.74:4000/graphql";
    const query = `query Hello($name: String!) {
      hello(name: $name)
    }`;

    console.log("Calling api", url, query);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          query,
          variables: { name },
        }),
      });

      const data = await response.json();
      console.log("Response from API: ", data);
      setApiResponse(JSON.stringify(data));
    } catch (error) {
      console.log("Error when calling API: ", error);
    } finally {
      console.log("Request completed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Main</Text>
      <Text>Welcome {user?.username} </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(value) => setName(value)}
        placeholder="my placeholder text"
      ></TextInput>
      <Button title="Call API" onPress={callApi}></Button>
      {apiResponse ? <Text>{apiResponse}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    fontSize: 20,

    borderColor: "orange",
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "midnightblue",
    color: "white",
  },
});
