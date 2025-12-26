import React, { useEffect, useRef } from 'react';
import { Animated, View, Easing } from 'react-native';

export default function AnimatedTextSplit({
  text,
  fontSize = 48,
  charDelay = 50,
  textStyle = {},
  start = true,
  mask = false,
  perCharColors,
}: {
  text: string;
  fontSize?: number;
  charDelay?: number;
  textStyle?: any;
  start?: boolean;
  mask?: boolean;
  perCharColors?: string[];
}) {
  const chars = text.split('');
  const containerHeight = Math.ceil(fontSize * 1.4);
  const animValues = useRef(chars.map(() => new Animated.Value(containerHeight))).current;
  const opacityValues = useRef(chars.map(() => new Animated.Value(0))).current;
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    const animations = animValues.map((av, i) =>
      Animated.parallel([
        Animated.timing(av, { toValue: 0, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(opacityValues[i], { toValue: 1, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ])
    );

    const staggered = Animated.stagger(charDelay, animations);
    const handle = staggered;
    handle.start();

    return () => handle.stop && handle.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      {chars.map((ch, i) => (
        <View key={i} style={{ overflow: 'hidden', height: containerHeight, justifyContent: 'center' }}>
          <Animated.Text
            style={[
              { transform: [{ translateY: animValues[i] }], opacity: opacityValues[i], fontSize, lineHeight: containerHeight },
              mask ? { color: '#000' } : (perCharColors ? { color: perCharColors[i] } : textStyle),
            ]}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </Animated.Text>
        </View>
      ))}
    </View>
  );
}
