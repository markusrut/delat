import React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  Button as DefaultButton,
  StyleProp,
  TextStyle,
  Pressable,
  PressableProps,
  ViewStyle,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export type HeaderProps = ThemeProps & DefaultText["props"];
export function Header(props: HeaderProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const defaultStyle: StyleProp<TextStyle> = {
    color: useThemeColor({ light: lightColor, dark: darkColor }, "headerText"),
    fontSize: 40,
    fontWeight: "bold",
    fontVariant: ["small-caps"],
  };

  return <DefaultText style={[defaultStyle, style]} {...otherProps} />;
}

export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const defaultStyle: StyleProp<TextStyle> = {
    color: useThemeColor({ light: lightColor, dark: darkColor }, "inputText"),
    backgroundColor: useThemeColor(
      { light: lightColor, dark: darkColor },
      "inputBackground"
    ),
    padding: 16,
    margin: 8,
    borderRadius: 4,
    fontSize: 16,
  };

  return <DefaultTextInput style={[defaultStyle, style]} {...otherProps} />;
}

export type ViewProps = ThemeProps & DefaultView["props"];
export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type ButtonProps = ThemeProps & DefaultButton["props"];
export function Button(props: ButtonProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "buttonText"
  );

  return <DefaultButton color={color} {...otherProps} />;
}

export type CustomButtonProps = ThemeProps & PressableProps;
export function CustomButton(props: CustomButtonProps) {
  const { lightColor, darkColor, ...otherProps } = props;

  const pressableStyle: StyleProp<ViewStyle> = {
    backgroundColor: useThemeColor(
      { light: lightColor, dark: darkColor },
      "buttonBackground"
    ),
    padding: 14,
    margin: 8,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  };
  const textStyle: StyleProp<TextStyle> = {
    color: useThemeColor({ light: lightColor, dark: darkColor }, "buttonColor"),
    fontSize: 18,
  };

  return (
    <Pressable style={pressableStyle} {...otherProps}>
      <Text style={textStyle}>{props.children}</Text>
    </Pressable>
  );
}

export type SpacerProps = {
  height?: number;
  width?: number;
};
export function Spacer(props: SpacerProps) {
  return <DefaultView style={{ height: props.height, width: props.width }} />;
}
