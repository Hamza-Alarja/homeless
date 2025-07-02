import styles from './style.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Flex, Heading, Text, useMatchBreakpoints } from '@pancakeswap/uikit'

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([])
  const { isMobile } = useMatchBreakpoints()

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 15,
            page: 1,
            sparkline: false,
          },
        })
        setCryptoData(response.data)
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error)
      }
    }

    fetchCryptoData()
  }, [])

  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        <Heading mb="20px" scale="xl" color="white">
          Trending Coins
        </Heading>

        <div className={styles.mobileList}>
          {cryptoData.map((coin) => (
            <div key={coin.id} className={styles.mobileCard}>
              <Flex alignItems="center" justifyContent="space-between" mb="8px">
                <Flex alignItems="center">
                  <img src={coin.image} alt={coin.name} className={styles.mobileImage} />
                  <div className={styles.mobileNameContainer}>
                    <Text bold className={styles.mobileName}>
                      {coin.name}
                    </Text>
                    <Text fontSize="12px" color="textSubtle">
                      {coin.symbol.toUpperCase()}
                    </Text>
                  </div>
                </Flex>
                <Text bold>${coin.current_price.toLocaleString()}</Text>
              </Flex>

              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="12px">24h Change:</Text>
                <Text fontSize="12px" className={coin.price_change_percentage_24h >= 0 ? styles.green : styles.red}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <Heading mb="20px" scale="xl" color="white">
        Trending Coins
      </Heading>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Symbol</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Price (USD)</th>
              <th className={styles.th}>Market Cap</th>
              <th className={styles.th}>24h %</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin) => (
              <tr key={coin.id}>
                <td className={styles.td}>{coin.name}</td>
                <td className={styles.td}>{coin.symbol.toUpperCase()}</td>
                <td className={styles.td}>
                  <img src={coin.image} alt={coin.name} className={styles.image} />
                </td>
                <td className={styles.td}>${coin.current_price.toLocaleString()}</td>
                <td className={styles.td}>${(coin.market_cap / 1000000).toFixed(2)}M</td>
                <td className={`${styles.td} ${coin.price_change_percentage_24h >= 0 ? styles.green : styles.red}`}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CryptoTable
