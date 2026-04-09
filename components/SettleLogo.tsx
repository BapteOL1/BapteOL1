import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, radius } from '../constants/theme';

interface SettleLogoProps {
  size?: number;
}

export function SettleLogo({ size = 40 }: SettleLogoProps) {
  const iconSize = size * 0.5;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(200,169,122,0.3)',
      }}
    >
      <Svg width={iconSize} height={iconSize * 1.2} viewBox="0 0 20 24">
        <Path
          d="M10 1 C10 1 3 9 3 14.5 C3 19 6.1 23 10 23 C13.9 23 17 19 17 14.5 C17 9 10 1 10 1 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.5 16.5 C6.5 18.4 8.1 20 10 20"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
