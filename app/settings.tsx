import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { APP_COLORS } from "../constants/colors";
import { useTranslation } from "../hooks/use-translation";

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={[APP_COLORS.gradientTop, APP_COLORS.gradientBottom]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/10">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <Text className="text-white text-[20px] font-semibold">
            {t("settings.title")}
          </Text>

          {/* Spacer para centrar el título */}
          <View className="w-[28]" />
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-white/50 text-[16px]">
            {t("settings.title")} - Coming Soon
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
