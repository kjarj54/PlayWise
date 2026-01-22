import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { APP_COLORS } from "../constants/colors";
import { useTranslation } from "../hooks/use-translation";
import storageService from "../services/storageService";
import wishlistService from "../services/wishlistService";

export default function WishlistScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const authed = await storageService.isAuthenticated();
        if (!authed) {
          setItems([]);
          return;
        }
        const list = await wishlistService.list();
        if (mounted) setItems(Array.isArray(list) ? list : []);
      } catch {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

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
            {t("games.wishlist")}
          </Text>

          <View className="w-[28]" />
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center">
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : items.length === 0 ? (
            <Text className="text-white/50 text-[16px]">
              {t("games.wishlist")} vacía
            </Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => String(item.id)}
              contentContainerStyle={{ paddingVertical: 8 }}
              renderItem={({ item }) => {
                const cover = item.game_cover || item.game?.cover_image || null;
                const name =
                  item.game_name || item.game?.name || t("common.unknown");
                const genre = item.game_genre || item.game?.genre || "";

                return (
                  <View className="flex-row items-center px-4 py-3 border-b border-white/10">
                    {cover ? (
                      <Image
                        source={{ uri: cover }}
                        className="w-[60] h-[80] rounded-[4] mr-3"
                      />
                    ) : (
                      <View className="w-[60] h-[80] rounded-[4] mr-3 bg-white/20" />
                    )}

                    <View className="flex-1">
                      <Text
                        className="text-white text-[14px] font-semibold"
                        numberOfLines={1}
                      >
                        {name}
                      </Text>

                      {!!genre && (
                        <Text
                          className="text-white/50 text-[12px] mt-1"
                          numberOfLines={1}
                        >
                          {genre}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
