import { useEffect, useRef } from 'react';
import { useGamepadStore } from '../store/useGamepadStore';

export const useGamepad = () => {
  const { addGamepad, removeGamepad, updateGamepadState } = useGamepadStore();
  const animationFrameId = useRef<number>();

  // コントローラーの状態をポーリングする関数
  const pollGamepads = () => {
    const gamepads = navigator.getGamepads();
    // getGamepads()は疎な配列を返すことがあるため、filter(Boolean)でnullを除外
    for (const gamepad of gamepads.filter(Boolean)) {
        updateGamepadState(gamepad);
    }
    animationFrameId.current = requestAnimationFrame(pollGamepads);
  };

  useEffect(() => {
    // 接続イベント
    const handleGamepadConnected = (event: GamepadEvent) => {
      console.log('Gamepad connected:', event.gamepad);
      addGamepad(event.gamepad);
    };

    // 切断イベント
    const handleGamepadDisconnected = (event: GamepadEvent) => {
      console.log('Gamepad disconnected:', event.gamepad);
      removeGamepad(event.gamepad.index);
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // 既存の接続済みコントローラーをスキャン
    const initialGamepads = navigator.getGamepads().filter(Boolean);
    initialGamepads.forEach(addGamepad);
    
    // ポーリング開始
    pollGamepads();

    // クリーンアップ関数
    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [addGamepad, removeGamepad, updateGamepadState]);
};