import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { createUser } from '@/lib/appwrite';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { images } from "@/constants";
import { useGlobalContext } from '@/context/GlobalProvider';


interface Form {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState<Form>({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();
    
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields")
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.username, form.email, form.password);
      console.log(result)
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home")
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }

  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="px-4 my-6 w-full justify-center min-h-[85vh]">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-semibold">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-base text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-base font-semibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp