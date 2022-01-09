import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "./RootStack";

export const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      AppTabs: {
        screens: {
          Main: {
            screens: {
              MainScreen: "Main",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "Profile",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};
