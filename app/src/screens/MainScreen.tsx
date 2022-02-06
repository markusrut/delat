import { gql, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "../components/Themed";
import { useListAccountsQuery } from "../graphql";
import { AppTabsNavProps } from "../navigation/AppTabs";
import { AuthContext } from "../providers/AuthProvider";

export default function MainScreen({}: AppTabsNavProps<"Main">) {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useListAccountsQuery();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Main</Text>
      <Text>Welcome {user?.name} </Text>
      {data?.accounts.map((account) => (
        <Text key={account.email}>
          {account.name} {account.email}
        </Text>
      ))}
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
