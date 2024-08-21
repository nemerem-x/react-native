// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { Image, Text, View } from 'react-native';
import { icons } from '../../constants';

export function TabBarIcon({ icon, color, name, focused }: any) {
  // return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
  return (
    <View className=' items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-semibold' : 'font-regular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}
