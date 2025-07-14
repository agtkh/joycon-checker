import React from 'react';
import styled from 'styled-components';
import { useGamepadStore } from '../store/useGamepadStore';
import { ProControllerSVG } from './svg/ProControllerSVG';

interface Props {
  gamepadIndex?: number;
  isPreview?: boolean;
}

const SvgContainer = styled.div<{ $isPreview?: boolean }>`
  svg {
    width: ${({ $isPreview }) => ($isPreview ? '250px' : '400px')};
    height: auto;
  }
`;

// W3C Standard Gamepad Mapping
export const PRO_CONTROLLER_BUTTON_MAP = {
  B: 0, A: 1, Y: 2, X: 3,
  L: 4, R: 5, ZL: 6, ZR: 7,
  Minus: 8, Plus: 9,
  LStick: 10, RStick: 11,
  Up: 12, Down: 13, Left: 14, Right: 15,
  Home: 16, Capture: 17,
};

export const ProController: React.FC<Props> = ({ gamepadIndex, isPreview = false }) => {
  const gamepad = !isPreview && typeof gamepadIndex === 'number'
    ? useGamepadStore((state) => state.gamepads[gamepadIndex])
    : null;

  if (!isPreview && !gamepad) {
    return <div>Controller not found.</div>;
  }

  const buttons = gamepad?.buttons || [];
  const map = PRO_CONTROLLER_BUTTON_MAP;

  const svg_buttons = {
    A: buttons[map.A], B: buttons[map.B], X: buttons[map.X], Y: buttons[map.Y],
    L: buttons[map.L], R: buttons[map.R], ZL: buttons[map.ZL], ZR: buttons[map.ZR],
    Minus: buttons[map.Minus], Plus: buttons[map.Plus],
    LStick: buttons[map.LStick], RStick: buttons[map.RStick],
    Up: buttons[map.Up], Down: buttons[map.Down], Left: buttons[map.Left], Right: buttons[map.Right],
    Home: buttons[map.Home], Capture: buttons[map.Capture],
  };

  const svg_sticks = {
    left: gamepad?.axes[0] || { x: 0, y: 0 },
    right: gamepad?.axes[1] || { x: 0, y: 0 },
  };

  // スティックが最大まで倒されているか判定
  const leftMagnitude = Math.sqrt(svg_sticks.left.x ** 2 + svg_sticks.left.y ** 2);
  const leftStickAtEdge = leftMagnitude >= 0.98;

  const rightMagnitude = Math.sqrt(svg_sticks.right.x ** 2 + svg_sticks.right.y ** 2);
  const rightStickAtEdge = rightMagnitude >= 0.98;

  const svg_colors = {
    body: gamepad?.bodyColor,
    buttons: gamepad?.buttonColor,
    leftGrip: gamepad?.leftGripColor,
    rightGrip: gamepad?.rightGripColor,
  };

  return (
    <SvgContainer $isPreview={isPreview}>
      <ProControllerSVG buttons={svg_buttons} sticks={svg_sticks} colors={svg_colors} isPreview={isPreview} leftStickAtEdge={leftStickAtEdge}
        rightStickAtEdge={rightStickAtEdge} />
    </SvgContainer>
  );
};