import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function CategoryCard  ({ img, title })  {
  return (
    <TouchableOpacity className='relative mr-2'>
        <Image
          source={{ uri: img }}
          className='h-20 w-20 bg-gray-300 p-4 rounded'
        />
      <Text className='absolute bottom-1 left-1'>{title}</Text>
    </TouchableOpacity>
  );
};

