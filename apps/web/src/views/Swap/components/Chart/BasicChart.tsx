import { Box, ButtonMenu, ButtonMenuItem, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useState, memo, useMemo } from 'react'
import { useFetchPairPricesV3 } from 'state/swap/hooks'
import dynamic from 'next/dynamic'
import { PairDataTimeWindowEnum } from 'state/swap/types'
import NoChartAvailable from './NoChartAvailable'
import PairPriceDisplay from '../../../../components/PairPriceDisplay'
import { getTimeWindowChange } from './utils'

const SwapLineChart = dynamic(() => import('@pancakeswap/uikit/src/components/Chart/PairPriceChart'), {
  ssr: false,
})

// Mock veri: Grafiklerin çalışması için geçici veriler
const generateMockPriceData = (timeWindow: PairDataTimeWindowEnum) => {
  const now = Date.now()
  const dataPoints = []
  let points = 24 // 24 saat
  let interval = 60 * 60 * 1000 // 1 saat

  switch (timeWindow) {
    case PairDataTimeWindowEnum.WEEK:
      points = 168 // 7 gün * 24 saat
      interval = 60 * 60 * 1000 // 1 saat
      break
    case PairDataTimeWindowEnum.MONTH:
      points = 30 // 30 gün
      interval = 24 * 60 * 60 * 1000 // 1 gün
      break
    case PairDataTimeWindowEnum.YEAR:
      points = 52 // 52 hafta
      interval = 7 * 24 * 60 * 60 * 1000 // 1 hafta
      break
    default:
      break
  }

  // Trend belirleme - bazen yükseliş, bazen düşüş
  const trendDirection = Math.random() > 0.5 ? 1 : -1
  const trendStrength = 0.02 + Math.random() * 0.03 // %2-5 trend
  
  let currentPrice = 1.85 + Math.random() * 0.3 // Base fiyat ~1.85-2.15
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = now - (i * interval)
    
    // Trend + rastgele dalgalanma
    const trendChange = (trendDirection * trendStrength) * (1 - i / points) // Zamanla azalan trend
    const randomChange = (Math.random() - 0.5) * 0.08 // ±4% rastgele değişim
    const totalChange = trendChange + randomChange
    
    currentPrice = Math.max(0.1, currentPrice + totalChange) // Minimum 0.1
    
    dataPoints.push({
      time: new Date(timestamp),
      value: Number(currentPrice.toFixed(6)) // 6 decimals for precision
    })
  }

  return dataPoints
}

const BasicChart = ({
  token0Address,
  token1Address,
  isChartExpanded,
  inputCurrency,
  outputCurrency,
  isMobile,
  currentSwapPrice,
}) => {
  const [timeWindow, setTimeWindow] = useState<PairDataTimeWindowEnum>(0)
  const { t } = useTranslation()

  // API'den veri çekmeye çalış, ama başarısız olursa mock veri kullan
  const { data: realPairPrices = [], error, isLoading } = useFetchPairPricesV3({
    token0Address,
    token1Address,
    timeWindow,
    currentSwapPrice,
  })

  // Eğer API'den veri gelmezse veya hata varsa mock veri kullan
  const mockPairPrices = useMemo(() => generateMockPriceData(timeWindow), [timeWindow])
  const pairPrices = realPairPrices.length > 0 ? realPairPrices : mockPairPrices

  console.log('🔥 BasicChart - API Data:', realPairPrices.length, 'Mock Data:', mockPairPrices.length)
  console.log('🔥 BasicChart - Using:', pairPrices.length, 'data points')
  console.log('🔥 BasicChart - Error:', error)

  const [hoverValue, setHoverValue] = useState<number | undefined>()
  const [hoverDate, setHoverDate] = useState<string | undefined>()
  const valueToDisplay = hoverValue || pairPrices[pairPrices.length - 1]?.value
  
  const {
    changePercentage: changePercentageToCurrent,
    changeValue: changeValueToCurrent,
    isChangePositive: isChangePositiveToCurrent,
  } = useMemo(() => getTimeWindowChange(pairPrices), [pairPrices])

  const {
    changePercentage,
    changeValue,
    isChangePositive,
  } = useMemo(() => {
    if (!pairPrices || pairPrices.length < 2) {
      return {
        changePercentage: '0.00',
        changeValue: 0,
        isChangePositive: true,
      }
    }
    return hoverValue ? getTimeWindowChange(pairPrices) : {
      changePercentage: changePercentageToCurrent,
      changeValue: changeValueToCurrent,
      isChangePositive: isChangePositiveToCurrent,
    }
  }, [
    hoverValue,
    pairPrices,
    changePercentageToCurrent,
    changeValueToCurrent,
    isChangePositiveToCurrent,
  ])

  const currentDate = useMemo(
    () =>
      new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    [],
  )

  const chartHeight = isChartExpanded ? 'calc(100vh - 120px)' : '310px'

  // Eğer veri yoksa NoChartAvailable göster
  if (!pairPrices || pairPrices.length === 0) {
    return <NoChartAvailable token0Address={token0Address} token1Address={token1Address} pairAddress={null} isMobile={isMobile} />
  }

  return (
    <>
      <Flex
        flexDirection={['column', null, null, null, null, null, 'row']}
        alignItems={['flex-start', null, null, null, null, null, 'center']}
        justifyContent="space-between"
        px="24px"
        flexWrap="wrap"
      >
        <Flex flexDirection="column" pt="12px">
          <PairPriceDisplay
            value={pairPrices?.length > 0 && valueToDisplay}
            inputSymbol={inputCurrency?.symbol}
            outputSymbol={outputCurrency?.symbol}
          >
            <Text color={isChangePositive ? 'success' : 'failure'} fontSize="20px" ml="4px" bold>
              {`${isChangePositive ? '+' : ''}${changeValue.toFixed(3)} (${changePercentage}%)`}
            </Text>
          </PairPriceDisplay>
          <Text small color="secondary">
            {hoverDate || currentDate}
            {(error || realPairPrices.length === 0) && (
              <Text fontSize="10px" color="warning" mt="2px">
                📊 Demo Veri (API Bağlantı Sorunu)
              </Text>
            )}
          </Text>
        </Flex>
        <Box>
          <ButtonMenu activeIndex={timeWindow} onItemClick={setTimeWindow} scale="sm">
            <ButtonMenuItem>{t('24H')}</ButtonMenuItem>
            <ButtonMenuItem>{t('1W')}</ButtonMenuItem>
            <ButtonMenuItem>{t('1M')}</ButtonMenuItem>
            <ButtonMenuItem>{t('1Y')}</ButtonMenuItem>
          </ButtonMenu>
        </Box>
      </Flex>
      <Box height={isMobile ? '100%' : chartHeight} p={isMobile ? '0px' : '16px'} width="100%">
        <SwapLineChart
          data={pairPrices}
          setHoverValue={setHoverValue}
          setHoverDate={setHoverDate}
          isChangePositive={isChangePositiveToCurrent}
          isChartExpanded={isChartExpanded}
          timeWindow={timeWindow}
        />
      </Box>
    </>
  )
}

export default memo(BasicChart, (prev, next) => {
  return (
    prev.token0Address === next.token0Address &&
    prev.token1Address === next.token1Address &&
    prev.isChartExpanded === next.isChartExpanded &&
    prev.isMobile === next.isMobile &&
    prev.isChartExpanded === next.isChartExpanded &&
    ((prev.currentSwapPrice !== null &&
      next.currentSwapPrice !== null &&
      prev.currentSwapPrice[prev.token0Address] === next.currentSwapPrice[next.token0Address] &&
      prev.currentSwapPrice[prev.token1Address] === next.currentSwapPrice[next.token1Address]) ||
      (prev.currentSwapPrice === null && next.currentSwapPrice === null))
  )
})
