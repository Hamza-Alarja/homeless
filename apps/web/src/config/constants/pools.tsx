import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { bscTokens } from '@pancakeswap/tokens'

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto Homelesswap</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000n,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.png`,
      secondarySrc: '/images/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake Homelesswap</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 1100000n,
    tokenImage: {
      primarySrc: `/images/homless.png`,
      secondarySrc: '/images/homless.png',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible Homelesswap</Trans>,
    description: <Trans>Flexible staking on the side.</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 500000n,
    tokenImage: {
      primarySrc: `/images/homless.png`,
      secondarySrc: '/images/homless.png',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO Homeleswap',
    description: <Trans>Stake Homelesswap to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000n,
    tokenImage: {
      primarySrc: `/images/homless.png`,
      secondarySrc: `/images/homless.png`,
    },
  },
} as const
