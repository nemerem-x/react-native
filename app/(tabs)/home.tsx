import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  ListRenderItem,
  RefreshControl,
  Alert
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import { useState, useEffect } from "react";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts } from "@/lib/appwrite";

interface DataType {
  id: string;
  title: string;
}

export default function HomeScreen() {

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<{}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllPosts();
        setData(res);
      } catch (error: any) {
        Alert.alert("Error", error.message)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])
  

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  }

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];

  const [input, setInput] = useState("");

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList<DataType>
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text className="text-white">{item.title}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-bold text-gray-100">
                  Nemerem
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  className="w-9 h-10"
                  source={images.logoSmall}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput
              title="search"
              value={input}
              handleChangeText={(e: any) => setInput(e)}
              otherStyles="mt-7"
            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg mb-3 font-regular">
                Latest Videos
              </Text>
              <Trending posts={DATA}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}
