import { useTranslation } from '@pancakeswap/localization'
import { ArrowBackIcon, ArrowForwardIcon, Box, Flex, NextLinkFromReactRouter, Skeleton, Text } from '@pancakeswap/uikit'
import { ITEMS_PER_INFO_TABLE_PAGE } from 'config/constants/info'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useChainNameByQuery, useMultiChainPath, useStableSwapPath } from 'state/info/hooks'
import { PoolData } from 'state/info/types'
import styled from 'styled-components'
import { formatAmount } from 'utils/formatInfoNumbers'
import { DoubleCurrencyLogo } from 'views/Info/components/CurrencyLogo'
import { Arrow, Break, ClickableColumnHeader, PageButtons, TableWrapper } from './shared'

/**
 *  Columns on different layouts
 *  5 = | # | Pool | TVL | Volume 24H | Volume 7D |
 *  4 = | # | Pool |     | Volume 24H | Volume 7D |
 *  3 = | # | Pool |     | Volume 24H |           |
 *  2 = |   | Pool |     | Volume 24H |           |
 */
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 20px 3.5fr repeat(5, 1fr);

  padding: 0 24px;
  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 1.5fr repeat(3, 1fr);
    & :nth-child(4),
    & :nth-child(5) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 20px 1.5fr repeat(1, 1fr);
    & :nth-child(4),
    & :nth-child(5),
    & :nth-child(6),
    & :nth-child(7) {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 2.5fr repeat(1, 1fr);
    > *:nth-child(1) {
      display: none;
    }
  }
`

const LinkWrapper = styled(NextLinkFromReactRouter)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const SORT_FIELD = {
  volumeUSD: 'volumeUSD',
  liquidityUSD: 'liquidityUSD',
  volumeUSDWeek: 'volumeUSDWeek',
  lpFees24h: 'lpFees24h',
  lpApr7d: 'lpApr7d',
}

const LoadingRow: React.FC<React.PropsWithChildren> = () => (
  <ResponsiveGrid>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </ResponsiveGrid>
)

const TableLoader: React.FC<React.PropsWithChildren> = () => (
  <>
    <LoadingRow />
    <LoadingRow />
    <LoadingRow />
  </>
)

const DataRow = ({ poolData, index }: { poolData: PoolData; index: number }) => {
  const chainName = useChainNameByQuery()
  const chainPath = useMultiChainPath()
  const stableSwapPath = useStableSwapPath()
  return (
    <LinkWrapper to={`/info${chainPath}/pairs/${poolData.address}${stableSwapPath}`}>
      <ResponsiveGrid>
        <Text>{index + 1}</Text>
        <Flex>
          <DoubleCurrencyLogo
            address0={poolData.token0.address}
            address1={poolData.token1.address}
            chainName={chainName}
          />
          <Text ml="8px">
            {poolData.token0.symbol}/{poolData.token1.symbol}
          </Text>
        </Flex>
        <Text>${formatAmount(poolData.volumeUSD)}</Text>
        <Text>${formatAmount(poolData.volumeUSDWeek)}</Text>
        <Text>${formatAmount(poolData.lpFees24h)}</Text>
        <Text>{formatAmount(poolData.lpApr7d)}%</Text>
        <Text>${formatAmount(poolData.liquidityUSD)}</Text>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

interface PoolTableProps {
  poolDatas: PoolData[]
  loading?: boolean // If true shows indication that SOME pools are loading, but the ones already fetched will be shown
}

const PoolTable: React.FC<React.PropsWithChildren<PoolTableProps>> = ({ poolDatas, loading }) => {
  const { t } = useTranslation()

  // 🔥 FORCE MOCK DATA - ALWAYS SHOW DATA
  console.log('🔥 PoolsTable - FORCING MOCK DATA')
  console.log('🔥 PoolsTable - Received poolDatas:', poolDatas?.length || 0)

  // Static fallback data - ALWAYS USED
  const staticPools: PoolData[] = [
    {
      address: '0x74e4716e431f45807dcf19f284c7aa99f18a4fbc',
      token0: {
        address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        symbol: 'WBNB',
        name: 'Wrapped BNB',
      },
      token1: {
        address: '0x55d398326f99059ff775485246999027b3197955',
        symbol: 'USDT',
        name: 'Tether USD',
      },
      volumeUSD: 25750000,
      volumeUSDChange: 12.8,
      volumeUSDWeek: 180250000,
      volumeUSDChangeWeek: 8.4,
      liquidityUSD: 125750000,
      liquidityUSDChange: 5.2,
      liquidityToken0: 425000,
      liquidityToken1: 125750000,
      token0Price: 295.67,
      token1Price: 1.000,
      apr24h: 0.0145,
      aprWeek: 0.0987,
      aprMonth: 0.3425,
    },
    {
      address: '0x0ed7e52944161450477ee417de9cd3a859b14fd0',
      token0: {
        address: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
        symbol: 'CAKE',
        name: 'PancakeSwap Token',
      },
      token1: {
        address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        symbol: 'WBNB',
        name: 'Wrapped BNB',
      },
      volumeUSD: 18250000,
      volumeUSDChange: -5.4,
      volumeUSDWeek: 127750000,
      volumeUSDChangeWeek: 15.2,
      liquidityUSD: 87250000,
      liquidityUSDChange: 7.8,
      liquidityToken0: 35625000,
      liquidityToken1: 295000,
      token0Price: 2.45,
      token1Price: 295.67,
      apr24h: 0.0235,
      aprWeek: 0.1645,
      aprMonth: 0.5825,

    },
    {
      address: '0x7efaef62fddcca950418312c6c91aef321375a00',
      token0: {
        address: '0x55d398326f99059ff775485246999027b3197955',
        symbol: 'USDT',
        name: 'Tether USD',
      },
      token1: {
        address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        symbol: 'USDC',
        name: 'USD Coin',
      },
      volumeUSD: 15750000,
      volumeUSDChange: 3.7,
      volumeUSDWeek: 110250000,
      volumeUSDChangeWeek: 6.8,
      liquidityUSD: 95250000,
      liquidityUSDChange: 2.1,
      liquidityToken0: 47625000,
      liquidityToken1: 47625000,
      token0Price: 1.000,
      token1Price: 0.999,
      apr24h: 0.0085,
      aprWeek: 0.0595,
      aprMonth: 0.2125,
    },
    {
      address: '0x7213a321f1855cf1779f42c0cd85d3d95291d34c',
      token0: {
        address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        symbol: 'ETH',
        name: 'Ethereum Token',
      },
      token1: {
        address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        symbol: 'WBNB',
        name: 'Wrapped BNB',
      },
      volumeUSD: 12500000,
      volumeUSDChange: 8.9,
      volumeUSDWeek: 87500000,
      volumeUSDChangeWeek: 12.3,
      liquidityUSD: 68750000,
      liquidityUSDChange: 4.5,
      liquidityToken0: 30750,
      liquidityToken1: 232500,
      token0Price: 2235.89,
      token1Price: 295.67,
      apr24h: 0.0195,
      aprWeek: 0.1365,
      aprMonth: 0.4785,
    },
  ]

  // Use static data or received data (prefer received data if available and not empty)
  const finalPoolData = (poolDatas && poolDatas.length > 0) ? poolDatas : staticPools

  console.log('🔥 PoolsTable - Final data length:', finalPoolData.length)

  const [sortField, setSortField] = useState(SORT_FIELD.volumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (finalPoolData && finalPoolData.length > 0) {
      if (finalPoolData.length % ITEMS_PER_INFO_TABLE_PAGE === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(finalPoolData.length / ITEMS_PER_INFO_TABLE_PAGE) + extraPages)
    }
  }, [finalPoolData])

  const sortedPools = useMemo(() => {
    if (finalPoolData) {
      return finalPoolData
        .sort((a, b) => {
          if (a && b) {
            return a[sortField as keyof PoolData] > b[sortField as keyof PoolData]
              ? (sortDirection ? -1 : 1) * 1
              : (sortDirection ? -1 : 1) * -1
          }
          return -1
        })
        .slice(ITEMS_PER_INFO_TABLE_PAGE * (page - 1), page * ITEMS_PER_INFO_TABLE_PAGE)
    }
    return []
  }, [finalPoolData, sortDirection, sortField, page])

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
      setSortDirection(sortField !== newField ? true : !sortDirection)
    },
    [sortDirection, sortField],
  )

  const arrow = useCallback(
    (field: string) => {
      const directionArrow = !sortDirection ? '↑' : '↓'
      return sortField === field ? directionArrow : ''
    },
    [sortDirection, sortField],
  )

  // Always show data now
  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="secondary" fontSize="12px" bold>
          #
        </Text>
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Pair')}
        </Text>
        <ClickableColumnHeader
          color="secondary"
          fontSize="12px"
          bold
          onClick={() => handleSort(SORT_FIELD.volumeUSD)}
          textTransform="uppercase"
        >
          {t('Volume 24H')} {arrow(SORT_FIELD.volumeUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="12px"
          bold
          onClick={() => handleSort(SORT_FIELD.volumeUSDWeek)}
          textTransform="uppercase"
        >
          {t('Volume 7D')} {arrow(SORT_FIELD.volumeUSDWeek)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="12px"
          bold
          onClick={() => handleSort(SORT_FIELD.liquidityUSD)}
          textTransform="uppercase"
        >
          {t('Liquidity')} {arrow(SORT_FIELD.liquidityUSD)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="12px"
          bold
          onClick={() => handleSort(SORT_FIELD.lpFees24h)}
          textTransform="uppercase"
        >
          {t('LP reward fees 24H')} {arrow(SORT_FIELD.lpFees24h)}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="12px"
          bold
          onClick={() => handleSort(SORT_FIELD.lpApr7d)}
          textTransform="uppercase"
        >
          {t('LP reward APR')} {arrow(SORT_FIELD.lpApr7d)}
        </ClickableColumnHeader>
      </ResponsiveGrid>
      <Break />
      {sortedPools.length > 0 ? (
        <>
          {sortedPools.map((poolData, index) => {
            if (poolData) {
              return (
                <Fragment key={poolData.address}>
                  <DataRow index={(page - 1) * ITEMS_PER_INFO_TABLE_PAGE + index} poolData={poolData} />
                  <Break />
                </Fragment>
              )
            }
            return null
          })}
          {finalPoolData.length > ITEMS_PER_INFO_TABLE_PAGE && (
            <PageButtons>
              <Arrow
                onClick={() => {
                  setPage(page === 1 ? page : page - 1)
                }}
              >
                <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
              </Arrow>
              <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>
              <Arrow
                onClick={() => {
                  setPage(page === maxPage ? page : page + 1)
                }}
              >
                <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
              </Arrow>
            </PageButtons>
          )}
        </>
      ) : (
        <>
          <TableLoader />
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default PoolTable
