import { Token } from '@pancakeswap/sdk'
import { TokenLogo } from '@pancakeswap/uikit'
import { useMemo } from 'react'
import { multiChainId, MultiChainName } from 'state/info/constant'
import styled from 'styled-components'
import { isAddress } from 'utils'
import { Address } from 'viem'
import getTokenLogoURL from '../../../../utils/getTokenLogoURL'

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: #faf9fa;
  color: ${({ theme }) => theme.colors.text};
`

export const CurrencyLogo: React.FC<
  React.PropsWithChildren<{
    address?: string
    token?: Token
    size?: string
    chainName?: MultiChainName
    logoURI?: string
  }>
> = ({ address, size = '24px', chainName = 'BSC', logoURI, ...rest }) => {
  const src = useMemo(() => {
    return getTokenLogoURL(new Token(multiChainId[chainName], address as Address, 18, ''))
  }, [address, chainName])

  const imagePath = chainName === 'BSC' ? '' : `${chainName?.toLowerCase()}/`
  const checkedSumAddress = isAddress(address)
  const srcFromPCS = checkedSumAddress
    ? `https://tokens.pancakeswap.finance/images/${imagePath}${checkedSumAddress}.png`
    : ''

  // Build srcs with explicit logoURI first (if provided), then pancakeswap CDN, then generated src
  const srcs = logoURI ? [logoURI, srcFromPCS, src] : [srcFromPCS, src]
  return <StyledLogo size={size} srcs={srcs} alt="token logo" useFilledIcon {...rest} />
}

const DoubleCurrencyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 32px;
`

interface DoubleCurrencyLogoProps {
  address0?: string
  address1?: string
  size?: number
  chainName?: MultiChainName
  logoURI0?: string
  logoURI1?: string
}

export const DoubleCurrencyLogo: React.FC<React.PropsWithChildren<DoubleCurrencyLogoProps>> = ({
  address0,
  address1,
  size = 16,
  chainName = 'BSC',
  logoURI0,
  logoURI1,
}) => {
  return (
    <DoubleCurrencyWrapper>
      {address0 && (
        <CurrencyLogo address={address0} size={`${size.toString()}px`} chainName={chainName} logoURI={logoURI0} />
      )}
      {address1 && (
        <CurrencyLogo address={address1} size={`${size.toString()}px`} chainName={chainName} logoURI={logoURI1} />
      )}
    </DoubleCurrencyWrapper>
  )
}
