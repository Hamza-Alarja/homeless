import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { bscTokens } from '@pancakeswap/tokens'

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto Homeleswap</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 380000n,
    tokenImage: {
      primarySrc: `/images/tokens/${bscTokens.cake.address}.png`,
      secondarySrc: '/images/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake Homeleswap</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 1100000n,
    tokenImage: {
      primarySrc: `/images/homless.png`,
      secondarySrc: '/images/homless.png',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible Homeleswap</Trans>,
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
    description: <Trans>Stake Homeleswap to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 500000n,
    tokenImage: {
      primarySrc: `/images/homless.png`,
      secondarySrc: `/images/homless.png`,
    },
  },
} as const
