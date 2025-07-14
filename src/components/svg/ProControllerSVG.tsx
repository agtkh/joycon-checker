import React from 'react';
import styled from 'styled-components';
import { getContrastColor } from '../../utils/colors';

// =================================================================
// 定数定義エリア
// =================================================================
const COLORS = {
  BODY: '#3a3b3b',
  GRIP_LEFT_DEFAULT: '#55B332',  // ネオングリーン
  GRIP_RIGHT_DEFAULT: '#E95082', // ネオンピンク
  // STICK_BASE: '#3a3b3b',
  // STICK_TOP: '#333',
  BUTTON_DEFAULT: '#000000',
  BUTTON_PRESSED: '#ff4d4d',
  STROKE_TOUCHED: '#ffd700',
  STROKE_TOUCHED_TRANSPARENT: '#ffd700',
};

// =================================================================
// スタイル定義エリア
// =================================================================
const Button = styled.path<{ $pressed?: boolean; $touched?: boolean; $color?: string }>`
  fill: ${({ $pressed, $color }) => ($pressed ? COLORS.BUTTON_PRESSED : ($color || COLORS.BUTTON_DEFAULT))};
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

const Body = styled.path`
  fill: ${COLORS.BODY};
`;

const LeftGrip = styled.path<{ $color?: string }>`
  fill: ${({ $color }) => $color || COLORS.GRIP_LEFT_DEFAULT};
`;

const RightGrip = styled.path<{ $color?: string }>`
  fill: ${({ $color }) => $color || COLORS.GRIP_RIGHT_DEFAULT};
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
  sticks: {
    left: { x: number; y: number };
    right: { x: number; y: number };
  };
  colors: {
    body?: string;
    buttons?: string;
    leftGrip?: string;
    rightGrip?: string;
  };
  isPreview?: boolean;
  leftStickAtEdge: boolean;
  rightStickAtEdge: boolean;
}

export const ProControllerSVG: React.FC<Props> = ({ buttons, sticks, colors, isPreview, leftStickAtEdge, rightStickAtEdge }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 389.46 324.09">
      {/* Grips */}
      <RightGrip $color={colors.rightGrip} d="m 322.89,303.8 c -12.16,-22 -13.78,-54.3 -33.67,-63.29 l 83.12,-114 c 11.42,40.25 16.31,90 16.83,118.75 0.61,33.59 4,81.45 -42.63,78.72 -11.34,-3.09 -18.04,-11 -23.65,-20.18 z" />
      <LeftGrip $color={colors.leftGrip} d="m 42.92,323.94 c -46.59,2.73 -43.24,-45.13 -42.63,-78.72 0.52,-28.72 5.42,-78.5 16.83,-118.75 l 83.12,114 c -19.89,9 -21.51,41.26 -33.66,63.29 -5.66,9.22 -12.31,17.13 -23.66,20.18 z" />

      {/* Body */}
      <Body d="m 194.73,238.11 h 81.86 c 4.34,-0.15 8.65,0.66 12.63,2.4 l 83.12,-114 c -6.02,-21.29 -13.84,-39.97 -23.84,-51.45 -12.54,-14.59 -26.72,-15.65 -51.21,-22.46 -21.61,-3.97 -43.9,-5.34 -50.03,-5.76 -17.48,-1 -35,-1.51 -52.53,-1.45 -17.53,0.06 -35,0.48 -52.53,1.45 -6.13,0.42 -28.11,1.93 -45.72,4.61 -23.87,5.71 -46.61,10 -55.55,23.6 -10,11.44 -17.78,30.12 -23.81,51.37 l 83.12,114 c 3.98,-1.73 8.29,-2.55 12.63,-2.4 z" />

      {/* ZL / ZR */}
      {!isPreview && (<>
        <Button fill={COLORS.BUTTON_DEFAULT} d="M 48.45,35.87 H 134.8 C 134.75,18.38 125.91,0.27 108.91,0.27 l -24.15,0.28 C 61.11,4.75 56.25,21.27 48.45,35.87 Z" $pressed={buttons.ZL?.pressed} $touched={buttons.ZL?.touched} />
        <Button fill={COLORS.BUTTON_DEFAULT} d="M 346.38,35.61 H 260.03 C 260.08,18.11 268.92,0 285.92,0 l 24.15,0.28 c 23.65,4.2 28.51,20.72 36.3,35.33 z" $pressed={buttons.ZR?.pressed} $touched={buttons.ZR?.touched} />
      </>
      )}

      {/* L / R */}
      <Button fill={COLORS.BUTTON_DEFAULT} d="m 130.34,46.53 c -29.35,1.73 -55.18,5.89 -81.41,18.53 12.58,-29.24 66.18,-34.4 81.41,-18.53 z" $pressed={buttons.L?.pressed} $touched={buttons.L?.touched} />
      <Button fill={COLORS.BUTTON_DEFAULT} d="m 258.89,46.95 c 29.35,1.73 55.18,5.89 81.41,18.53 -12.58,-29.24 -66.18,-34.4 -81.41,-18.53 z" $pressed={buttons.R?.pressed} $touched={buttons.R?.touched} />

      {/* Face Buttons */}
      <g>
        <Button $color={colors.buttons} d="m 313.36,91.6 a 12.76,12.76 0 0 1 -9.49,15.35 12.76,12.76 0 0 1 -15.35,-9.49 12.76,12.76 0 0 1 9.49,-15.35 12.76,12.76 0 0 1 15.35,9.49 z" $pressed={buttons.X?.pressed} $touched={buttons.X?.touched} />
        <text fontSize="20px" x="300.5" y="96" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(colors.buttons || COLORS.BUTTON_DEFAULT)}>X</text>
        <Button $color={colors.buttons} d="m 282.18,119.57 a 12.76,12.76 0 0 1 -10.55,14.64 12.76,12.76 0 0 1 -14.64,-10.55 12.76,12.76 0 0 1 10.55,-14.64 12.76,12.76 0 0 1 14.64,10.55 z" $pressed={buttons.Y?.pressed} $touched={buttons.Y?.touched} />
        <text fontSize="20px" x="269.2" y="123" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(colors.buttons || COLORS.BUTTON_DEFAULT)}>Y</text>
        <Button $color={colors.buttons} d="m 341.49,112.5 a 12.76,12.76 0 0 1 0,18.04 12.76,12.76 0 0 1 -18.05,0 12.76,12.76 0 0 1 0,-18.04 12.76,12.76 0 0 1 18.05,0 z" $pressed={buttons.A?.pressed} $touched={buttons.A?.touched} />
        <text fontSize="20px" x="332.2" y="121.5" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(colors.buttons || COLORS.BUTTON_DEFAULT)}>A</text>
        <Button $color={colors.buttons} d="m 313.54,146.67 a 12.76,12.76 0 0 1 -10.55,14.64 12.76,12.76 0 0 1 -14.64,-10.55 12.76,12.76 0 0 1 10.55,-14.64 12.76,12.76 0 0 1 14.64,10.55 z" $pressed={buttons.B?.pressed} $touched={buttons.B?.touched} />
        <text fontSize="20px" x="300.5" y="150" dominantBaseline="middle" textAnchor="middle" fill={getContrastColor(colors.buttons || COLORS.BUTTON_DEFAULT)}>B</text>
      </g>

      {/* Center Buttons */}
      <g>
        <Button $color={colors.buttons} d="m 250.61,86.83 a 7.59,7.59 0 0 1 0,10.73 7.59,7.59 0 0 1 -10.73,0 7.59,7.59 0 0 1 0,-10.73 7.59,7.59 0 0 1 10.73,0 z" $pressed={buttons.Plus?.pressed} $touched={buttons.Plus?.touched} />
        <Button $color={colors.buttons} d="m 153.35,90.44 a 7.59,7.59 0 0 1 -5.64,9.13 7.59,7.59 0 0 1 -9.13,-5.64 7.59,7.59 0 0 1 5.64,-9.13 7.59,7.59 0 0 1 9.13,5.64 z" $pressed={buttons.Minus?.pressed} $touched={buttons.Minus?.touched} />
        <Button $color={colors.buttons} d="m 230.3,120.47 a 7.6,7.6 0 0 1 -6.28,8.72 7.6,7.6 0 0 1 -8.72,-6.28 7.6,7.6 0 0 1 6.28,-8.72 7.6,7.6 0 0 1 8.72,6.28 z" $pressed={buttons.Home?.pressed} $touched={buttons.Home?.touched} />
        <Button $color={colors.buttons} d="m 162.2,114.41 h 8.06 c 1.91,0 3.45,1.54 3.45,3.45 v 8.06 c 0,1.91 -1.54,3.45 -3.45,3.45 h -8.06 c -1.91,0 -3.45,-1.54 -3.45,-3.45 v -8.06 c 0,-1.91 1.54,-3.45 3.45,-3.45 z" $pressed={buttons.Capture?.pressed} $touched={buttons.Capture?.touched} />
      </g>

      {/* D-Pad */}
      <g>
        <path fill={colors.buttons || COLORS.BUTTON_DEFAULT} d="m 157.7,165.97 h -11.06 a 2.84,2.84 0 0 1 -2.84,-2.84 v -11.07 a 5.67,5.67 0 0 0 -5.67,-5.67 h -11.11 a 5.67,5.67 0 0 0 -5.67,5.67 v 11.06 a 2.84,2.84 0 0 1 -2.84,2.84 h -11.01 a 5.67,5.67 0 0 0 -5.67,5.67 v 11.11 a 5.67,5.67 0 0 0 5.67,5.67 h 11 a 2.84,2.84 0 0 1 2.84,2.84 v 11.06 a 5.67,5.67 0 0 0 5.67,5.67 h 11.11 a 5.67,5.67 0 0 0 5.67,-5.67 v -11.05 a 2.84,2.84 0 0 1 2.84,-2.84 h 11.07 a 5.67,5.67 0 0 0 5.67,-5.67 v -11.11 a 5.67,5.67 0 0 0 -5.67,-5.67 z" />
        <Button className="transparent" d="M121.85 146.33 H 138.63 V 168.75 H 121.85 Z" $pressed={buttons.Up?.pressed} $touched={buttons.Up?.touched} />
        <Button className="transparent" d="M121.85 185.53 H 138.63 V 207.95 H 121.85 Z" $pressed={buttons.Down?.pressed} $touched={buttons.Down?.touched} />
        <Button className="transparent" d="M102.33 165.91 H 124.75 V 182.69 H 102.33 Z" $pressed={buttons.Left?.pressed} $touched={buttons.Left?.touched} />
        <Button className="transparent" d="M135.71 165.91 H 158.13 V 182.69 H 135.71 Z" $pressed={buttons.Right?.pressed} $touched={buttons.Right?.touched} />
      </g>

      {/* Sticks */}
      <g>
        <path fill={COLORS.BUTTON_DEFAULT} d="m 115.48,119.19 a 32.6,32.6 0 0 1 -32.6,32.6 32.6,32.6 0 0 1 -32.6,-32.6 32.6,32.6 0 0 1 32.6,-32.6 32.6,32.6 0 0 1 32.6,32.6 z" />
        <g transform="translate(82.88, 119.19)">
          <Guide as="circle" r="25" $edgeReached={leftStickAtEdge} />
          <Guide d="M 0 -25 L 0 25 M -25 0 L 25 0" />
          <Stick r="25" {...sticks.left} />
        </g>
        <Button className="transparent" d="m 115.48,119.19 a 32.6,32.6 0 0 1 -32.6,32.6 32.6,32.6 0 0 1 -32.6,-32.6 32.6,32.6 0 0 1 32.6,-32.6 32.6,32.6 0 0 1 32.6,32.6 z" $pressed={buttons.LStick?.pressed} $touched={buttons.LStick?.touched} />

        <path fill={COLORS.BUTTON_DEFAULT} d="m 276.86,170.55 a 32.6,32.6 0 0 1 -24.24,39.22 32.6,32.6 0 0 1 -39.22,-24.24 32.6,32.6 0 0 1 24.24,-39.22 32.6,32.6 0 0 1 39.22,24.24 z" />
        <g transform="translate(245.24, 178.13)">
          <Guide as="circle" r="25" $edgeReached={rightStickAtEdge} />
          <Guide d="M 0 -25 L 0 25 M -25 0 L 25 0" />
          <Stick r="25" {...sticks.right} />
        </g>
        <Button className="transparent" d="m 276.86,170.55 a 32.6,32.6 0 0 1 -24.24,39.22 32.6,32.6 0 0 1 -39.22,-24.24 32.6,32.6 0 0 1 24.24,-39.22 32.6,32.6 0 0 1 39.22,24.24 z" $pressed={buttons.RStick?.pressed} $touched={buttons.RStick?.touched} />
      </g>
    </svg>
  );
};