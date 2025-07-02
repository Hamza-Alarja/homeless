import { useIntersectionObserver } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { bscTokens } from '@pancakeswap/tokens'
import { Balance, Flex, Heading, Skeleton, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { formatBigInt, formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import { cakeVaultV2ABI } from '@pancakeswap/pools'
import { SLOW_INTERVAL } from 'config/constants'
import { useEffect, useState } from 'react'
import { usePriceCakeUSD } from 'state/farms/hooks'
import styled from 'styled-components'
import useSWR from 'swr'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import { publicClient } from 'utils/wagmi'
import { useCakeEmissionPerBlock } from 'views/Home/hooks/useCakeEmissionPerBlock'
import { erc20ABI } from 'wagmi'

const StyledColumn = styled(Flex)<{ noMobileBorder?: boolean; noDesktopBorder?: boolean }>`
  flex-direction: column;
  ${({ noMobileBorder, theme }) =>
    noMobileBorder
      ? `${theme.mediaQueries.md} {
           padding: 0 16px;
           border-left: 1px ${theme.colors.inputSecondary} solid;
         }
       `
      : `border-left: 1px ${theme.colors.inputSecondary} solid;
         padding: 0 8px;
         ${theme.mediaQueries.sm} {
           padding: 0 16px;
         }
       `}

  ${({ noDesktopBorder, theme }) =>
    noDesktopBorder &&
    `${theme.mediaQueries.md} {
           padding: 0;
           border-left: none;
         }
       `}
`

const Grid = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-gap: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
  margin-top: 24px;
  grid-template-columns: ${({ isMobile }) => (isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)')};
  grid-template-areas: ${({ isMobile }) =>
    isMobile
      ? `'a d'
         'b e'
         'c f'`
      : `'a b c'
         'd e f'`};
`

const MobileGridItem = styled(Flex)<{ area: string }>`
  grid-area: ${({ area }) => area};
  flex-direction: column;
  padding: 12px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
`

const DesktopGridItem = styled(Flex)<{ area: string }>`
  grid-area: ${({ area }) => area};
  flex-direction: column;
`

const CakeDataRow = () => {
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const emissionsPerBlock = useCakeEmissionPerBlock(loadData)
  const { isMobile } = useMatchBreakpoints()

  const {
    data: { cakeSupply, burnedBalance, circulatingSupply } = {
      cakeSupply: 0,
      burnedBalance: 0,
      circulatingSupply: 0,
    },
  } = useSWR(
    loadData ? ['cakeDataRow'] : null,
    async () => {
      const [totalSupply, burned, totalLockedAmount] = await publicClient({ chainId: ChainId.BSC }).multicall({
        contracts: [
          { abi: erc20ABI, address: bscTokens.cake.address, functionName: 'totalSupply' },
          {
            abi: erc20ABI,
            address: bscTokens.cake.address,
            functionName: 'balanceOf',
            args: ['0x000000000000000000000000000000000000dEaD'],
          },
          {
            abi: cakeVaultV2ABI,
            address: cakeVaultAddress,
            functionName: 'totalLockedAmount',
          },
        ],
        allowFailure: false,
      })
      const totalBurned = planetFinanceBurnedTokensWei + burned
      const circulating = totalSupply - (totalBurned + totalLockedAmount)

      return {
        cakeSupply: totalSupply && burned ? +formatBigInt(totalSupply - totalBurned) : 0,
        burnedBalance: burned ? +formatBigInt(totalBurned) : 0,
        circulatingSupply: circulating ? +formatBigInt(circulating) : 0,
      }
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
  const cakePriceBusd = usePriceCakeUSD()
  const mcap = cakePriceBusd.times(circulatingSupply)
  const mcapString = formatLocalisedCompactNumber(mcap.toNumber())

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  const GridItem = isMobile ? MobileGridItem : DesktopGridItem

  return (
    <Grid isMobile={isMobile}>
      <GridItem area="a">
        <Text color="textSubtle" fontSize={isMobile ? '14px' : '16px'} mb={isMobile ? '4px' : '8px'}>
          {t('Total Supply')}
        </Text>
        {circulatingSupply ? (
          <Balance decimals={0} lineHeight="1.1" fontSize={isMobile ? '18px' : '24px'} bold value={1000000000} />
        ) : (
          <Skeleton height={24} width={isMobile ? '100%' : 126} my="4px" />
        )}
      </GridItem>

      <GridItem area="b">
        <Text color="textSubtle" fontSize={isMobile ? '14px' : '16px'} mb={isMobile ? '4px' : '8px'}>
          {t('Token Decimal')}
        </Text>
        {cakeSupply ? (
          <Balance decimals={0} lineHeight="1.1" fontSize={isMobile ? '18px' : '24px'} bold value={18} />
        ) : (
          <>
            <div ref={observerRef} />
            <Skeleton height={24} width={isMobile ? '100%' : 126} my="4px" />
          </>
        )}
      </GridItem>

      <GridItem area="c">
        <Text color="textSubtle" fontSize={isMobile ? '14px' : '16px'} mb={isMobile ? '4px' : '8px'}>
          {t('PRESALE 40%')}
        </Text>
        {isMobile ? (
          <Text bold fontSize="18px">
            400,000,000
          </Text>
        ) : (
          <Text bold fontSize="24px">
            400,000,000
          </Text>
        )}
      </GridItem>

      <GridItem area="d">
        <Text color="textSubtle" fontSize={isMobile ? '14px' : '16px'} mb={isMobile ? '4px' : '8px'}>
          {t('LIQUIDITY 27%')}
        </Text>
        {mcap?.gt(0) && mcapString ? (
          <Text bold fontSize={isMobile ? '16px' : '20px'}>
            274,400,000
          </Text>
        ) : (
          <Skeleton height={24} width={isMobile ? '100%' : 126} my="4px" />
        )}
      </GridItem>

      <GridItem area="e">
        <Text color="textSubtle" fontSize={isMobile ? '14px' : '16px'} mb={isMobile ? '4px' : '8px'}>
          {t('TOKEN SALE 33%')}
        </Text>
        {burnedBalance ? (
          <Text bold fontSize={isMobile ? '16px' : '20px'}>
            400,000,000
          </Text>
        ) : (
          <Skeleton height={24} width={isMobile ? '100%' : 126} my="4px" />
        )}
      </GridItem>

      <GridItem area="f">
        <Text color="textSubtle" fontSize={isMobile ? '14px' : '16px'} mb={isMobile ? '4px' : '8px'}>
          {t('CONTRACT')}
        </Text>
        {emissionsPerBlock ? (
          <Text bold fontSize={isMobile ? '12px' : '16px'} style={{ wordBreak: 'break-all' }}>
            {'0x299F467665e1870A705099AA5a0F11520df026bC'}
          </Text>
        ) : (
          <Skeleton height={24} width={isMobile ? '100%' : 126} my="4px" />
        )}
      </GridItem>
    </Grid>
  )
}

const planetFinanceBurnedTokensWei = 637407922445268000000000n
const cakeVaultAddress = getCakeVaultAddress()

export default CakeDataRow
