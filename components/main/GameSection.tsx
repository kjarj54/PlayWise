import React from "react";
import { ScrollView, Text, View } from "react-native";
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
  wishlistGameIds?: string[]; // Array de api_ids en wishlist (solo visual)
  onToggleWishlist?: (game: Game) => void;
}

export default function GameSection({
  title,
  games,
  textColor = "#FFFFFF",
  onLoadMore,
  isLoadingMore = false,
  wishlistGameIds = [],
  onToggleWishlist,
}: GameSectionProps) {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center px-[14] mb-2">
        <Text
          className="text-[20px] font-semibold"
          style={{ color: textColor }}
        >
          {title}
        </Text>

        {onLoadMore && (
          <Text
            className="text-[#888] text-[14px] py-1 px-2"
            onPress={() => !isLoadingMore && onLoadMore()}
          >
            {isLoadingMore ? "Cargando..." : "Ver más"}
          </Text>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-[14]"
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            image={game.image}
            title={game.title}
            genre={game.genre}
            isInWishlist={wishlistGameIds.includes(game.id)}
            onToggleWishlist={() => onToggleWishlist?.(game)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
