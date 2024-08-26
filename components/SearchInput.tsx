import { View, Text, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface formField {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (e: any) => void;
  otherStyles?: string;
  keyboardType?: string;
  initialQuery?: any;
}

const SearchInput = ({
  initialQuery
}: formField) => {

  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="w-full h-16 px-4 space-x-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
      <TextInput
        className="flex-1 text-white font-semibold text-base"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="CDCDE0"
        onChangeText={(e) => setQuery(e)}
        // secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity
        onPress={() => {
          if(!query) {
            return Alert.alert("Missing query", "Please input something to search results.")
          }
          if(pathname.startsWith("/search")) {
            router.setParams({ query })
          } else {
            router.push(`/search/${query}`)
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
