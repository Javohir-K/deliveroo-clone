import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import Dishrow from "../components/Dishrow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={22} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-3 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color="green" opacity={0.5} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> · {genre}
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" size={22} opacity={0.4} />
                <Text className="text-xs text-gray-500">
                  Nearby · {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 pb-4 mt-2">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-3 border-y border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={22} />
            <Text className="pl-2 flex-1 font-bold">Have a food allergy?</Text>
            <ChevronRightIcon size={22} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="pb-24">
          <Text className="px-3 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {/* Dishrows */}
          {dishes.map((dish) => (
            <Dishrow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
