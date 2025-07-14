import React from 'react';
import styled from 'styled-components';
import { useGamepadStore } from '../store/useGamepadStore';
import { JoyConLSVG } from './svg/JoyConLSVG'; // SVGコンポーネントをインポート

interface Props {
  gamepadIndex?: number;
  isPreview?: boolean;
}

const SvgContainer = styled.div<{ $isPreview?: boolean }>`
  svg {
    width: ${({ $isPreview }) => ($isPreview ? '150px' : '250px')};
    height: auto;
    transform: rotate(-90deg); // 横持ち用の回転
  }
`;

// ボタンマップをexportする
export const JOYCON_L_SIDEWAYS_BUTTON_MAP = {
  Left: 0, Down: 1, Up: 2, Right: 3,
  SL: 4, SR: 5, 
  ZL: 6,
  L: 8,
  Minus: 9, 
  Stick: 10, Capture: 16,
};

export const JoyConL: React.FC<Props> = ({ gamepadIndex, isPreview = false }) => {
  const gamepad = !isPreview && typeof gamepadIndex === 'number'
    ? useGamepadStore((state) => state.gamepads[gamepadIndex])
    : null;
  const bodyColor = gamepad?.bodyColor; // ストアから色を取得

  if (!isPreview && !gamepad) return <div>Controller not found.</div>;
  
  const buttons = gamepad?.buttons || [];
  const map = JOYCON_L_SIDEWAYS_BUTTON_MAP;
  
  // propsに変換
  const svg_buttons = {
      Up: buttons[map.Up], Down: buttons[map.Down], Left: buttons[map.Left], Right: buttons[map.Right],
      Minus: buttons[map.Minus], Capture: buttons[map.Capture],
      L: buttons[map.L], ZL: buttons[map.ZL], SL: buttons[map.SL], SR: buttons[map.SR],
  };

  // 横持ちの場合、90度回転させるためにスティックの座標を調整
  // const svg_stick = gamepad?.axes[0] || { x: 0, y: 0 };
  const svg_stick = {
    x: -(gamepad?.axes[0].y || 0), // 横持ちではY軸がX軸に対応
    y: gamepad?.axes[0].x || 0, // Y軸は反転させる
  };

  // スティックが最大まで倒されているか判定
  const leftMagnitude = Math.sqrt(svg_stick.x ** 2 + svg_stick.y ** 2);
  const leftStickAtEdge = leftMagnitude >= 0.98;
  
  return (
    <SvgContainer $isPreview={isPreview}>
      <JoyConLSVG buttons={svg_buttons} stick={svg_stick} bodyColor={bodyColor} isPreview={isPreview} leftStickAtEdge={leftStickAtEdge} />
    </SvgContainer>
  );
};