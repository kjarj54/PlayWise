import MaskedView from '@react-native-masked-view/masked-view';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, View } from 'react-native';
import AnimatedTextSplit from './AnimatedTextSplit';
import { threeStopGradientColors } from './utils';

export default function GradientText({
  text,
  fontSize = 48,
  start = true,
  delay = 0,
  charDelay = 50,
  perCharColors,
}: {
  text: string;
  fontSize?: number;
  start?: boolean;
  delay?: number;
  charDelay?: number;
  perCharColors?: string[];
}) {
  const containerHeight = Math.ceil(fontSize * 1.4);
  const usingExpoGo = Constants?.appOwnership === 'expo' || Constants?.appOwnership === 'guest';
  const canUseMask = typeof MaskedView !== 'undefined' && MaskedView != null && Platform.OS !== 'web' && !usingExpoGo;

  if (canUseMask) {
    return (
      <MaskedView
        style={{}}
        maskElement={
          <View style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'flex-end' }}>
            <AnimatedTextSplit start={start} mask text={text} fontSize={fontSize} charDelay={charDelay} />
          </View>
        }
      >
        <LinearGradient colors={["#31081f", "#DB0000", "#31081f"]} start={[0, 0]} end={[1, 0]} style={{ height: containerHeight }} />
      </MaskedView>
    );
  }

  const colors = perCharColors ?? threeStopGradientColors(text.length, '#31081f', '#DB0000', '#31081f');
  return <AnimatedTextSplit start={start} text={text} fontSize={fontSize} charDelay={charDelay} perCharColors={colors} />;
}
