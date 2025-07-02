import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon,useMatchBreakpoints  } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import useSWRImmutable from 'swr/immutable'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'
import { ASSET_CDN } from 'config/constants/endpoints'
import Image from 'next/legacy/image'
import  styled  from 'styled-components'
import { ChainTags } from './ChainTags'
import { MetricsCard } from './MetricsCard'

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
    {/*   <GradientLogo height="48px" width="48px" mb="24px" /> */}

    <img
  src="/images/homless.png"
  alt="homlesswap"
  width="150px"
  height="150px"
  style={{ margin: '0 0 30px 0' }} // 12px vertical, 0 horizontal
/>
  



      <ChainTags />
{/*       <ImageLayer>
        <BnbBallRocket>
          <Image
            src={`${ASSET_CDN}/web/landing/bnb-ball-rocket.png`}
            alt="bnbBallRocket"
            width={144}
            height={168}
            unoptimized
          />
        </BnbBallRocket>
        <EthBallRocket>
          <Image
            src={`${ASSET_CDN}/web/landing/eth-ball-rocket.png`}
            alt="ethBallRocket"
            width={isXxl ? 116 : 70}
            height={isXxl ? 230 : 140}
            unoptimized
          />
        </EthBallRocket>
        <AptosBallRocket>
          <Image
            src={`${ASSET_CDN}/web/landing/aptos-ball-rocket.png`}
            alt="aptosBallRocket"
            width={isXxl ? 84 : 53}
            height={isXxl ? 101 : 64}
            unoptimized
          />
        </AptosBallRocket>
      </ImageLayer> */}

    {/*   <Flex maxWidth="100%" flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={"BnB"}
            bodyText={""}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={"Usdt"}
            bodyText={""}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={"Btc"}
            bodyText={""}
            highlightColor={theme.colors.failure}
          />
        </IconCard>
      </Flex> */}
    </Flex>
  )
}

export default Stats
