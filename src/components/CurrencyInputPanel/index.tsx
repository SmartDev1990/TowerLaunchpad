import React from 'react'
import { Currency, Pair } from '@smartdev1990/tower-sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTokenData } from 'state/info/hooks'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import BigNumber from 'bignumber.js'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const PercentButtonsRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
`
const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '12px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const StyledButton = styled(Button)`
  flex-grow: 1;
`

const USDPriceText = styled(Text)`
  font-size: 12px;
  color: rgba(0,0,0, 0.6);
  position: absolute;
  bottom: 0;
`;

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showPairs?: boolean
  showMaxButton: boolean
  showPercentButtons?: boolean
  onChangePercent?: (percent: number) => void
  label?: string
  onCurrencySelect: (currency: Currency) => void
  onCurrencyPairSelect?: (currencyA: Currency, currencyB: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showPairs,
  showMaxButton,
  showPercentButtons,
  onChangePercent,
  label,
  onCurrencySelect,
  onCurrencyPairSelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const { chainId } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const wcurrency = wrappedCurrency(currency, chainId)
  const tokenData = useTokenData(wcurrency ? wcurrency.address.toLowerCase() : undefined)
  const valueNumber = new BigNumber(value)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      onCurrencyPairSelect={onCurrencyPairSelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      showPairs={showPairs}
    />,
  )
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize="14px">{translatedLabel}</Text>
              {account && (
                <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency
                    ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                    : ' -'}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px', position: 'relative' } : {position: 'relative'}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && !showPercentButtons && label !== 'To' && (
                <Button onClick={onMax} scale="sm" variant="text">
                  MAX
                </Button>
              )}
            </>
          )}
          <CurrencySelectButton
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
          <USDPriceText>
            ${tokenData && valueNumber && valueNumber.isFinite() ? (tokenData.priceUSD * valueNumber.toNumber()).toFixed(3) : '0'}
          </USDPriceText>
        </InputRow>
        { showPercentButtons && (
          <PercentButtonsRow>
            <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => onChangePercent(25)}>
              25%
            </StyledButton>
            <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => onChangePercent(50)}>
              50%
            </StyledButton>
            <StyledButton scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => onChangePercent(75)}>
              75%
            </StyledButton>
            <StyledButton disabled={!showMaxButton} scale="xs" mx="2px" p="4px 16px" variant="tertiary" onClick={() => onChangePercent(100)}>
              {t('Max')}
            </StyledButton>
          </PercentButtonsRow>
        )}
      </Container>
    </InputPanel>
  )
}
