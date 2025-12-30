# Main Screen - Figma Design Implementation

This folder contains the implementation of the Main Screen design from Figma.

## Structure

```
app/(tabs)/main/
  └── index.tsx              # Main screen component

components/main/
  ├── GameCard.tsx           # Reusable game card component
  ├── GameSection.tsx        # Section with horizontal scrollable game list
  ├── HeroSection.tsx        # Hero banner with featured game
  ├── MainHeader.tsx         # Header with logo, search, and profile
  └── index.ts               # Barrel export

types/
  └── game.ts                # Game data types
```

## Components

### MainScreen
The main entry point that combines all components with:
- Gradient background (from dark blue to deep purple)
- SafeAreaView for proper spacing
- ScrollView for vertical scrolling
- Hero section
- Multiple game sections (Recommended, Award-winning, Classics)

### MainHeader
Header component with:
- Logo text
- Search icon
- User profile avatar

### HeroSection
Featured game banner with:
- Background image with opacity
- Gradient overlay
- Game title, rating (stars), description, and genre
- Carousel indicators (dots)

### GameCard
Individual game card with:
- Game image
- Gradient overlay at bottom
- Game title and genre

### GameSection
Horizontal scrollable section with:
- Section title
- Horizontal list of game cards

## Data

Currently using mock data with Figma asset URLs. Replace with your API data:
- Hero game data
- Recommended games
- Award-winning games
- Classic games

## Usage

Navigate to the Main tab in the bottom navigation to view this screen.

## Design Source

Figma Design: [PlayWise - Main Screen](https://www.figma.com/design/y7AFhz4IU92ULOaXkihGie/PlayWise?node-id=23-28)
