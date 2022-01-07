import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList } from "./RootStack";
import { TabBarIcon } from "../components/TabBarIcon";

type AppTabsProps = {};

export type AppTabsParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type AppTabsNavProps<Screen extends keyof AppTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppTabsParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

const Tabs = createBottomTabNavigator<AppTabsParamList>();

export const AppTabs: FC<AppTabsProps> = ({}) => {
  const colorScheme = useColorScheme();

  return (
    <Tabs.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <Tabs.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          title: "Tab asd",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
};
