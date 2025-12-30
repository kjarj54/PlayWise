import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import GameCard from './GameCard';

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
}

export default function GameSection({ title, games, textColor = '#FFFFFF' }: GameSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            image={game.image}
            title={game.title}
            genre={game.genre}
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
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 14,
  },
  scrollContent: {
    paddingHorizontal: 14,
  },
});
