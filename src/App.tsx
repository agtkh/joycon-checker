import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { LandingPage } from './components/LandingPage';
import { ControllerChecker } from './components/ControllerChecker';
import { useGamepad } from './hooks/useGamepad';
import { useGamepadStore } from './store/useGamepadStore';
import { useTranslation } from 'react-i18next';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const LanguageSwitcher = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  
  button {
    margin-left: 8px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

type Page = 'landing' | 'checker';

function App() {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  useGamepad(); // ゲームパッドの状態を監視
  const gamepads = useGamepadStore((state) => state.gamepads);

  // ゲームパッドが接続されたら自動でページを切り替える
  useEffect(() => {
    const hasConnectedGamepads = Object.keys(gamepads).length > 0;
    // 接続が確認できて、現在トップページならチェッカー画面に移動
    if (hasConnectedGamepads && currentPage === 'landing') {
      setCurrentPage('checker');
    }
  }, [gamepads, currentPage]);

  const handleStart = () => {
    setCurrentPage('checker');
  };

  const handleBack = () => {
    setCurrentPage('landing');
  };

  const changeLanguage = (lng: 'ja' | 'en') => {
    console.log(`Changing language to ${lng}`);
    i18n.changeLanguage(lng);
  };

  return (<>
    <LanguageSwitcher>
      <button onClick={() => changeLanguage('ja')} disabled={i18n.language === 'ja'}>日本語</button>
      <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>English</button>
    </LanguageSwitcher>
    <AppContainer>
      {currentPage === 'landing' ? (
        <LandingPage onStart={handleStart} />
      ) : (
        <ControllerChecker onBack={handleBack} />
      )}
    </AppContainer>
  </>);
}

const Root = () => (
  <>
    <GlobalStyle />
    <App />
  </>
);

export default Root;