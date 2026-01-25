import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface GameCardProps {
  id: string;
  image: string;
  title: string;
  genre: string;
  rating?: number;
  onPress?: () => void;
  onToggleWishlist?: () => void; // Si no se pasa, el corazón es solo visual
  isInWishlist?: boolean; // Solo visual
}

export default function GameCard({
  id,
  image,
  title,
  genre,
  rating,
  onPress,
  onToggleWishlist,
  isInWishlist = false,
}: GameCardProps) {
  const [wishlisted, setWishlisted] = useState(isInWishlist);

  // Sync con el padre
  useEffect(() => {
    setWishlisted(isInWishlist);
  }, [isInWishlist]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push({
        pathname: "/(tabs)/explore",
        params: {
          id,
          title,
          image,
          genre,
          rating: rating?.toString() || "0",
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className="w-[120] h-[150] rounded-[8] overflow-hidden mr-[10]"
    >
      <Image
        source={{ uri: image }}
        className="w-full h-full"
        resizeMode="cover"
      />

      {/* Heart: interactivo solo si se pasa onToggleWishlist */}
      {onToggleWishlist ? (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onToggleWishlist}
          className="absolute top-[6] right-[6] w-[26] h-[26] rounded-full bg-black/45 items-center justify-center z-10"
        >
          <Heart
            size={16}
            color={wishlisted ? "#FF4D6D" : "#FFFFFF"}
            fill={wishlisted ? "#FF4D6D" : "none"}
          />
        </TouchableOpacity>
      ) : (
        <View className="absolute top-[6] right-[6] w-[26] h-[26] rounded-full bg-black/45 items-center justify-center z-10">
          <Heart
            size={16}
            color={wishlisted ? "#FF4D6D" : "#FFFFFF"}
            fill={wishlisted ? "#FF4D6D" : "none"}
          />
        </View>
      )}

      {/* Gradient overlay */}
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        className="absolute bottom-0 left-0 right-0 h-[60%] justify-end"
      >
        <View className="p-2">
          <Text
            className="text-white text-[10px] font-semibold mb-[2]"
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text className="text-white text-[10px] font-semibold opacity-80">
            {genre}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
