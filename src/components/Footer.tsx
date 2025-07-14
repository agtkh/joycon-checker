import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 800px;
  text-align: center;
  margin: 2rem auto 1rem auto;
  padding: 1rem;
  color: #888;
  font-size: 0.9rem;
  border-top: 1px solid #444;

  a {
    color: #00aaff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Disclaimer = styled.p`
  margin: 0.5rem 0;
`;

const Author = styled.p`
  margin: 0.5rem 0;
`;


export const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <FooterContainer>
            <Disclaimer>{t('footer.disclaimer')}</Disclaimer>
            <Author>
                {t('footer.author')} | <a href="https://github.com/agtkh" target="_blank" rel="noopener noreferrer">GitHub</a>
            </Author>
        </FooterContainer>
    );
};