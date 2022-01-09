import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { RootStackParamList } from "./RootStack";
import { TabBarIcon } from "../components/TabBarIcon";

type AppTabsProps = {};

export type AppTabsParamList = {
  Main: undefined;
  Profile: undefined;
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
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <Tabs.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: "Main",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
};
