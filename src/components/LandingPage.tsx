import { useState } from 'react';
import styled from 'styled-components';
import { TutorialModal } from './TutorialModal'; // TutorialModalをインポート

import { ProController } from './ProController';
import { JoyConPair } from './JoyConPair';
import { Footer } from './Footer';

import { useTranslation } from 'react-i18next';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #e0e0e0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #b0b0b0;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const StartButton = styled.button`
  background-color: #007acc;
  border: 1px solid #005a9e;
  padding: 12px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005a9e;
  }
`;

const SvgGallery = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #444;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #ccc;
    text-align: center;
  }
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

// ボタンを並べるためのコンテナ
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

interface Props {
  onStart: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  const { t } = useTranslation(); // t関数を取得
  const [showTutorial, setShowTutorial] = useState(false); // モーダルの表示状態
  return (
    <LandingContainer>
      <Title>{t('appTitle')}</Title>
      <Description>{t('landing.description')}</Description>

      <ButtonContainer>
        <StartButton onClick={onStart}>
          {t('landing.manualStart')}
        </StartButton>
        <StartButton onClick={() => setShowTutorial(true)}>
          {t('landing.howToConnect')}
        </StartButton>
      </ButtonContainer>

      <SvgGallery>
        {/* <h3>{t('landing.svgPreview')}</h3> */}
        <GalleryGrid>
          <ProController isPreview={true} />
          <JoyConPair isPreview={true} />
        </GalleryGrid>
      </SvgGallery>

      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      <Footer />
    </LandingContainer>
  );
};
