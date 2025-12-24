# 🎮 PlayWise

**PlayWise** is a comprehensive mobile application designed for video game enthusiasts, combining a rating and review platform with price comparison tools and social networking features.

## 📱 Key Features

### 🎯 Video Game Ratings
- Rate and review your favorite video games
- Discover opinions from other players
- Explore detailed ratings by categories
- Comment and discuss your favorite titles

### 💰 Price Comparison
- Compare video game prices across multiple stores in real-time
- Find the best available deals
- Save money on your video game purchases
- View price history

### 🔔 Discount Notifications
- Receive instant alerts when a game on your wishlist goes on sale
- Set up personalized notifications per game
- Never miss a special promotion
- Alerts for significant discounts on your favorite games

### 👥 Social Network for Gamers
- Add friends and expand your gaming community
- Share your ratings and discoveries
- See what your friends are playing
- Interact with other players with similar tastes

### 📋 Wishlist
- Create and manage your desired game list
- Receive notifications when prices drop
- Organize your future purchases

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go (for testing on physical device)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd playwise
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the application

   ```bash
   npx expo start
   ```

4. Options to run the app:
   - Scan the QR code with **Expo Go** (Android) or Camera (iOS)
   - Press `a` to open in Android Emulator
   - Press `i` to open in iOS Simulator
   - Press `w` to open in web browser

## 🛠️ Technologies

- **React Native** with **Expo**
- **TypeScript** for type safety
- **NativeWind** for styling (Tailwind CSS)
- **Expo Router** for file-based navigation

## 📁 Project Structure

```
playwise/
├── app/                 # Application routes and screens
│   ├── (tabs)/         # Tab navigation
│   ├── _layout.tsx     # Main layout
│   └── global.css      # Global styles
├── components/         # Reusable components
├── constants/          # Constants and themes
├── hooks/              # Custom React hooks
└── assets/            # Images and static resources
```

## 📝 Available Scripts

```bash
# Start development server
npm start

# Start on Android
npm run android

# Start on iOS
npm run ios

# Start on web
npm run web

# Run linter
npm run lint

# Reset project (clean example code)
npm run reset-project
```

## 🔗 Backend

This project works together with the **PlayWise-Backend**, which provides:
- RESTful API for user management
- Authentication and authorization system
- Ratings and reviews management
- Friends and social network system
- Price comparison across stores
- Push notifications for discounts
- Wishlist management

## 👥 Developers

- **[Kevin Fallas](https://github.com/kevtico20)** - Full Stack Developer
- **[Kevin Arauz](https://github.com/kjarj54)** - Full Stack Developer

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss the changes you would like to make.

## 📄 License

This project is private and confidential.
