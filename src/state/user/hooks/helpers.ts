import { Token } from '@smartdev1990/tower-sdk'
import { SerializedToken } from 'config/constants/types'
import { parseUnits } from 'ethers/lib/utils'

export function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
    projectLink: token.projectLink,
  }
}

export function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name,
    serializedToken.projectLink,
  )
}

export enum GAS_PRICE {
  default = '5000',
  fast = '6000',
  instant = '7000',
  testnet = '5000',
  cronos = '5000'
}


export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
  cronos: parseUnits(GAS_PRICE.cronos, 'gwei').toString(),
}
