import { View, Text, FlatList } from "react-native";
import React from "react";

interface PostType {
  id: string;
  title: string;
}

const Trending = ({ posts }: { posts: PostType[] }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text className="text-white text-3xl">{item.title}</Text>
        </View>
      )}
      horizontal
    />
  );
};

export default Trending;
