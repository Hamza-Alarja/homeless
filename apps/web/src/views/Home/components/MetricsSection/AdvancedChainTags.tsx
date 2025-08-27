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
    name: 'PancakeSwap',
    description: 'Trade, earn, and win crypto on the most popular decentralized platform in the world.',
    url: 'https://pancakeswap.finance',
    logo: 'https://assets.coingecko.com/coins/images/12632/standard/pancakeswap-cake-logo_%281%29.png?1696512440',
    color: '#D1884F',
  },
  {
    name: 'Uniswap',
    description: 'Swap, earn, and build on the leading decentralized crypto trading protocol.',
    url: 'https://app.uniswap.org',
    logo: 'https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669',
    color: '#FF007A',
  },
  {
    name: 'SushiSwap',
    description: 'Swap, earn, stack yields, lend, borrow, leverage all on one decentralized platform.',
    url: 'https://www.sushi.com/swap',
    logo: 'https://assets.coingecko.com/coins/images/12271/standard/512x512_Logo_no_chop.png?1696512101',
    color: '#FA52A0',
  },
  {
    name: 'DxSale',
    description: 'Discover the next generation of DeFi with decentralized exchange and token launches.',
    url: 'https://www.dx.app',
    logo: 'https://www.dx.app/logo.svg',
    color: '#6E89AE',
  },
]

const AdvancedChainTags = () => {
  const { t } = useTranslation()

  const { isMobile } = useMatchBreakpoints()
  const [activeTab, setActiveTab] = useState('all')

  return (
    <Container>
      <HeaderText
        variant="h1"
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
