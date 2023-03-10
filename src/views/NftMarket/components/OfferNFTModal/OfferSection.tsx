import React, { useCallback, useMemo, useState } from 'react'
import history from 'routerHistory'
import { Button, Flex, Radio, Text } from '@pancakeswap/uikit';
import { ETHER,TokenAmount, JSBI } from '@smartdev1990/tower-sdk';
import tokens from 'config/constants/tokens'
import { useAppDispatch } from 'state';
import BigNumber from 'bignumber.js';
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization';
import Select, { OptionProps } from 'components/Select/Select';
import { StyledIntegerInput } from 'components/Launchpad/StyledControls';
import useToast from 'hooks/useToast';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import { getNftMarketAddress } from 'utils/addressHelpers';
import BaseSection from './BaseSection';
import CurrencyInput from './CurrencyInput';
import { NFTResponse } from '../../hooks/types';
import { useCreateNFTOffer, useListNFTAuction } from '../../hooks/useListNFT';


const GradeImageWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  > img {
    width: 300px;
    max-width: calc(90vw - 120px);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    > img {
      max-width: calc(100vw - 144px);
    }
  }
`

const RadioGroup = styled(Flex)`
  align-items: center;
  margin-right: 16px;
  margin-top: 8px;
  cursor: pointer;
`

interface OfferSectionProps {
  nft?: NFTResponse
  account?: string
  available: number
  onComplete?: () => void
  onDismiss?: () => void
}

const OfferSection: React.FC<OfferSectionProps> = ({ nft, account, available, onComplete, onDismiss }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { toastError, toastSuccess } = useToast()
  const durationOptions = [
    {
        label: '10 mins',
        value: 60 * 10,
    },
    {
        label: '12 hours',
        value: 3600 * 12,
    },
    {
        label: '24 hours',
        value: 86400,
    },
    {
        label: '3 days',
        value: 86400 * 3,
    },
    {
        label: '7 days',
        value: 86400 * 7,
    }
  ]
  const [pendingTx, setPendingTx] = useState(false)
  const [useToken, setUseToken] = useState(false)
  const [duration, setDuration] = useState(durationOptions[0].value)
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('1')
  
  const priceNumber = useMemo(() => {
    const number = price && price.length > 0 ? new BigNumber(price) : BIG_ZERO
    return number.multipliedBy(BIG_TEN.pow(useToken ? tokens.usdc.decimals : ETHER.decimals))
  }, [price, useToken])

  const { onCreateOffer } = useCreateNFTOffer()

  const isInputValid = useMemo(() => {
    return priceNumber && priceNumber.isFinite() && priceNumber.gt(BIG_ZERO) && parseInt(amount) > 0 && parseInt(amount) <= available
  }, [priceNumber, amount, available])

  const handleChangePrice = useCallback(
      (value: string) => {
      setPrice(value)
      },
      [setPrice],
  )

  const handleDurationOptionChange = (option: OptionProps): void => {
      setDuration(option.value)
  }

  const handleCreate = useCallback(async() => {

    try {
      setPendingTx(true)
      const listId = await onCreateOffer(
        useToken, 
        nft.contractAddress, 
        nft.contractType.toString(),
        nft.tokenId,
        amount,
        priceNumber.toFixed())
      toastSuccess(t('Success'), t('Your NFT has been listed on the market'))
      onDismiss()
      onComplete()
    } catch (e) {
      if (typeof e === 'object' && 'message' in e) {
        const err: any = e;
        toastError(t('Error'), err.message)
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
      console.error(e)
    } finally {
      setPendingTx(false)
    }
  }, [onCreateOffer, onDismiss, onComplete, toastError, toastSuccess, t, nft, useToken, priceNumber, amount])

  return (
    <BaseSection nft={nft} available={available} useToken={useToken} pendingTx={pendingTx} account={account} onDismiss={onDismiss} handleCreate={handleCreate} isInputValid={isInputValid}>
      <Flex  margin="8px 0px" flexDirection="column">
        <Text fontSize='14px'>
          {t('Token Amount:')}
        </Text>
        <StyledIntegerInput
          value={amount}
          onUserInput={(value) => setAmount(value)}
        />
      </Flex>
      <Flex flexDirection='row' justifyContent="center" margin="8px 0px">
        <RadioGroup onClick={() => setUseToken(false)}>
          <Radio onChange={() => null} scale="sm" checked={!useToken} />
          <Text ml="8px">{t('Buy with CRO')}</Text>
        </RadioGroup>

        <RadioGroup onClick={() => setUseToken(true)}>
          <Radio onChange={() => null} scale="sm" checked={useToken} />
          <Text ml="8px">{t('Buy with %symbol%', {symbol: tokens.usdc.symbol})}</Text>
        </RadioGroup>
      </Flex>
      <Flex  margin="8px 0px" flexDirection="column">
        <Text fontSize='14px'>
          {t('Total Price:')}
        </Text>
        <CurrencyInput
          enabled
          value={price}
          symbol={useToken ? tokens.usdc.symbol : "CRO"}
          onChange={handleChangePrice}
        />
      </Flex>
      {/* <Flex  margin="8px 0px" flexDirection="column">
        <Text fontSize='14px'>
          {t('Duration:')}
        </Text>
      <Select
          options={durationOptions}
          onOptionChange={handleDurationOptionChange}
      />
      </Flex> */}
    </BaseSection>
  )
}

export default OfferSection
