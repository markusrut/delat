import React from "react";
import { ActivityIndicator, Text } from "react-native";

type LoadingProps = {};

export const Loading: React.FC<LoadingProps> = ({ children }) => {
  return (
    <>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </>
  );
};
