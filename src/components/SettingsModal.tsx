import React from 'react';
import styled from 'styled-components';
import { useGamepadStore } from '../store/useGamepadStore';
import type { GamepadState } from '../store/useGamepadStore'; // 型をインポート

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #3c3c3c;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: left;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  label {
    margin-right: 1rem;
  }

  input[type="color"] {
    -webkit-appearance: none;
    width: 80px;
    height: 40px;
    border: none;
    background: none;
    cursor: pointer;
    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    &::-webkit-color-swatch {
        border: 1px solid #555;
        border-radius: 4px;
    }
  }
`;

interface Props {
  gamepad: GamepadState;
  onClose: () => void;
}

export const SettingsModal: React.FC<Props> = ({ gamepad, onClose }) => {
  const { setGamepadColor } = useGamepadStore();
  const isProController = gamepad.id.toLowerCase().includes('pro controller');

  const handleColorChange = (part: 'body' | 'buttons' | 'leftGrip' | 'rightGrip', value: string) => {
    setGamepadColor(gamepad.index, {
      bodyColor: part === 'body' ? value : gamepad.bodyColor || '',
      buttonColor: part === 'buttons' ? value : gamepad.buttonColor || '',
      leftGripColor: part === 'leftGrip' ? value : gamepad.leftGripColor || '',
      rightGripColor: part === 'rightGrip' ? value : gamepad.rightGripColor || '',
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>カラー設定</h2>
        <SettingRow>
          <label htmlFor="bodyColor">本体の色</label>
          <input type="color" id="bodyColor" value={gamepad.bodyColor || '#000000'} onChange={(e) => handleColorChange('body', e.target.value)} />
        </SettingRow>
        <SettingRow>
          <label htmlFor="buttonColor">ボタンの色</label>
          <input type="color" id="buttonColor" value={gamepad.buttonColor || '#000000'} onChange={(e) => handleColorChange('buttons', e.target.value)} />
        </SettingRow>

        {/* Proコントローラーの場合のみグリップ設定を表示 */}
        {isProController && (
          <>
            <SettingRow>
              <label htmlFor="leftGripColor">左グリップの色</label>
              <input type="color" id="leftGripColor" value={gamepad.leftGripColor || '#000000'} onChange={(e) => handleColorChange('leftGrip', e.target.value)} />
            </SettingRow>
            <SettingRow>
              <label htmlFor="rightGripColor">右グリップの色</label>
              <input type="color" id="rightGripColor" value={gamepad.rightGripColor || '#000000'} onChange={(e) => handleColorChange('rightGrip', e.target.value)} />
            </SettingRow>
          </>
        )}

      </ModalContent>
    </ModalOverlay>
  );
};
