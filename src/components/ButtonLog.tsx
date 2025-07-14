import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useGamepadStore } from '../store/useGamepadStore';
import { useTranslation } from 'react-i18next';

// キーフレームアニメーションは変更なし
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// LogContainerのスタイルを全面的に更新
const LogContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 2rem auto; /* 上下の要素との間に余白を設ける */
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2); /* 背景色を少し薄く */
  border: 1px solid #444;
  border-radius: 8px;
  min-height: 65px; /* ログがない時でも高さを確保 */
  
  display: flex;
  flex-direction: row;
  justify-content: center; /* アイテムを中央揃えに */
  align-items: center;
  gap: 10px;
  flex-wrap: wrap; /* 画面幅に応じて折り返す */
`;

const LogItem = styled.div`
  background-color: #333;
  color: #fff;
  padding: 8px 15px;
  border-radius: 20px; /* 角を丸くしてタグのような見た目に */
  font-weight: bold;
  animation: ${fadeIn} 0.3s ease-out;
  white-space: nowrap;
  border: 1px solid #555;
`;

export const ButtonLog: React.FC = () => {
  const buttonLog = useGamepadStore((state) => state.buttonPressLog);
  const { t } = useTranslation();

  return (
    <LogContainer>
      {buttonLog.length > 0 ? (
        buttonLog.map((log) => (
          <LogItem key={log.id}>{log.name}</LogItem>
        ))
      ) : (
        <span style={{ color: '#888' }}>{t('checker.buttonLogStart')}</span>
      )}
    </LogContainer>
  );
};