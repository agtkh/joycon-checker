import React from 'react';
import styled from 'styled-components';
// import { getContrastColor } from '../../utils/colors';

// =================================================================
// 定数定義エリア
// =================================================================
const COLORS = {
  BODY: '#FF3C3C', // Joy-Con (L) の本体色
  // SIDE_RAIL: '#382325',
  // STICK_BASE: '#382325',
  // STICK_TOP: '#333',
  BUTTON_DEFAULT: '#382325',
  BUTTON_PRESSED: '#ff4d4d',
  STROKE_TOUCHED: '#ffd700',
  STROKE_TOUCHED_TRANSPARENT: 'rgba(255, 215, 0, 0.5)',
};

// =================================================================
// スタイル定義エリア
// =================================================================
const Button = styled.path<{ $pressed?: boolean; $touched?: boolean; $color?: string; $default_color?: string}>`
  fill: ${({ $pressed, $color, $default_color }) => ($pressed ? COLORS.BUTTON_PRESSED : ($color || $default_color || COLORS.BUTTON_DEFAULT))};
  stroke: ${({ $touched, $pressed }) => ($touched && !$pressed ? COLORS.STROKE_TOUCHED : 'none')};
  stroke-width: 2px;
  paint-order: stroke;
  transition: fill 0.05s ease;
  &.transparent {
    stroke-width: 1px;
    fill: transparent;
    stroke: ${({ $touched, $pressed }) => ($touched && !$pressed ? COLORS.STROKE_TOUCHED_TRANSPARENT : 'none')};
  }
`;

const Stick = styled.circle<{ x: number; y: number }>`
  fill: ${COLORS.BUTTON_DEFAULT};
  stroke: #555;
  stroke-width: 2px;
  transform: ${({ x, y }) => `translate(${x * 20}px, ${y * 20}px)`};
`;

const Body = styled.path<{ $color?: string }>`
  fill: ${({ $color }) => $color || COLORS.BODY};
`;

const SideRail = styled.path`
  fill: ${COLORS.BUTTON_DEFAULT};
`;

const Guide = styled.path<{ $edgeReached?: boolean }>`
  fill: none;
  stroke: ${({ $edgeReached }) => ($edgeReached ? COLORS.STROKE_TOUCHED : '#666')};
  stroke-width: 1.5px;
  stroke-dasharray: ${({ $edgeReached }) => ($edgeReached ? 'none' : '4 4')};
  transition: stroke 0.1s ease;
`;

// =================================================================
// コンポーネント定義エリア
// =================================================================
interface Props {
  buttons: { [key: string]: { pressed?: boolean; touched?: boolean } };
  stick: { x: number; y: number };
  bodyColor?: string;
  buttonColor?: string;
  isPreview?: boolean;
  leftStickAtEdge: boolean;
}

export const JoyConLSVG: React.FC<Props> = ({ buttons, stick, bodyColor, buttonColor, isPreview, leftStickAtEdge }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215.2 577.16">
      {/* Body */}
      <Body $color={bodyColor} d="m 118.1,75.76 h 72.3 c 2.1,0 3.9,1.7 3.9,3.8 c 2.41,164.3 0,329.13 0,493.7 0,2.1 -1.7,3.9 -3.9,3.9 h -72.3 c -57.5,0 -104.2,-46.6 -104.2,-104.2 v -293 C 14,122.46 60.6,75.76 118.1,75.76" />

      {/* SL, SR Buttons */}
      <Button d="m 194.3,192.96 h 31 v 30.6 h -31" $color={bodyColor} $default_color={COLORS.BODY} $pressed={buttons.SL?.pressed} $touched={buttons.SL?.touched} />
      <Button d="m 194.3,376.96 h 31 v 30.6 h -31" $color={bodyColor} $default_color={COLORS.BODY} $pressed={buttons.SR?.pressed} $touched={buttons.SR?.touched} />

      {/* Side Rail */}
      <SideRail d="m 215.2,525.46 h -8.4 v -28.4 H 194 v 0 -46.2 -28.6 -62.3 -117.7 -62.3 -30.1 -50.4 h 21.2 v 80.5 h -10.6 v 13.1 30.6 18.6 h 10.6 v 117.7 h -10.6 v 16.5 30.6 15.2 h 10.6 v 65.3 9.5 z" />
      
      {/* L Button */}
      <Button d="m 2.1,158.26 c 5.1,-26.5 19.3,-49.8 39.2,-66.5 19.9,-16.6 45.6,-26.6 73.6,-26.6 H 131 c 5.9,0 10.6,4.8 10.6,10.6 0,0 0,0 0,0 h -23.8 c -57.5,0 -104.2,46.6 -104.2,104.2 v 10 c -1,0.3 -1.9,0.6 -3,0.6 -5.9,0 -10.6,-4.8 -10.6,-10.6 0.1,-7.4 0.8,-14.7 2.1,-21.7 z" $color={buttonColor} $pressed={buttons.L?.pressed} $touched={buttons.L?.touched} />

      {/* ZL Button */}
      {!isPreview && (<Button d="M 4.51,57.87 H 141.07 C 141,29.43 127.02,0 100.13,0 H 61.93 C 24.53,7.28 16.84,34.14 4.51,57.87 Z" $color={buttonColor} $pressed={buttons.ZL?.pressed} $touched={buttons.ZL?.touched} />)}

      {/* D-Pad */}
      <g>
          <Button d="m 102.6,324.16 c -11.5,0 -20.9,-9.3 -20.9,-20.9 0,-11.5 9.3,-20.9 20.9,-20.9 11.5,0 20.9,9.3 20.9,20.9 0,11.6 -9.3,20.9 -20.9,20.9 z" $color={buttonColor} $pressed={buttons.Up?.pressed} $touched={buttons.Up?.touched} />
          
          <Button d="m 123.5,383.36 c 0,11.5 -9.3,20.9 -20.9,20.9 -11.5,0 -20.9,-9.3 -20.9,-20.9 0,-11.5 9.3,-20.9 20.9,-20.9 11.6,0 20.9,9.4 20.9,20.9 z" $color={buttonColor} $pressed={buttons.Down?.pressed} $touched={buttons.Down?.touched} />
          <Button d="m 62.6,322.46 c 11.5,0 20.9,9.3 20.9,20.9 0,11.5 -9.3,20.9 -20.9,20.9 -11.5,0 -20.9,-9.4 -20.9,-20.9 0,-11.6 9.3,-20.9 20.9,-20.9 z" $color={buttonColor} $pressed={buttons.Left?.pressed} $touched={buttons.Left?.touched} />
          <Button d="m 121.8,343.36 c 0,-11.5 9.3,-20.9 20.9,-20.9 11.5,0 20.9,9.3 20.9,20.9 0,11.5 -9.3,20.9 -20.9,20.9 -11.6,0 -20.9,-9.4 -20.9,-20.9 z" $color={buttonColor} $pressed={buttons.Right?.pressed} $touched={buttons.Right?.touched} />
      </g>
      
      {/* Minus and Capture Buttons */}
      <g>
        <Button d="m 167.1,122.46 v 9.1 h -25.3 v -9.1 z" $color={buttonColor} $pressed={buttons.Minus?.pressed} $touched={buttons.Minus?.touched} />
        <Button d="m 117.02,418.86 h 26.2 a 4.35,4.35 45 0 1 4.35,4.35 v 25.92 a 4.73,4.73 135 0 1 -4.73,4.73 h -25.73 a 4.54,4.54 45 0 1 -4.54,-4.54 l 0,-26.01 a 4.45,4.45 135 0 1 4.45,-4.45 z" $color={buttonColor} $pressed={buttons.Capture?.pressed} $touched={buttons.Capture?.touched} />
      </g>
      
      {/* Analog Stick */}
      <g>
        <path fill={COLORS.BUTTON_DEFAULT} d="m 102.6,153.16 c 26.7,0 48.3,21.6 48.3,48.3 0,26.7 -21.6,48.3 -48.3,48.3 -26.7,0 -48.3,-21.6 -48.3,-48.3 0,-26.7 21.6,-48.3 48.3,-48.3 z" />
        <g transform="translate(102.6, 201.46)">
            <Guide as="circle" r="25" $edgeReached={leftStickAtEdge} />
            <Guide d="M 0 -25 L 0 25 M -25 0 L 25 0" />
            <Stick r="38" {...stick} />
        </g>
        <Button className="transparent" d="m 102.6,153.16 c 26.7,0 48.3,21.6 48.3,48.3 0,26.7 -21.6,48.3 -48.3,48.3 -26.7,0 -48.3,-21.6 -48.3,-48.3 0,-26.7 21.6,-48.3 48.3,-48.3 z" $pressed={buttons.LStick?.pressed} $touched={buttons.LStick?.touched} />
      </g>
    </svg>
  );
};