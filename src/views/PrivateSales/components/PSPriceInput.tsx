import React from 'react'
import styled from 'styled-components'
import { Text, InputProps, Flex } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber } from 'utils/formatBalance'
import tokens from 'config/constants/tokens'
import BigNumber from 'bignumber.js'
import { Input as NumericalInput } from './NumericalInput'

interface PSPriceInputProps {
  enabled: boolean
  price: number
  min: string
  max: string
  symbol: string
  onChange: (string) => void
  value: string
  usdcBalance: BigNumber
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 8px;
  width: 100%;
  min-width: 300px;
  @media screen and (max-width: 400px) {
    min-width: calc(100vw - 105px);
  }
`

const DescText = styled(Text)`
  font-size: 10px;
  @media screen and (max-width: 400px) {
    font-size: 9px;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const PSPriceInput: React.FC<PSPriceInputProps> = ({
  enabled,
  min,
  max,
  price,
  symbol,
  onChange,
  value,
  usdcBalance
}) => {
  const { t } = useTranslation()
  const tooLow = value ? parseFloat(value) < parseFloat(min) : false
  const tooMuch = value ? parseFloat(value) > parseFloat(max) : false
  const usdPrice = Number.isNaN(parseFloat(value)) ? 0 : price * parseFloat(value)
  const usdcBalanceNumber = getBalanceNumber(usdcBalance, tokens.usdc.decimals)

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={tooLow || tooMuch}>
        <DescText textAlign="right" pb="8px">
          {t('Enter the amount of tokens you wish to purchase')}
        </DescText>
        <Flex alignItems="flex-end" justifyContent="space-around" pl="16px">
          <NumericalInput
            disabled={!enabled}
            className="token-amount-input"
            value={value}
            onUserInput={onChange}
            align="right"
          />
        </Flex>
        <Flex justifyContent="right" pl="16px" alignItems="end">
          <Text fontSize="14px">${usdPrice}</Text>
          <Text fontSize="12px">&nbsp;{'  USDC'}</Text>
        </Flex>
        {usdcBalance && (
          <Flex justifyContent="right" pl="16px" alignItems="end">
            <Text fontSize="10px">Balance : ${usdcBalanceNumber} USDC</Text>
          </Flex> 
        )}
      </StyledTokenInput>
      {tooLow && enabled && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('Too small to buy')}
        </StyledErrorMessage>
      )}
      {tooMuch && enabled && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('At most ')}{max}&nbsp;{symbol}
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default PSPriceInput
