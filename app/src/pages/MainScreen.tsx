import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/Themed";
import { useCurrentAccountQuery, useListAccountsQuery } from "../graphql";
import { AppTabsNavProps } from "../navigation/AppTabs";

export default function MainScreen({}: AppTabsNavProps<"Main">) {
  const { loading, error, data } = useListAccountsQuery();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :{error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <CurrentAccount />
      {data?.accounts.map((account) => (
        <Text key={account.email}>
          {account.name} {account.email}
        </Text>
      ))}
    </SafeAreaView>
  );
}

export const CurrentAccount: FC = () => {
  const { loading, error, data } = useCurrentAccountQuery();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :{JSON.stringify(error)}</Text>;
  return (
    <Text style={styles.title}>Welcome {data?.me.name || data?.me.email} </Text>
  );
};

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
