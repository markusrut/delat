import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps, FC } from "react";

type TabBarIconProps = {
  name: ComponentProps<typeof FontAwesome>["name"];
  color: string;
};
export const TabBarIcon: FC<TabBarIconProps> = (props) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};
