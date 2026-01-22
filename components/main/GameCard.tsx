import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameCardProps {
  id: string;
  image: string;
  title: string;
  genre: string;
  rating?: number;
  onPress?: () => void;
  isInWishlist?: boolean; // Solo para mostrar el estado visual del corazón
}

export default function GameCard({
  id,
  image,
  title,
  genre,
  rating,
  onPress,
  isInWishlist = false,
}: GameCardProps) {
  const [wishlisted, setWishlisted] = useState(isInWishlist);

  // Actualizar estado cuando cambia isInWishlist (desde el padre)
  React.useEffect(() => {
    setWishlisted(isInWishlist);
  }, [isInWishlist]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navegar a explore con los datos del juego
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
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

      {/* Corazón solo visual - indica si está en wishlist */}
      <View style={styles.heart}>
        <Heart
          size={16}
          color={wishlisted ? "#FF4D6D" : "#FFFFFF"}
          fill={wishlisted ? "#FF4D6D" : "none"}
        />
      </View>
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        style={styles.gradient}
      >
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.genre}>{genre}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heart: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    justifyContent: "flex-end",
  },
  info: {
    padding: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 2,
  },
  genre: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
    opacity: 0.8,
  },
});
