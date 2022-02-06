import { NavigatorScreenParams } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FC } from "react";
import ModalScreen from "../pages/ModalScreen";
import { NotFoundScreen } from "../pages/NotFoundScreen";
import { AppTabs, AppTabsParamList } from "./AppTabs";

export type RootStackParamList = {
  AppTabs: NavigatorScreenParams<AppTabsParamList> | undefined;
  Modal: undefined;
  NewModal: undefined;
  NotFound: undefined;
};

export type RootStackNavProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

const Root = createNativeStackNavigator<RootStackParamList>();

type RootStackProps = {};

export const RootStack: FC<RootStackProps> = ({}) => {
  return (
    <Root.Navigator>
      <Root.Screen
        name="AppTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Root.Group screenOptions={{ presentation: "modal" }}>
        <Root.Screen name="Modal" component={ModalScreen} />
      </Root.Group>
    </Root.Navigator>
  );
};
