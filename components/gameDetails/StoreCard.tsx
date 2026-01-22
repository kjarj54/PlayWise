import React from "react";
import { Image, Text, View } from "react-native";

interface StoreCardProps {
  storeLogo: { uri: string } | number;
  storeName: string;
  price: string;
  originalPrice?: string;
  discount?: string;
}

export default function StoreCard({
  storeLogo,
  storeName,
  price,
  originalPrice,
  discount,
}: StoreCardProps) {
  const hasDiscount = discount && parseFloat(discount) > 0;

  return (
    <View className="w-[30%] mb-[6] mr-[6]">
      {/* Logo */}
      <View className="h-[55] bg-[#013a60] rounded-t-[4] items-center justify-center overflow-hidden">
        <Image
          source={storeLogo}
          className="w-[80%] h-[80%]"
          resizeMode="contain"
        />
      </View>

      {/* Price */}
      <View className="h-[20] bg-[#013a60] rounded-b-[4] items-center justify-center">
        <Text className="text-white text-[12px] font-extrabold">
          ${price} {hasDiscount && `${Math.round(parseFloat(discount))}% OFF`}
        </Text>
      </View>
    </View>
  );
}
