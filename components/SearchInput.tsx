import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface formField {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles: string;
  keyboardType?: string;
}

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: formField) => {
  // const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-16 px-4 space-x-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput
        className="flex-1 text-white font-semibold text-base"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="7b7b8b"
        onChangeText={handleChangeText}
        // secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
