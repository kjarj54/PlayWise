import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface HeroGame {
  image: string;
  title: string;
  description: string;
  genre: string;
  rating: number;
}

interface HeroSectionProps {
  games: HeroGame[];
  duration?: number;
  interval?: number;
}

export default function HeroSection({ games, duration = 1200, interval = 5000 }: HeroSectionProps) {
  // Usar state solo para forzar re-render cuando sea necesario (para mostrar el juego actual)
  const [displayIndex, setDisplayIndex] = useState(0);

  // Index refs to avoid stale closures in animation callbacks
  const currentIndexRef = useRef(0);
  const nextIndexRef = useRef(1);

  // Mantener todas las imágenes montadas y animar sus opacidades individualmente
  const imageOpacitiesRef = useRef(
    games.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))
  );
  const imageOpacities = imageOpacitiesRef.current;

  // Progress animations para las barras
  const progressAnimsRef = useRef(
    games.map(() => new Animated.Value(0))
  );
  const progressAnims = progressAnimsRef.current;
  const progressAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  // Refs para los parámetros
  const durationRef = useRef(duration);
  const intervalRef = useRef(interval);

  useEffect(() => {
    durationRef.current = duration;
    intervalRef.current = interval;
  }, [duration, interval]);

  // Crossfade automático - una sola vez, sin dependencias
  useEffect(() => {
    if (!games || games.length < 2) return;

    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = () => {
      if (!isMounted) return;

      // Precompute next index (solo ref, sin setState)
      const preNext = (currentIndexRef.current + 1) % games.length;
      if (nextIndexRef.current !== preNext) {
        nextIndexRef.current = preNext;
      }

      const curIdx = currentIndexRef.current;
      const nxtIdx = nextIndexRef.current;

      // Animar crossfade
      Animated.parallel([
        Animated.timing(imageOpacities[curIdx], {
          toValue: 0,
          duration: durationRef.current,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(imageOpacities[nxtIdx], {
          toValue: 1,
          duration: durationRef.current,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (!isMounted) return;

        // Promote next to current (solo refs, sin setState para evitar re-render)
        const newCurrent = nextIndexRef.current;
        currentIndexRef.current = newCurrent;

        // Prepare upcoming next
        const newNext = (newCurrent + 1) % games.length;
        nextIndexRef.current = newNext;

        // Asegurar que la próxima imagen esté oculta
        imageOpacities[newNext].setValue(0);

        // Actualizar display para que muestre el contenido correcto
        setDisplayIndex(newCurrent);

        // Animar barra de progreso
        animateProgressBar(newCurrent);

        // Pause before next cycle
        timeoutId = setTimeout(animate, intervalRef.current);
      });
    };

    // Animar la primera barra de progreso
    animateProgressBar(0);

    // Start after initial display
    timeoutId = setTimeout(animate, intervalRef.current);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [games.length]);

  const animateProgressBar = (index: number) => {
    progressAnimRef.current?.stop();

    // Reset todas las barras
    progressAnims.forEach((anim, i) => {
      if (i < index) {
        anim.setValue(1);
      } else if (i > index) {
        anim.setValue(0);
      }
    });

    // Animar la barra actual
    progressAnimRef.current = Animated.timing(progressAnims[index], {
      toValue: 1,
      duration: intervalRef.current,
      useNativeDriver: false,
    });

    progressAnimRef.current.start();
  };

  // Función para cambio manual
  const goToSlide = (index: number) => {
    if (index === currentIndexRef.current) return;

    progressAnimRef.current?.stop();

    // Resetear progreso
    progressAnims.forEach((anim) => anim.setValue(0));

    const curIdx = currentIndexRef.current;
    const nxtIdx = index;

    // Animar transición
    Animated.parallel([
      Animated.timing(imageOpacities[curIdx], {
        toValue: 0,
        duration: durationRef.current,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(imageOpacities[nxtIdx], {
        toValue: 1,
        duration: durationRef.current,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Promote
      currentIndexRef.current = nxtIdx;
      nextIndexRef.current = (nxtIdx + 1) % games.length;

      // Asegurar que la próxima imagen esté oculta
      imageOpacities[nextIndexRef.current].setValue(0);

      // Actualizar display
      setDisplayIndex(nxtIdx);

      // Animar barra de progreso
      animateProgressBar(nxtIdx);
    });
  };

  // Función para ir a la siguiente imagen
  const goToNext = () => {
    const next = (currentIndexRef.current + 1) % games.length;
    goToSlide(next);
  };

  // Función para ir a la imagen anterior
  const goToPrevious = () => {
    const prev = (currentIndexRef.current - 1 + games.length) % games.length;
    goToSlide(prev);
  };

  // Gesto de deslizamiento
  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      const threshold = 50;

      if (event.translationX > threshold) {
        goToPrevious();
      } else if (event.translationX < -threshold) {
        goToNext();
      }
    });

  const currentGame = games[displayIndex];

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        {/* Background Images with Crossfade */}
        <View style={styles.imageContainer}>
          {games.map((game, i) => (
            <Animated.Image
              key={i}
              source={{ uri: game.image }}
              style={[styles.backgroundImage, { opacity: imageOpacities[i] }]}
              resizeMode="cover"
            />
          ))}
        </View>

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(1, 0, 9, 0)', 'rgba(1, 0, 9, 0.41)']}
          locations={[0.8, 0.9]}
          style={styles.gradientOverlay}
        />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{currentGame.title}</Text>

          {/* Rating Stars */}
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <Text key={index} style={styles.star}>
                {index < currentGame.rating ? '⭐' : '☆'}
              </Text>
            ))}
          </View>

          <Text style={styles.description} numberOfLines={3}>
            {currentGame.description}
          </Text>

          <Text style={styles.genre}>{currentGame.genre}</Text>

          {/* Progress Indicators */}
          <View style={styles.indicators}>
            {games.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => goToSlide(index)}
                activeOpacity={0.7}
                style={styles.indicatorTouchable}
              >
                <View style={styles.indicatorBackground}>
                  <Animated.View
                    style={[
                      styles.indicatorProgress,
                      {
                        width: progressAnims[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                        backgroundColor: index === displayIndex ? '#D21718' : '#D9D9D9',
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 324,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 324,
    width: '100%',
    zIndex: 2,
  },
  content: {
    position: 'absolute',
    bottom: 20,
    left: 11,
    right: 11,
    zIndex: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '300',
    lineHeight: 14,
    marginBottom: 8,
    maxWidth: 344,
  },
  genre: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 12,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicatorTouchable: {
    width: 28,
    height: 5,
  },
  indicatorBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 34,
    overflow: 'hidden',
  },
  indicatorProgress: {
    height: '100%',
    borderRadius: 34,
  },
});
