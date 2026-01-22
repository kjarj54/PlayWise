import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import GameCard from "./GameCard";

interface Game {
  id: string;
  image: string;
  title: string;
  genre: string;
}

interface GameSectionProps {
  title: string;
  games: Game[];
  textColor?: string;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  wishlistGameIds?: string[]; // Array de api_ids de juegos en wishlist (solo para mostrar el corazón)
}

export default function GameSection({
  title,
  games,
  textColor = "#FFFFFF",
  onLoadMore,
  isLoadingMore = false,
  wishlistGameIds = [],
}: GameSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>{title}</Text>
        {onLoadMore && (
          <Text
            style={styles.loadMore}
            onPress={() => !isLoadingMore && onLoadMore()}
          >
            {isLoadingMore ? "Cargando..." : "Ver más"}
          </Text>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            image={game.image}
            title={game.title}
            genre={game.genre}
            isInWishlist={wishlistGameIds.includes(game.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  scrollContent: {
    paddingHorizontal: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  loadMore: {
    color: "#888",
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
