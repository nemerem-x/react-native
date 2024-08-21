import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GestureResponderEvent } from "react-native";

interface Button {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyle: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}: Button) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? "opacity-50" : ''}`}
    >
      <Text className={`text-primary font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
