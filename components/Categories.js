import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then((data) => {
        setCategories(data);
      });
  });

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-3"
    >
      {categories.map((item) => (
        <CategoryCard key={item._id} img={urlFor(item.image).width(200).url()} title={item.name} />
      ))}
    </ScrollView>
  );
}
