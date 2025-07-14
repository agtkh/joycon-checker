import React, { useState } from 'react';
import styled from 'styled-components';
import { getOS } from '../utils/os';
import { useTranslation } from 'react-i18next';
import type { OSType } from '../utils/os';

// スタイル定義
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
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  text-align: left;
`;

const CloseButton = styled.button`
  float: right;
`;

const OsTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #555;
  margin-bottom: 15px;
`;

const OsTab = styled.button<{ $active: boolean }>`
  padding: 10px 15px;
  border: none;
  background-color: ${({ $active }) => $active ? '#555' : 'transparent'};
  color: white;
  cursor: pointer;
  font-size: 1em;
`;

const Content = styled.div`
    line-height: 1.6;
    h3 {
        margin-top: 0;
    }
    img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
    }
`;


const PairingGuide: React.FC<{ os: OSType }> = ({ os }) => {
  const { t } = useTranslation();
  switch (os) {
    case 'Windows':
      return (
        <Content>
          <h3>{t('tutorial.guide.windows.title')}</h3>
          <p>{t('tutorial.guide.windows.step1')}</p>
          <p>{t('tutorial.guide.windows.step2')}</p>
          <p>{t('tutorial.guide.windows.step3')}</p>
          <p>{t('tutorial.guide.windows.step4')}</p>
        </Content>
      );
    case 'iPadOS':
      return (
        <Content>
          <h3>{t('tutorial.guide.ipad.title')}</h3>
          <p>{t('tutorial.guide.ipad.step1')}</p>
          <p>{t('tutorial.guide.ipad.step2')}</p>
          <p>{t('tutorial.guide.ipad.step3')}</p>
          <p>{t('tutorial.guide.ipad.step4')}</p>
        </Content>
      );
    case 'Mac':
      return (
        <Content>
          <h3>{t('tutorial.guide.mac.title')}</h3>
          <p>{t('tutorial.guide.mac.step1')}</p>
          <p>{t('tutorial.guide.mac.step2')}</p>
          <p>{t('tutorial.guide.mac.step3')}</p>
          <p>{t('tutorial.guide.mac.step4')}</p>
        </Content>
      );
    default:
      return <Content><p>{t('tutorial.guide.unknown')}</p></Content>
  }
}


export const TutorialModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeOs, setActiveOs] = useState<OSType>(getOS());
  const { t } = useTranslation();
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{t('tutorial.title')}</h2>
        <OsTabs>
          <OsTab $active={activeOs === 'Windows'} onClick={() => setActiveOs('Windows')}>{t('tutorial.windows')}</OsTab>
          <OsTab $active={activeOs === 'iPadOS'} onClick={() => setActiveOs('iPadOS')}>{t('tutorial.ipad')}</OsTab>
          <OsTab $active={activeOs === 'Mac'} onClick={() => setActiveOs('Mac')}>{t('tutorial.mac')}</OsTab>
        </OsTabs>
        <PairingGuide os={activeOs} />
      </ModalContent>
    </ModalOverlay>
  );
};
