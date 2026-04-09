import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface TabIconProps {
  color: string;
  size?: number;
}

export function HomeIcon({ color, size = 22 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15.5V15.5H8.5V21H4C3.45 21 3 20.55 3 20V10.5Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SearchIcon({ color, size = 22 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="7.5" stroke={color} strokeWidth="1.75" />
      <Path
        d="M20.5 20.5L16.5 16.5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PlanIcon({ color, size = 22 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 20V15M9 20V11M14 20V7M19 20V3"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function AIIcon({ color, size = 22 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.5L13.7 8.8L20 10.5L13.7 12.2L12 18.5L10.3 12.2L4 10.5L10.3 8.8L12 2.5Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.5 3L20 5L22 5.5L20 6L19.5 8L19 6L17 5.5L19 5L19.5 3Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TimelineIcon({ color, size = 22 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="4" width="18" height="17" rx="2" stroke={color} strokeWidth="1.75" />
      <Path
        d="M8 2V6M16 2V6M3 10H21"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <Path
        d="M8 15.5L10.5 18L16 13"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
