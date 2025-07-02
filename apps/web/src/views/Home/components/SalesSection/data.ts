import { TranslateFunction } from '@pancakeswap/localization'
import { SalesSectionProps } from '.'

export const swapSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Trade anything. No registration, no hassle.'),
  bodyText: t('Trade any token on BNB Smart Chain in seconds, just by connecting your wallet.'),
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: t('Trade Now'),
    external: false,
  },
  secondaryButton: {
    to: '#',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/',
    attributes: [
      { src: 'homless', alt: t('homeleswap') },
      { src: 'homless', alt: t('homeleswap') },
      { src: 'homless', alt: t('homeleswap') },
    ],
  },
})

export const earnSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Earn passive income with crypto.'),
  bodyText: t('Homelesswap makes it easy to make your crypto work for you.'),
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: t('Explore'),
    external: false,
  },
  secondaryButton: {
    to: '#',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/',
    attributes: [
      { src: 'homless', alt: t('homeleswap') },
      { src: 'homless', alt: t('homeleswap') },
      { src: 'homless', alt: t('homeleswap') },
    ],
  },
})

export const cakeSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Homelesswap makes our world go round.'),
  bodyText: t(
    'Homeleswap token is at the heart of the Homeleswap ecosystem. Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it!',
  ),
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0x299F467665e1870A705099AA5a0F11520df026bC&chainId=56',
    text: t('Buy Homeleswap'),
    external: false,
  },
  secondaryButton: {
    to: '#',
    text: t('Learn'),
    external: true,
  },

  images: {
    path: '/images/',
    attributes: [
      { src: 'homless', alt: t('homeleswap') },
      { src: 'homless', alt: t('homeleswap') },
      { src: 'homless', alt: t('homeleswap') },
      { src: 'homless', alt: t('homeleswap') },
    ],
  },
})
