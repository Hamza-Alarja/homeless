import { ChainId, Token, WNATIVE } from '@pancakeswap/sdk'
import {
  bscTokens,
  bscTestnetTokens,
  BUSD,
  USDC,
  USDT,
  WBTC_ETH,
  arbitrumTokens,
  arbitrumGoerliTokens,
  ethereumTokens,
  polygonZkEvmTokens,
  polygonZkEvmTestnetTokens,
  zksyncTokens,
  zkSyncTestnetTokens,
  lineaTestnetTokens,
} from '@pancakeswap/tokens'

import { ChainMap, ChainTokenList } from '../types'

   export const SMART_ROUTER_ADDRESSES = {
  [ChainId.ETHEREUM]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.GOERLI]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.BSC]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.BSC_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ARBITRUM_ONE]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ARBITRUM_GOERLI]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.POLYGON_ZKEVM]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.POLYGON_ZKEVM_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ZKSYNC]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ZKSYNC_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.LINEA_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
} as const satisfies Record<ChainId, string>   


/*   export const SMART_ROUTER_ADDRESSES = {
  [ChainId.ETHEREUM]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.GOERLI]: '',
  [ChainId.BSC]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.BSC_TESTNET]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.ARBITRUM_ONE]: '',
  [ChainId.ARBITRUM_GOERLI]: '',
  [ChainId.POLYGON_ZKEVM]: '',
  [ChainId.POLYGON_ZKEVM_TESTNET]: '',
  [ChainId.ZKSYNC]: '',
  [ChainId.ZKSYNC_TESTNET]: '',
  [ChainId.LINEA_TESTNET]: '',
} as const satisfies Record<ChainId, string>   */


















   export const V2_ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.GOERLI]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.BSC]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.BSC_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ARBITRUM_ONE]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ARBITRUM_GOERLI]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.POLYGON_ZKEVM]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.POLYGON_ZKEVM_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ZKSYNC]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ZKSYNC_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.LINEA_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
}  





/*   export const V2_ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.GOERLI]: '',
  [ChainId.BSC]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.BSC_TESTNET]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.ARBITRUM_ONE]: '',
  [ChainId.ARBITRUM_GOERLI]: '',
  [ChainId.POLYGON_ZKEVM]: '',
  [ChainId.POLYGON_ZKEVM_TESTNET]: '',
  [ChainId.ZKSYNC]: '',
  [ChainId.ZKSYNC_TESTNET]: '',
  [ChainId.LINEA_TESTNET]: '',
} 
  */










  export const STABLE_SWAP_INFO_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.GOERLI]: '',
  [ChainId.BSC]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.BSC_TESTNET]: '0x3a9339308A93Bd43F3d8E5a6264a6B3516530Dc1',
  [ChainId.ARBITRUM_ONE]: '',
  [ChainId.ARBITRUM_GOERLI]: '',
  [ChainId.POLYGON_ZKEVM]: '',
  [ChainId.POLYGON_ZKEVM_TESTNET]: '',
  [ChainId.ZKSYNC]: '',
  [ChainId.ZKSYNC_TESTNET]: '',
  [ChainId.LINEA_TESTNET]: '', 
} 
 




/* 
  export const STABLE_SWAP_INFO_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.GOERLI]: '',
  [ChainId.BSC]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.BSC_TESTNET]: '0xdd027Ae9F499663BD6C8A487D07C1eE34C33157F',
  [ChainId.ARBITRUM_ONE]: '',
  [ChainId.ARBITRUM_GOERLI]: '',
  [ChainId.POLYGON_ZKEVM]: '',
  [ChainId.POLYGON_ZKEVM_TESTNET]: '',
  [ChainId.ZKSYNC]: '',
  [ChainId.ZKSYNC_TESTNET]: '',
  [ChainId.LINEA_TESTNET]: '',
}  
 */







// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.ETHEREUM]: [WNATIVE[ChainId.ETHEREUM], USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WBTC_ETH],
  [ChainId.GOERLI]: [WNATIVE[ChainId.GOERLI], USDC[ChainId.GOERLI], BUSD[ChainId.GOERLI]],
  [ChainId.BSC]: [
    bscTokens.wbnb,
    bscTokens.cake,
    bscTokens.busd,
    bscTokens.usdt,
    bscTokens.btcb,
    bscTokens.eth,
    bscTokens.usdc,
  ],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],
  [ChainId.ARBITRUM_ONE]: [arbitrumTokens.weth, arbitrumTokens.usdt, arbitrumTokens.usdc],
  [ChainId.ARBITRUM_GOERLI]: [arbitrumGoerliTokens.weth, arbitrumGoerliTokens.usdc],
  [ChainId.POLYGON_ZKEVM]: [polygonZkEvmTokens.weth, polygonZkEvmTokens.usdt],
  [ChainId.POLYGON_ZKEVM_TESTNET]: [polygonZkEvmTestnetTokens.weth, polygonZkEvmTestnetTokens.usdt],
  [ChainId.ZKSYNC]: [zksyncTokens.usdc, zksyncTokens.weth],
  [ChainId.ZKSYNC_TESTNET]: [zkSyncTestnetTokens.usdc, zkSyncTestnetTokens.weth],
  [ChainId.LINEA_TESTNET]: [lineaTestnetTokens.usdc, lineaTestnetTokens.weth],
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.BSC]: {
    // SNFTS-SFUND
    [bscTokens.snfts.address]: [bscTokens.sfund],

    [bscTokens.ankr.address]: [bscTokens.ankrbnb],
    [bscTokens.ankrbnb.address]: [bscTokens.ankrETH, bscTokens.ankr],
    [bscTokens.ankrETH.address]: [bscTokens.ankrbnb],

    // REVV - EDU
    [bscTokens.revv.address]: [bscTokens.edu],
    [bscTokens.edu.address]: [bscTokens.revv],
    // unshETH - USH
    [bscTokens.unshETH.address]: [bscTokens.ush],
    [bscTokens.ush.address]: [bscTokens.unshETH],

    [bscTokens.tusd.address]: [bscTokens.usdd],
    [bscTokens.usdd.address]: [bscTokens.tusd],
  },
  [ChainId.ETHEREUM]: {
    // alETH - ALCX
    [ethereumTokens.alcx.address]: [ethereumTokens.alETH],
    [ethereumTokens.alETH.address]: [ethereumTokens.alcx],

    // rETH - ETH
    [ethereumTokens.weth.address]: [ethereumTokens.rETH],
  },
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.BSC]: {
    [bscTokens.axlusdc.address]: [bscTokens.usdt],
  },
}
