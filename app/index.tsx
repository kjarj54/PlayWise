import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import AnimatedGradientTitle from '../components/Intro/AnimatedGradientTitle';



export default function Index() {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [titleWidth, setTitleWidth] = useState<number>(0);
  const [lettersStart, setLettersStart] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Animación de fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setLettersStart(true);
    });
  }, [fadeAnim]);

  useEffect(() => {
    if (!lettersStart) return;
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [lettersStart, router]);

  return (
    <GradientBackground className="items-center justify-center">
      <Animated.View 
        style={{ opacity: fadeAnim }}
        className="flex-1 items-center justify-center"
      >
        <View style={{ alignItems: 'center' }}>
          {/* Gradient-masked title */}
          <AnimatedGradientTitle
            start={lettersStart}
            titleWidth={titleWidth}
            setTitleWidth={setTitleWidth}
            fontSize={48}
            charDelay={50}
          />

          <View style={{ backgroundColor: '#DB0000', height: 4, width: titleWidth || undefined, alignSelf: 'center', marginTop: 8, borderRadius: 2 }} />
        </View>
      </Animated.View>
    </GradientBackground>
  );
}
