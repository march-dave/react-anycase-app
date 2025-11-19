import React, { useState } from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  background: linear-gradient(to right, #667eea, #764ba2);
  color: #fff;
  padding: 1rem 2rem;
  text-align: center;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const BannerContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BannerText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;

  strong {
    font-weight: 700;
  }
`;

const ReadMoreLink = styled.a`
  color: #fff;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const PromotionalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <BannerContainer>
      <BannerContent>
        <BannerText>
          Try Claude Code on the web, on us. We've added <strong>$1,000</strong> in free usage credits to your account, applied automatically. Use before November 23.{' '}
          <ReadMoreLink href="https://claude.ai" target="_blank" rel="noopener noreferrer">
            Read more
          </ReadMoreLink>
        </BannerText>
      </BannerContent>
      <CloseButton onClick={() => setIsVisible(false)} aria-label="Close banner">
        &times;
      </CloseButton>
    </BannerContainer>
  );
};

export default PromotionalBanner;
