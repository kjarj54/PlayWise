import MaskedView from '@react-native-masked-view/masked-view';
import Constants from 'expo-constants';
import React from 'react';
import { Platform, View } from 'react-native';
import AnimatedTextSplit from './AnimatedTextSplit';
import GradientText from './GradientText';
import { threeStopGradientColors } from './utils';

export default function AnimatedGradientTitle({ start, titleWidth, setTitleWidth, fontSize = 48, charDelay = 50 }: { start: boolean; titleWidth: number; setTitleWidth: (n: number) => void; fontSize?: number; charDelay?: number }) {
  const left = '#31081f';
  const mid = '#DB0000';
  const right = '#31081f';
  const play = 'PLAY';
  const wise = 'WISE';
  const combined = `${play} ${wise}`;

  const measuredWidthStyle = titleWidth ? { width: titleWidth } : undefined;

  const usingExpoGo = Constants?.appOwnership === 'expo' || Constants?.appOwnership === 'guest';
  const canUseMask = typeof MaskedView !== 'undefined' && MaskedView != null && Platform.OS !== 'web' && !usingExpoGo;

  const combinedColors = threeStopGradientColors(combined.length, left, mid, right);
  const playColors = combinedColors.slice(0, play.length);
  const wiseColors = combinedColors.slice(play.length + 1);

  if (canUseMask) {
    return (
      <View onLayout={(e) => setTitleWidth(e.nativeEvent.layout.width)} style={{ alignItems: 'center', ...measuredWidthStyle }}>
        <MaskedView
          style={measuredWidthStyle}
          maskElement={
            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'flex-end' }}>
              <AnimatedTextSplit start={start} mask text={play} fontSize={fontSize} charDelay={charDelay} />
              <View style={{ width: 8 }} />
              <AnimatedTextSplit start={start} mask text={wise} fontSize={fontSize} charDelay={charDelay} />
            </View>
          }
        >
          <GradientText text={`${play} ${wise}`} fontSize={fontSize} start={start} />
        </MaskedView>
      </View>
    );
  }

  return (
    <View onLayout={(e) => setTitleWidth(e.nativeEvent.layout.width)} style={{ flexDirection: 'row', alignItems: 'flex-end', ...measuredWidthStyle }}>
      <AnimatedTextSplit start={start} text={play} fontSize={fontSize} charDelay={charDelay} perCharColors={playColors} />
      <View style={{ width: 8 }} />
      <AnimatedTextSplit start={start} text={wise} fontSize={fontSize} charDelay={charDelay} perCharColors={wiseColors} />
    </View>
  );
}
