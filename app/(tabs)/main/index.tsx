import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import GameSection from '../../../components/main/GameSection';
import HeroSection from '../../../components/main/HeroSection';
import MainHeader from '../../../components/main/MainHeader';
import { APP_COLORS } from '../../../constants/colors';

// Mock data - Replace with actual data from your API
const heroGames = [
  {
    image: 'https://www.figma.com/api/mcp/asset/085d4e62-6abc-4a11-a678-d84c27c6ed57',
    title: 'Elden Ring',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    genre: 'RPG-Action',
    rating: 5,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'Resident Evil Village',
    description: "Experience survival horror like never before in the eighth major installment in the Resident Evil series. Set a few years after the horrifying events in the critically acclaimed Resident Evil 7 biohazard.",
    genre: 'Horror-Action',
    rating: 4,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/d67d3804-4946-42c3-b56f-fb119fc73124',
    title: 'Red Dead Redemption II',
    description: "America, 1899. The end of the Wild West era has begun. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee.",
    genre: 'RPG-Action',
    rating: 5,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/709218ad-892c-4f70-ab7b-1faf74e82e15',
    title: 'Battlefield 1',
    description: "Experience the dawn of all-out war in Battlefield 1. Discover a world at war through an adventure-filled campaign, or join in epic multiplayer battles with up to 64 players.",
    genre: 'Shooter-Action',
    rating: 4,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'The Last of Us',
    description: "Experience the emotional storytelling and unforgettable characters in The Last of Us, winner of over 200 Game of the Year awards.",
    genre: 'Action-Adventure',
    rating: 5,
  },
];

const recommendedGames = [
  {
    id: '1',
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'ResidentEvil Village',
    genre: 'Horror-Action',
  },
  {
    id: '2',
    image: 'https://www.figma.com/api/mcp/asset/d67d3804-4946-42c3-b56f-fb119fc73124',
    title: 'RedDead Redemption II',
    genre: 'RPG-Action',
  },
  {
    id: '3',
    image: 'https://www.figma.com/api/mcp/asset/709218ad-892c-4f70-ab7b-1faf74e82e15',
    title: 'BattleField 1',
    genre: 'Shooter-Action',
  },
  {
    id: '4',
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'RedDead Redemption II',
    genre: 'Horror-Action',
  },
];

const awardWinningGames = [
  {
    id: '5',
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'ResidentEvil Village',
    genre: 'Horror-Action',
  },
  {
    id: '6',
    image: 'https://www.figma.com/api/mcp/asset/d67d3804-4946-42c3-b56f-fb119fc73124',
    title: 'RedDead Redemption II',
    genre: 'RPG-Action',
  },
  {
    id: '7',
    image: 'https://www.figma.com/api/mcp/asset/709218ad-892c-4f70-ab7b-1faf74e82e15',
    title: 'BattleField 1',
    genre: 'Shooter-Action',
  },
  {
    id: '8',
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'RedDead Redemption II',
    genre: 'Horror-Action',
  },
];

const classicGames = [
  {
    id: '9',
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'ResidentEvil Village',
    genre: 'Horror-Action',
  },
  {
    id: '10',
    image: 'https://www.figma.com/api/mcp/asset/d67d3804-4946-42c3-b56f-fb119fc73124',
    title: 'RedDead Redemption II',
    genre: 'RPG-Action',
  },
  {
    id: '11',
    image: 'https://www.figma.com/api/mcp/asset/709218ad-892c-4f70-ab7b-1faf74e82e15',
    title: 'BattleField 1',
    genre: 'Shooter-Action',
  },
  {
    id: '12',
    image: 'https://www.figma.com/api/mcp/asset/6ccd8db6-fdc4-434c-b6f4-356de3f60c3d',
    title: 'RedDead Redemption II',
    genre: 'Horror-Action',
  },
];

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[APP_COLORS.gradientTop, APP_COLORS.gradientBottom]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.heroContainer}>
              <HeroSection games={heroGames} />
              <MainHeader userName="K" />
            </View>
            
            <GameSection
              title="Recommended Games"
              games={recommendedGames}
            />
            
            <GameSection
              title="Award-winning games"
              games={awardWinningGames}
              textColor="#D9D9D9"
            />
            
            <GameSection
              title="Classics"
              games={classicGames}
            />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    position: 'relative',
  },
});
