import { useMemo } from 'react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGamepadStore } from '../store/useGamepadStore';
import { ProController, PRO_CONTROLLER_BUTTON_MAP } from './ProController';
import { JoyConPair, JOYCON_PAIR_BUTTON_MAP } from './JoyConPair';
import { JoyConL, JOYCON_L_SIDEWAYS_BUTTON_MAP } from './JoyConL';
import { JoyConR, JOYCON_R_SIDEWAYS_BUTTON_MAP } from './JoyConR';
import { usePrevious } from '../hooks/usePrevious'; // 作成したフックをインポート
import { ButtonLog } from './ButtonLog'; // ログ表示コンポーネントをインポート
import { SettingsModal } from './SettingsModal';
import { useTranslation } from 'react-i18next';
import { Footer } from './Footer';

const CheckerContainer = styled.div`
  width: 100%;
`;

const Header = styled.header`
    margin-bottom: 2rem;
`;

const ControllerContainer = styled.div`
    min-height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`;

const Button = styled.button`
    background-color: #007acc;
    border: 1px solid #005a9e;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    color: white;
    margin: 0 10px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #005a9e;
    }
`;

const ControllerInfo = styled.div`
    margin-bottom: 1rem;
    color: #ccc;
`;


const getControllerType = (id: string): 'Pro' | 'JoyConPair' | 'JoyConL' | 'JoyConR' | 'Unknown' => {
  const lowerId = id.toLowerCase();
  if (lowerId.includes('joy-con (l/r)')) return 'JoyConPair';
  if (lowerId.includes('joy-con (l+r)')) return 'JoyConPair';
  if (lowerId.includes('joy-con l/r')) return 'JoyConPair';
  if (lowerId.includes('joy-con l+r')) return 'JoyConPair';
  if (lowerId.includes('pro controller')) return 'Pro';
  if (lowerId.includes('joy-con (l)')) return 'JoyConL';
  if (lowerId.includes('joy-con (r)')) return 'JoyConR';
  if (lowerId.includes('joy-con l')) return 'JoyConL';
  if (lowerId.includes('joy-con r')) return 'JoyConR';
  return 'Unknown';
}

export const ControllerChecker: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation();

  const gamepads = useGamepadStore((state) => state.gamepads);
  const resetTouchedState = useGamepadStore((state) => state.resetTouchedState);
  const connectedGamepads = Object.values(gamepads);

  // const [showTutorial, setShowTutorial] = useState(false);
  const [selectedGamepadIndex, setSelectedGamepadIndex] = useState<number | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // モーダルの表示状態を管理

  const selectedGamepad = selectedGamepadIndex !== null ? gamepads[selectedGamepadIndex] : null;

  useEffect(() => {
    if (selectedGamepadIndex === null && connectedGamepads.length > 0) {
      setSelectedGamepadIndex(connectedGamepads[0].index);
    } else if (connectedGamepads.length === 0) {
      setSelectedGamepadIndex(null);
    }
  }, [connectedGamepads, selectedGamepadIndex]);

  const controllerType = useMemo(() => selectedGamepad ? getControllerType(selectedGamepad.id) : 'Unknown', [selectedGamepad]);

  const renderController = () => {
    if (!selectedGamepad) {
      return <p>{t('checker.connectPrompt')}</p>;
    }
    const type = getControllerType(selectedGamepad.id);
    switch (type) {
      case 'Pro':
        return <ProController gamepadIndex={selectedGamepad.index} />;
      case 'JoyConPair':
        return <JoyConPair gamepadIndex={selectedGamepad.index} />;
      // case 'JoyConR':
      case 'JoyConL':
        return <JoyConL gamepadIndex={selectedGamepad.index} />;
      case 'JoyConR':
        return <JoyConR gamepadIndex={selectedGamepad.index} />;
      default:
        // 認識されたが不明なコントローラーのIDを画面に表示する
        return <p>{t('checker.unsupported')} <br/> {selectedGamepad.id}</p>;
    }
  }

  // const setGamepadColor = useGamepadStore((state) => state.setGamepadColor);

  const logButtonPush = useGamepadStore((state) => state.logButtonPush);
  const currentButtons = selectedGamepad?.buttons || [];
  const prevButtons = usePrevious(currentButtons);

  // ボタンが押された瞬間を検知する副作用
  useEffect(() => {
    if (!prevButtons || !currentButtons.length) return;

    // 現在のコントローラータイプに応じたボタンマップを取得
    let currentButtonMap = {};
    switch (controllerType) {
      case 'JoyConPair': currentButtonMap = JOYCON_PAIR_BUTTON_MAP; break;
      case 'Pro': currentButtonMap = PRO_CONTROLLER_BUTTON_MAP; break;
      case 'JoyConL': currentButtonMap = JOYCON_L_SIDEWAYS_BUTTON_MAP; break;
      case 'JoyConR': currentButtonMap = JOYCON_R_SIDEWAYS_BUTTON_MAP; break;
    }
    const reverseButtonMap = Object.fromEntries(
      Object.entries(currentButtonMap).map(([name, index]) => [index, name])
    );

    // 各ボタンの状態を比較
    currentButtons.forEach((button, index) => {
      // 直前のフレームで押されておらず、現在のフレームで押されている場合
      if (button.pressed && !prevButtons[index]?.pressed) {
        const buttonName = reverseButtonMap[index] || `Button ${index}`;
        logButtonPush(buttonName);
      }
    });
  }, [currentButtons, prevButtons, controllerType, logButtonPush]);

  return (
    <CheckerContainer>
      <Header>
        <h1>{t('checker.title')}</h1>
      </Header>

      <ControllerInfo>
        {selectedGamepad ? t('checker.connected', { id: selectedGamepad.id }) : t('checker.notConnected')}
      </ControllerInfo>

      <ControllerContainer>
        {renderController()}
      </ControllerContainer>

      <ButtonLog />

      <div>
        <Button onClick={onBack}>{t('checker.backToTop')}</Button>
        <Button onClick={() => setIsSettingsOpen(true)} disabled={!selectedGamepad}>
          {t('checker.settings')}
        </Button>
        <Button onClick={() => selectedGamepad && resetTouchedState(selectedGamepad.index)} disabled={!selectedGamepad}>
          {t('checker.reset')}
        </Button>
      </div>

      {isSettingsOpen && selectedGamepad && (
        <SettingsModal gamepad={selectedGamepad} onClose={() => setIsSettingsOpen(false)} />
      )}
      <Footer />
    </CheckerContainer>
  );
}