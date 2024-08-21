import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import "react-native-url-polyfill/auto";
import { useGlobalContext } from "@/context/GlobalProvider";

const App = () => {

  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="px-4 w-full min-h-[85vh] items-center justify-center">
          <Image
            source={images.logo}
            className="w-[90px], h-[44px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with {""}
              <Text className=" text-secondary-200">Aora</Text>
            </Text>
            <Image
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              source={images.path}
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 text-sm text-center mt-7 font-pregular">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            // isLoading={false}
            handlePress={() => router.push("/sign-in")}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default App;
