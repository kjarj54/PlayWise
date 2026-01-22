import React from "react";
import { View } from "react-native";

export default function SectionSkeleton() {
  return (
    <View className="flex-row justify-between px-3 mb-3">
      <View className="w-[32%] h-[120] rounded-lg bg-[#2a2a2a]" />
      <View className="w-[32%] h-[120] rounded-lg bg-[#2a2a2a]" />
      <View className="w-[32%] h-[120] rounded-lg bg-[#2a2a2a]" />
    </View>
  );
}
