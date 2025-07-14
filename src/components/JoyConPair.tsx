import React from 'react';
import styled from 'styled-components';
import { useGamepadStore } from '../store/useGamepadStore';
import { JoyConLSVG } from './svg/JoyConLSVG';
import { JoyConRSVG } from './svg/JoyConRSVG';

interface Props {
  gamepadIndex?: number;
  isPreview?: boolean;
}

const PairContainer = styled.div<{ $isPreview?: boolean }>`
  display: flex;
  gap: ${({ $isPreview }) => $isPreview ? '10px' : '20px'};
  align-items: center;
  justify-content: center;
`;

const SvgWrapper = styled.div<{ $isPreview?: boolean }>`
  svg {
    width: ${({ $isPreview }) => $isPreview ? '100px' : '150px'};
    height: auto;
  }
`;

export const JOYCON_PAIR_BUTTON_MAP = {
  // Right-hand cluster
  A: 1, B: 0, X: 3, Y: 2,
  // Shoulders
  L: 4, R: 5, ZL: 6, ZR: 7,
  // Center cluster
  Minus: 8, Plus: 9,
  // Stick presses
  LStick: 10, RStick: 11,
  // D-Pad
  Up: 12, Down: 13, Left: 14, Right: 15,
  // Misc
  Home: 16, Capture: 17,
  LSR: 19, LSL: 18,
  RSR: 21, RSL: 20
};


export const JoyConPair: React.FC<Props> = ({ gamepadIndex, isPreview = false }) => {
  const gamepad = !isPreview && typeof gamepadIndex === 'number'
    ? useGamepadStore((state) => state.gamepads[gamepadIndex])
    : null;
  
  const buttons = gamepad?.buttons || [];
  const map = JOYCON_PAIR_BUTTON_MAP;
  
  // ゲームパッドの状態から、各SVGコンポーネントに渡すpropsを生成
  const l_buttons = {
    ZL: buttons[map.ZL], L: buttons[map.L], Minus: buttons[map.Minus],
    Up: buttons[map.Up], Down: buttons[map.Down], Left: buttons[map.Left], Right: buttons[map.Right],
    Capture: buttons[map.Capture],
    SR: buttons[map.LSR], SL: buttons[map.LSL]
  };
  const l_stick = gamepad?.axes[0] || { x: 0, y: 0 };

  const r_buttons = {
      ZR: buttons[map.ZR], R: buttons[map.R], Plus: buttons[map.Plus],
      A: buttons[map.A], B: buttons[map.B], X: buttons[map.X], Y: buttons[map.Y],
      Home: buttons[map.Home],
      SR: buttons[map.RSR], SL: buttons[map.RSL],
  };
  const r_stick = gamepad?.axes[1] || { x: 0, y: 0 };

  // スティックが最大まで倒されているか判定 (新規追加)
  const leftMagnitude = Math.sqrt(l_stick.x ** 2 + l_stick.y ** 2);
  const leftStickAtEdge = leftMagnitude >= 0.98;

  const rightMagnitude = Math.sqrt(r_stick.x ** 2 + r_stick.y ** 2);
  const rightStickAtEdge = rightMagnitude >= 0.98;

  if (!isPreview && !gamepad) return <div>Controller not found.</div>;

  return (
    <PairContainer $isPreview={isPreview}>
      <SvgWrapper $isPreview={isPreview}>
        <JoyConLSVG buttons={l_buttons} stick={l_stick} isPreview={isPreview} leftStickAtEdge={leftStickAtEdge} />
      </SvgWrapper>
      <SvgWrapper $isPreview={isPreview}>
        <JoyConRSVG buttons={r_buttons} stick={r_stick} isPreview={isPreview} rightStickAtEdge={rightStickAtEdge} />
      </SvgWrapper>
    </PairContainer>
  );
};