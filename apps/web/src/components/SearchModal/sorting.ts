import { Token, getTokenComparator } from '@pancakeswap/sdk'
import { useMemo } from 'react'

function useTokenComparator(inverted: boolean): (tokenA: Token, tokenB: Token) => number {
  // Avoid registering listeners for all token balances here — fetching
  // balances for the entire token list can trigger hundreds of balanceOf
  // multicall requests and overwhelm RPC nodes. Use an empty balances
  // object so sorting falls back to deterministic ordering.
  const comparator = useMemo(() => getTokenComparator({}), [])
  return useMemo(() => {
    if (inverted) {
      return (tokenA: Token, tokenB: Token) => comparator(tokenA, tokenB) * -1
    }
    return comparator
  }, [inverted, comparator])
}

export default useTokenComparator
