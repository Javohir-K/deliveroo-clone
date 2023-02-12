import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";

export default function Dishrow({ id, name, description, image, price }) {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white flex-row border px-3 py-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="text-gray-400 mt-2">
            <Currency quantity={price} currency="USD" />
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="w-20 h-20 bg-gray-300 p-4"
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-3">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon
                // color={items.length > 0 ? "#00CCBB" : "gray"}
                color="#00CCBB"
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
