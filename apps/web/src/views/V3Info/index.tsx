import { useTranslation } from '@pancakeswap/localization'
import { AutoColumn, Box, Button, Card, Heading, Text } from '@pancakeswap/uikit'
import isUndefinedOrNull from '@pancakeswap/utils/isUndefinedOrNull'
import Page from 'components/Layout/Page'
import dayjs from 'dayjs'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useTheme from 'hooks/useTheme'
import { useEffect, useMemo, useState } from 'react'
import BarChart from './components/BarChart/alt'
import { DarkGreyCard } from './components/Card'
import LineChart from './components/LineChart/alt'
import Percent from './components/Percent'
import PoolTable from './components/PoolTable'
import { RowBetween, RowFixed } from './components/Row'
import TokenTable from './components/TokenTable'
import TransactionsTable from './components/TransactionsTable'
import { ChartCardsContainer, MonoSpace, ProtocolWrapper } from './components/shared'
import {
  useProtocolChartData,
  useProtocolData,
  useProtocolTransactionData,
  useTopPoolsData,
  useTopTokensData,
} from './hooks'
import { useTransformedVolumeData } from './hooks/chart'
import { unixToDate } from './utils/date'
import { formatDollarAmount } from './utils/numbers'
import { VolumeWindow } from './types'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { theme } = useTheme()
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()

  const protocolData = useProtocolData()
  const transactionData = useProtocolTransactionData()
  const topTokensData = useTopTokensData()
  const topPoolsData = useTopPoolsData()
  const chartData = useProtocolChartData()

  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [leftLabel, setLeftLabel] = useState<string | undefined>()
  const [rightLabel, setRightLabel] = useState<string | undefined>()
  const now = dayjs()

  useEffect(() => {
    setLiquidityHover(undefined)
    setVolumeHover(undefined)
  }, [chainId])

  // Chart data formatting
  const formattedTvlData = useMemo(() => {
    if (chartData?.length > 0) {
      return chartData.map(day => ({
        time: unixToDate(day.date),
        value: day.tvlUSD,
      }))
    }
    // Mock data for Homeless token
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      const baseValue = 45000000
      const randomVariation = (Math.random() - 0.5) * 0.2
      const trendValue = baseValue * (1 + i * 0.005)
      return {
        time: unixToDate(Math.floor(date.getTime() / 1000)),
        value: trendValue * (1 + randomVariation)
      }
    })
  }, [chartData])

  const formattedVolumeData = useMemo(() => {
    if (chartData?.length > 0) {
      return chartData.map(day => ({
        time: unixToDate(day.date),
        value: day.volumeUSD,
      }))
    }
    // Mock volume data for Homeless token
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      const baseVolume = 2200000
      const randomVariation = (Math.random() - 0.5) * 0.4
      const weekendFactor = [0, 6].includes(date.getDay()) ? 0.7 : 1.0
      return {
        time: unixToDate(Math.floor(date.getTime() / 1000)),
        value: baseVolume * weekendFactor * (1 + randomVariation)
      }
    })
  }, [chartData])

const weeklyVolumeData = useTransformedVolumeData(chartData, 'week');
const monthlyVolumeData = useTransformedVolumeData(chartData, 'month');
  const [volumeWindow, setVolumeWindow] = useState<VolumeWindow>(VolumeWindow.daily)

  // Token data with logo support
  const formattedTokens = useMemo(() => {
    const homelessTokenData = {
      exists: true,
      name: 'Homeless Token',
      symbol: 'HLS',
      address: '0x299F467665e1870A705099AA5a0F11520df026bC',
      decimals: 18,
      volumeUSD: 2500000,
      volumeUSDChange: 15.5,
      volumeUSDWeek: 17500000,
      txCount: 1250,
      feesUSD: 125000,
      tvlToken: 1111111111,
      tvlUSD: 50000000,
      tvlUSDChange: 8.2,
      priceUSD: 0.045,
      priceUSDChange: 12.8,
      priceUSDChangeWeek: 35.2,
      // Ensure logo will be resolved automatically
      chainId,
    }

    const tokens = [homelessTokenData]
    
    if (topTokensData) {
      tokens.push(
        ...Object.values(topTokensData)
          .filter(d => !isUndefinedOrNull(d) && d.tvlUSD > 0)
          .filter(d => d.address.toLowerCase() !== homelessTokenData.address.toLowerCase())
          .map(d => ({ ...d, chainId })) // Ensure chainId is set for all tokens
      )
    }
    
    return tokens
  }, [topTokensData, chainId])

  // Pool data with logo support
  const poolDatas = useMemo(() => {
    const homelessToken = {
      name: 'Homeless Token',
      symbol: 'HLS',
      address: '0x299F467665e1870A705099AA5a0F11520df026bC',
      decimals: 18,
      derivedETH: 0.000072,
      chainId, // Important for logo resolution
    }

    const homelessBnbPool = {
      address: '0x123456789012345678901234567890123456789a',
      feeTier: 2500,
      token0: homelessToken,
      token1: {
        name: 'Wrapped BNB',
        symbol: 'WBNB',
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        decimals: 18,
        derivedETH: 1.0,
        chainId,
      },
      liquidity: 555555555,
      sqrtPrice: 0.21213203,
      tick: -52368,
      volumeUSD: 1500000,
      volumeUSDChange: 18.3,
      volumeUSDWeek: 10500000,
      tvlUSD: 25000000,
      tvlUSDChange: 12.1,
      token0Price: 0.045,
      token1Price: 620.5,
      tvlToken0: 277777777,
      tvlToken1: 20161,
      feeUSD: 75000
    }

    const homelessUsdtPool = {
      address: '0x123456789012345678901234567890123456789b',
      feeTier: 500,
      token0: homelessToken,
      token1: {
        name: 'Tether USD',
        symbol: 'USDT',
        address: '0x55d398326f99059fF775485246999027B3197955',
        decimals: 18,
        derivedETH: 0.0016,
        chainId,
      },
      liquidity: 333333333,
      sqrtPrice: 0.21213203,
      tick: -52368,
      volumeUSD: 800000,
      volumeUSDChange: 22.7,
      volumeUSDWeek: 5600000,
      tvlUSD: 15000000,
      tvlUSDChange: 9.8,
      token0Price: 0.045,
      token1Price: 1.001,
      tvlToken0: 166666666,
      tvlToken1: 7492507,
      feeUSD: 40000
    }

    const pools = [homelessBnbPool, homelessUsdtPool]
    
    if (topPoolsData) {
      pools.push(
        ...Object.values(topPoolsData)
          .filter(p => !isUndefinedOrNull(p))
          .filter(p => {
            const token0Addr = p.token0?.address?.toLowerCase() || ''
            const token1Addr = p.token1?.address?.toLowerCase() || ''
            const homelessAddr = homelessToken.address.toLowerCase()
            return token0Addr !== homelessAddr && token1Addr !== homelessAddr
          })
          .map(p => ({
            ...p,
            token0: p.token0 ? { ...p.token0, chainId } : undefined,
            token1: p.token1 ? { ...p.token1, chainId } : undefined,
          }))
      )
    }
    
    return pools
  }, [topPoolsData, chainId])

  const tvlValue = useMemo(() => (
    formatDollarAmount(liquidityHover, 2, true)
  ), [liquidityHover])

  const enhancedProtocolData = useMemo(() => (
    protocolData || {
      tvlUSD: 65000000,
      tvlUSDChange: 9.8,
      volumeUSD: 3200000,
      volumeUSDChange: 16.2,
      feesUSD: 160000,
      feeChange: 18.5
    }
  ), [protocolData])

  useEffect(() => {
    if (liquidityHover === undefined && enhancedProtocolData) {
      setLiquidityHover(enhancedProtocolData.tvlUSD)
    }
  }, [liquidityHover, enhancedProtocolData])

  return (
    <Page>
      <Heading scale="lg" mb="16px" color="#FFD700">
        {t('Homelesswap Info & Analytics')}
      </Heading>
      
      <ChartCardsContainer>
        <Card>
          <LineChart
            data={formattedTvlData}
            height={220}
            minHeight={332}
            value={liquidityHover}
            label={leftLabel}
            setValue={setLiquidityHover}
            setLabel={setLeftLabel}
            topLeft={
              <AutoColumn gap="4px">
                <Text fontSize="16px">{t('TVL')}</Text>
                <Text fontSize="32px">
                  <MonoSpace>{tvlValue}</MonoSpace>
                </Text>
                <Text fontSize="12px" height="14px">
                  <MonoSpace>{leftLabel ?? now.format('MMM D, YYYY')} (UTC)</MonoSpace>
                </Text>
              </AutoColumn>
            }
          />
        </Card>

        <Card>
          <BarChart
            height={200}
            minHeight={332}
            data={
              volumeWindow === VolumeWindow.monthly
                ? monthlyVolumeData
                : volumeWindow === VolumeWindow.weekly
                ? weeklyVolumeData
                : formattedVolumeData
            }
            color={theme.colors.primary}
            setValue={setVolumeHover}
            setLabel={setRightLabel}
            value={volumeHover}
            label={rightLabel}
            activeWindow={volumeWindow as unknown as VolumeWindow}
            topRight={
              <RowFixed style={{ marginLeft: '-40px', marginTop: '8px' }}>
                <Button
                  scale="sm"
                  variant={volumeWindow === VolumeWindow.daily ? 'primary' : 'bubblegum'}
                  onClick={() => setVolumeWindow(VolumeWindow.daily)}
                >
                  D
                </Button>
                <Button
                  scale="sm"
                  variant={volumeWindow === VolumeWindow.weekly ? 'primary' : 'bubblegum'}
                  style={{ marginLeft: '8px' }}
                  onClick={() => setVolumeWindow(VolumeWindow.weekly)}
                >
                  W
                </Button>
                <Button
                  variant={volumeWindow === VolumeWindow.monthly ? 'primary' : 'bubblegum'}
                  scale="sm"
                  style={{ marginLeft: '8px' }}
                  onClick={() => setVolumeWindow(VolumeWindow.monthly)}
                >
                  M
                </Button>
              </RowFixed>
            }
            topLeft={
              <AutoColumn gap="4px">
                <Text fontSize="16px">{t('Volume')}</Text>
                <Text fontSize="32px">
                  <MonoSpace>
                    {volumeHover
                      ? formatDollarAmount(volumeHover)
                      : formatDollarAmount(formattedVolumeData[formattedVolumeData.length - 1]?.value, 2)}
                  </MonoSpace>
                </Text>
                <Text fontSize="12px" height="14px">
                  <MonoSpace>{rightLabel ?? now.format('MMM D, YYYY')} (UTC)</MonoSpace>
                </Text>
              </AutoColumn>
            }
          />
        </Card>
      </ChartCardsContainer>

      <ProtocolWrapper>
        <DarkGreyCard>
          <RowBetween>
            <RowFixed>
              <RowFixed mr="20px">
                <Text mr="4px">{t('Volume 24H')}: </Text>
                <Text mr="4px" color="#FFD700">
                  {formatDollarAmount(enhancedProtocolData?.volumeUSD)}
                </Text>
                <Percent value={enhancedProtocolData?.volumeUSDChange} wrap />
              </RowFixed>
              <RowFixed mr="20px">
                <Text mr="4px">{t('Fees 24H')}: </Text>
                <Text mr="4px" color="#FFD700">
                  {formatDollarAmount(enhancedProtocolData?.feesUSD)}
                </Text>
                <Percent value={enhancedProtocolData?.feeChange} wrap />
              </RowFixed>
              <Box>
                <RowFixed mr="20px">
                  <Text mr="4px">{t('TVL')}: </Text>
                  <Text mr="4px" color="#FFD700">
                    {formatDollarAmount(enhancedProtocolData?.tvlUSD)}
                  </Text>
                  <Percent value={enhancedProtocolData?.tvlUSDChange} wrap />
                </RowFixed>
              </Box>
            </RowFixed>
          </RowBetween>
        </DarkGreyCard>
      </ProtocolWrapper>

      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Tokens')}
      </Heading>
      <TokenTable tokenDatas={formattedTokens} />

      <Heading scale="lg" mt="40px" mb="16px">
        {t('Top Pairs')}
      </Heading>
      <PoolTable poolDatas={poolDatas} />

      <Heading scale="lg" mt="40px" mb="16px">
        {t('Transactions')}
      </Heading>
      {transactionData?.length > 0 ? (
        <TransactionsTable transactions={transactionData} />
      ) : (
        <TransactionsTable transactions={[]} />
      )}
    </Page>
  )
}