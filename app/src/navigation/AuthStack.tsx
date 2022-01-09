import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FC } from "react";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

type AuthStackProps = {};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthStackNavProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack: FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
