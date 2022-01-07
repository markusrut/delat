import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { FC } from "react";
import { ColorSchemeName } from "react-native";
import { LinkingConfiguration } from "./LinkingConfiguration";
import { RootStack, RootStackParamList } from "./RootStack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type NavigationProps = { colorScheme: ColorSchemeName };

const Navigation: FC<NavigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;
