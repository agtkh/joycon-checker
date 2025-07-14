import React from 'react';
import styled from 'styled-components';
import { useGamepadStore } from '../store/useGamepadStore';
import { JoyConRSVG } from './svg/JoyConRSVG'; // SVGコンポーネントをインポート

interface Props {
  gamepadIndex?: number;
  isPreview?: boolean;
}

const SvgContainer = styled.div<{ $isPreview?: boolean }>`
  svg {
    width: ${({ $isPreview }) => ($isPreview ? '150px' : '250px')};
    height: auto;
    transform: rotate(90deg); // 右Joy-Conは逆方向に回転
  }
`;

// Joy-Con(R) 横持ち時のボタンマッピング
export const JOYCON_R_SIDEWAYS_BUTTON_MAP = {
  A: 0, B: 2, X: 1, Y: 3,
  SL: 4, SR: 5, ZR: 7, R: 8,
  Plus: 9, Stick: 10, Home: 16,
};

export const JoyConR: React.FC<Props> = ({ gamepadIndex, isPreview = false }) => {
  const gamepad = !isPreview && typeof gamepadIndex === 'number'
    ? useGamepadStore((state) => state.gamepads[gamepadIndex])
    : null;

  const bodyColor = gamepad?.bodyColor; // ストアから色を取得

  if (!isPreview && !gamepad) return <div>Controller not found.</div>;

  const buttons = gamepad?.buttons || [];
  const map = JOYCON_R_SIDEWAYS_BUTTON_MAP;

  // propsに変換
  const svg_buttons = {
    A: buttons[map.A], B: buttons[map.B], X: buttons[map.X], Y: buttons[map.Y],
    Plus: buttons[map.Plus], Home: buttons[map.Home],
    R: buttons[map.R], ZR: buttons[map.ZR], SL: buttons[map.SL], SR: buttons[map.SR],
  };
  const svg_stick = gamepad?.axes[0] || { x: 0, y: 0 };

  return (
    <SvgContainer $isPreview={isPreview}>
      <JoyConRSVG buttons={svg_buttons} stick={svg_stick} bodyColor={bodyColor} isPreview={isPreview}/>
    </SvgContainer>
  );
};
