import React from 'react';
import styled from 'styled-components';
import { getContrastColor } from '../../utils/colors';

// =================================================================
// 定数定義エリア
// =================================================================
const COLORS = {
  BODY: '#00B2FF',
  // SIDE_RAIL: '#382325',
  // STICK_BASE: '#382325',
  // STICK_TOP: '#333',
  BUTTON_DEFAULT: '#382325', // 本体に馴染む色に変更
  BUTTON_PRESSED: '#ff4d4d',
  STROKE_TOUCHED: '#ffd700',
  STROKE_TOUCHED_TRANSPARENT: "#ffd700"
};

// =================================================================
// スタイル定義エリア
// =================================================================
const Button = styled.path<{ $pressed?: boolean; $touched?: boolean; $color?: string; $default_color?: string }>`
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
  rightStickAtEdge?: boolean;
}

export const JoyConRSVG: React.FC<Props> = ({ buttons, stick, bodyColor, buttonColor, isPreview, rightStickAtEdge }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215.56 577.8">
      {/* Body */}
      <Body $color={bodyColor} d="M 97.1,76.4 H 24.8 c -2.1,0 -3.9,1.7 -3.9,3.8 -2.4,164.3 0,329.1 0,493.7 0,2.1 1.7,3.9 3.9,3.9 h 72.3 c 57.5,0 104.2,-46.6 104.2,-104.2 v -293 C 201.2,123.1 154.6,76.4 97.1,76.4" />

      {/* SL, SR Buttons */}
      <Button d="M 20.9,193.6 H 0.0 v 30.6 h 15.5" $color={bodyColor} $default_color={COLORS.BODY} $pressed={buttons.SR?.pressed} $touched={buttons.SR?.touched} />
      <Button d="M 20.9,377.6 H 0.0 v 30.6 h 15.5" $color={bodyColor} $default_color={COLORS.BODY} $pressed={buttons.SL?.pressed} $touched={buttons.SL?.touched} />

      {/* Side Rail */}
      <SideRail d="m 10.6,407.7 v 15.2 H 0 v 65.3 9.5 28.4 h 8.4 v -28.4 h 12.8 v 0 -46.2 -28.6 -62.3 -117.7 -62.3 -30.1 -50.4 0 H 0 v 80.5 h 10.6 v 13.1 30.6 18.6 H 0 v 117.7 h 10.6 v 16.5 z" />

      {/* R Buttons */}
      <Button d="M 213.1,158.9 C 208,132.4 193.8,109.1 173.9,92.4 154,75.8 128.3,65.8 100.3,65.8 H 84.2 c -5.9,0 -10.6,4.8 -10.6,10.6 0,0 0,0 0,0 h 23.8 c 57.5,0 104.2,46.6 104.2,104.2 v 10 c 1,0.3 1.9,0.6 3,0.6 5.9,0 10.6,-4.8 10.6,-10.6 -0.1,-7.4 -0.8,-14.7 -2.1,-21.7 z" $color={buttonColor} $pressed={buttons.R?.pressed} $touched={buttons.R?.touched} />

      {/* ZR Button */}
      {!isPreview && (<Button d="M 215.56,57.87 H 79 C 79.07,29.43 93.05,0 119.94,0 H 158.14 C 195.54,6.82 203.22,33.68 215.56,57.87 Z" $color={buttonColor} $pressed={buttons.ZR?.pressed} $touched={buttons.ZR?.touched} />)}

      {/* Face Buttons */}
      <g>
        <Button d="m 112.6,182.9 c 11.5,0 20.9,-9.3 20.9,-20.9 0,-11.5 -9.3,-20.9 -20.9,-20.9 -11.5,0 -20.9,9.3 -20.9,20.9 0,11.6 9.3,20.9 20.9,20.9 z" $color={buttonColor} $pressed={buttons.X?.pressed} $touched={buttons.X?.touched} />
        <text fontSize="24px" x="112.6" y="162.9" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(buttonColor || COLORS.BUTTON_DEFAULT)}>X</text>
        <Button d="m 91.7,242.1 c 0,11.5 9.3,20.9 20.9,20.9 11.5,0 20.9,-9.3 20.9,-20.9 0,-11.5 -9.3,-20.9 -20.9,-20.9 -11.6,0 -20.9,9.4 -20.9,20.9 z" $color={buttonColor} $pressed={buttons.B?.pressed} $touched={buttons.B?.touched} />
        <text fontSize="24px" x="112.7" y="243.1" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(buttonColor || COLORS.BUTTON_DEFAULT)}>B</text>
        <Button d="m 152.6,181.2 c -11.5,0 -20.9,9.3 -20.9,20.9 0,11.5 9.3,20.9 20.9,20.9 11.5,0 20.9,-9.4 20.9,-20.9 0,-11.6 -9.3,-20.9 -20.9,-20.9 z" $color={buttonColor} $pressed={buttons.A?.pressed} $touched={buttons.A?.touched} />
        <text fontSize="24px" x="152.6" y="202.2" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(buttonColor || COLORS.BUTTON_DEFAULT)}>A</text>
        <Button d="m 93.4,202.1 c 0,-11.5 -9.3,-20.9 -20.9,-20.9 -11.5,0 -20.9,9.3 -20.9,20.9 0,11.5 9.3,20.9 20.9,20.9 11.6,0 20.9,-9.4 20.9,-20.9 z" $color={buttonColor} $pressed={buttons.Y?.pressed} $touched={buttons.Y?.touched} />
        <text fontSize="24px" x="72.4" y="204.1" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(buttonColor || COLORS.BUTTON_DEFAULT)}>Y</text>
      </g>

      {/* Plus Button*/}
      <Button d="m 58,127.4 v 8.1 h 9.1 v -8.1 h 8.1 v -9.1 h -8.1 v -8.1 H 58 v 8.1 h -8.1 v 9.1 z" $color={buttonColor} $pressed={buttons.Plus?.pressed} $touched={buttons.Plus?.touched} />

      {/* Home Button  */}
      <Button d="m 86.01,412.79 c -12.43,0 -22.4,9.97 -22.4,22.4 0,12.31 9.97,22.41 22.4,22.41 12.31,0 22.41,-9.97 22.41,-22.41 0,-12.43 -9.97,-22.4 -22.41,-22.4 z" $color={buttonColor} $pressed={buttons.Home?.pressed} $touched={buttons.Home?.touched} />
      <text fontSize="24px" x="86.01" y="435.79" dominantBaseline="middle" textAnchor="middle" fill='white'>H</text>

      {/* Analog Stick */}
      <g>
        <path fill={COLORS.BUTTON_DEFAULT} d="m 112.6,293.9 c -26.7,0 -48.3,21.6 -48.3,48.3 0,26.7 21.6,48.3 48.3,48.3 26.7,0 48.3,-21.6 48.3,-48.3 0,-26.7 -21.6,-48.3 -48.3,-48.3 z" />
        <g transform="translate(112.6, 342.2)">
            <Guide as="circle" r="25" $edgeReached={rightStickAtEdge} />
            <Guide d="M 0 -25 L 0 25 M -25 0 L 25 0" />
          <Stick r="38" {...stick} />
        </g>
        <Button className="transparent" d="m 112.6,293.9 c -26.7,0 -48.3,21.6 -48.3,48.3 0,26.7 21.6,48.3 48.3,48.3 26.7,0 48.3,-21.6 48.3,-48.3 0,-26.7 -21.6,-48.3 -48.3,-48.3 z" $pressed={buttons.RStick?.pressed} $touched={buttons.RStick?.touched} />
      </g>
    </svg>
  );
};