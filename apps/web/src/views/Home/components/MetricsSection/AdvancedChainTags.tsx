import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Link, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

const HeaderText = styled(Text)`
  text-align: center;
  margin-bottom: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(145deg, #131313ff, #ccaa028e);
    border-radius: 2px;
  }
`

const DexGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 40px;

  grid-template-columns: repeat(1, 1fr);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(4, 1fr);
  }
`

const DexCard = styled.div`
  position: relative;
  background: ${({ theme }) => (theme.isDark ? 'rgba(45, 45, 45, 0.8)' : 'rgba(255, 255, 255, 0.8)')};
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 2px solid ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => (theme.isDark ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 165, 0, 0.3)')};
  }
`

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(250, 250, 250, 0.8)')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};

  ${DexCard}:hover & {
    transform: scale(1.05);
  }
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const DexName = styled(Text)`
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  text-align: center;
`

const DexDescription = styled(Text)`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.5;
  flex-grow: 1;
`

const VisitButton = styled(Link)`
  background: ${({ theme }) => (theme.isDark ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 165, 0, 0.1)')};
  color: ${({ theme }) => (theme.isDark ? '#FFD700' : '#D18800')};
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 165, 0, 0.2)')};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${({ theme }) => (theme.isDark ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 165, 0, 0.2)')};
    text-decoration: none;
  }
`

// Filtered DEX Platform Data
const dexPlatforms = [
  {
    name: 'PinkSale',
    description: 'The launchpad protocol for everyone to create and launch their own tokens and projects.',
    url: 'https://www.pinksale.finance',
    logo: 'https://www.pinksale.finance/_next/static/media/ic-pinksale.61500ae2.svg',
    color: '#FF69B4',
  },
  {
    name: 'CoinGecko',
    description:
      'Get the latest crypto prices, market data, and insights from the world’s most comprehensive crypto tracker.',
    url: 'https://www.coingecko.com',
    logo: 'https://www.coingecko.com/favicon-96x96.png',
    color: '#4CAF50',
  },
  {
    name: 'GemPad',
    description: 'The most secure and transparent platform for token presales and launches.',
    url: 'https://www.gempad.app',
    logo: 'https://www.gempad.app/logo/logo.svg',
    color: '#6A5ACD',
  },
  {
    name: 'Dextools',
    description: 'Track crypto charts, analytics, and live data for all decentralized exchanges.',
    url: 'https://www.dextools.io',
    logo: 'https://assets.coingecko.com/coins/images/11603/standard/dext.png?1696511498',
    color: '#1E90FF',
  },
]

const AdvancedChainTags = () => {
  const { t } = useTranslation()

  const { isMobile } = useMatchBreakpoints()
  const [activeTab, setActiveTab] = useState('all')

  return (
    <Container>
      <HeaderText
        fontSize={isMobile ? '24px' : '32px'}
        style={{
          background: 'linear-gradient(90deg, #FFD700, #FFA500, #FF8C00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 10px rgba(255, 165, 0, 0.3)',
          position: 'relative',
          padding: '10px 0',
          marginBottom: '40px',
          letterSpacing: '0.5px',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: isMobile ? '20x' : '20px',
            marginBottom: '5px',
            textShadow: 'none',
            fontWeight: 'normal',
          }}
        >
          {t('Explore Other Platforms')}
        </span>
      </HeaderText>
      <DexGrid>
        {dexPlatforms.map((dex) => (
          <DexCard key={dex.name}>
            <CardContent>
              <IconWrapper>
                <LogoLink href={dex.url} external>
                  <img src={dex.logo} alt={`${dex.name} logo`} />
                </LogoLink>
              </IconWrapper>
              <DexName fontSize={isMobile ? '18px' : '20px'}>{dex.name}</DexName>
              <DexDescription>{dex.description}</DexDescription>
              <VisitButton href={dex.url} external>
                {t('Visit Website')}
              </VisitButton>
            </CardContent>
          </DexCard>
        ))}
      </DexGrid>
    </Container>
  )
}

export default AdvancedChainTags
