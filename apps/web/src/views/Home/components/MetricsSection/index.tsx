import { Flex, ChartIcon, CommunityIcon, SwapIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import useSWRImmutable from 'swr/immutable'
import { IconCardData } from '../IconCard'

import styled from 'styled-components'
import { ChainTags } from './ChainTags'

const ImageLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  overflow: hidden;
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`
const BnbBallRocket = styled.div`
  position: absolute;
  left: -65px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    bottom: 151px;
    left: 20px;
  }
`
const EthBallRocket = styled.div`
  position: absolute;
  right: 0;
  top: 81px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    right: 0;
    bottom: -30px;
  }
`

const AptosBallRocket = styled.div`
  position: absolute;
  top: 0px;
  right: 98px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    top: 72px;
    right: 119px;
  }
`

const Stats = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isMobile, isSm, isMd, isXxl } = useMatchBreakpoints()
  const { data: tvl } = useSWRImmutable('tvl')
  const { data: txCount } = useSWRImmutable('totalTx30Days')
  const { data: addressCount } = useSWRImmutable('addressCount30Days')
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)
  const tvlString = tvl ? formatLocalisedCompactNumber(tvl) : '-'

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <img src="/images/homless.png" alt="homlesswap" width="150px" height="150px" />
      <p
        style={{
          margin: '16px ',
          padding: '8px 14px',
          fontSize: 'clamp(0.9rem, 1.3vw, 1.15rem)',
          fontWeight: '700',
          lineHeight: 1.3,
          textAlign: 'center',
          letterSpacing: '0.06em',
          color: '#5D57F7',
          textTransform: 'uppercase',
          textShadow: '0 0 16px rgba(93, 87, 247, 0.1)',
          borderRadius: '999px',
          border: '1px solid rgba(93, 87, 247, 0.18)',
          background: 'linear-gradient(180deg, rgba(93, 87, 247, 0.04), rgba(93, 87, 247, 0.08))',
          boxShadow: '0 8px 18px rgba(93, 87, 247, 0.05)',
        }}
      >
        <span
          style={{
            fontWeight: '700',
            color: '#5D57F7',
          }}
        >
          Homeless Wallet &amp; NFT{' '}
        </span>
        <span
          style={{
            fontStyle: 'italic',
            fontWeight: '800',
            color: '#756ef3',
            letterSpacing: '0.06em',
          }}
        >
          Coming Soon!
        </span>
      </p>
      <ChainTags />
    </Flex>
  )
}

export default Stats
