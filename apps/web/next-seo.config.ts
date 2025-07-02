import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Homelesswap',
  defaultTitle: 'Homelesswap',
  description:
    'Cheaper and faster than Uniswap? Discover Homelesswap, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for HLS.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@Homelesswap',
    site: '@Homelesswap',
  },
  openGraph: {
    title: '🥞 Homelesswap - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description:
      'The most popular AMM on BSC by user count! Earn HLS through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by homelesswap), NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_8BYArhv9dxLYGs4aMl0HzzRSSPq6nPoptbXtPdzCK18voXO67IfBXUd9qTR0QayEQ0ebJSOWs5pBW9e1dOCNfroTP-gv1wyKNvgD2wBWoMBdW868SMYCN8bAAuZe7UEvzBD3L3_mlvhLq80GRHfoJpk6SsMHIIhrP6eJx9pVH-W4XOEnCu15AOvs/s320/k%C5%9F%C3%B6-removebg-preview%20(1).png' }],
  },
}
