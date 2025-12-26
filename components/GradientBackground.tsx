import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
}

export default function GradientBackground({ children, className = '' }: GradientBackgroundProps) {
  const { height } = useWindowDimensions();

  return (
    <LinearGradient
      colors={['#010009', '#0C006F']}
      className={`flex-1 ${className}`}
      // Ensure full-screen on native and web (use numeric height on web to satisfy TypeScript)
      style={Platform.OS === 'web' ? { height } : { flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
