import { ChainId, Token } from '@smartdev1990/tower-sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types'

const { MAINNET, TESTNET, CMP, CMP_TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken
}

export const mainnetTokens = {

  wbnb: new Token(MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB', 'https://www.binance.com/'),

  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'BNB', 'BNB', 'https://www.binance.com/'),
  cake: new Token(MAINNET, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'CAKE', 'CrowFi Token', ''),
  nft: new Token(MAINNET, '0x1fC9004eC7E5722891f5f38baE7678efCB11d34D', 6, 'NFT', 'APENFT', 'https://apenft.org'),
  busd: new Token(MAINNET, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD', 'https://www.paxos.com/busd/'),
  usdt: new Token(MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD', 'https://tether.to/'),
}
export const testnetTokens = {
  wbnb: new Token(TESTNET, '0xf9a7A2b01Bf758776703677719F8aCf018600070', 18, 'WBNB', 'Wrapped BNB', 'https://www.binance.com/'),
  cake: new Token(TESTNET, '0x85529Febc78834e84a2055204BB802a6a4E2b0bf', 0, 'CAKE', 'CrowFi Token', 'https://crowfi.com'),
  busd: new Token(TESTNET, '0x2aFD1d7DADEfb7fE31364A4f57f704c1558C8Edc', 18, 'BUSD', 'Binance USD', 'https://www.paxos.com/busd/'),
  usdc: new Token(TESTNET, '0x9e91D184a3ff79b9A7F666809769BF2E06a4fd7a', 6, 'USDC', 'Binance-Peg USD Coin', 'https://www.centre.io/usdc'),
}

export const cmpTestTokens = {
  wbnb: new Token(
    CMP_TESTNET,
    '0xaB6b6212e5443228D586cE5Aeb54B02b185208Cc',
    18,
    'WCMP',
    'Wrapped CMP',
    'https://caduceus.foundation'
  ),
  cake: new Token(
    CMP_TESTNET,
   '0x09FB691A786284e99D122D2B68dE40D253fec299',
   18,
   'TW',
   'TowerTestnet Token',
   'https://towerswap.finance/',
  ),
  syrup: new Token(
    CMP_TESTNET,
    '0x2DD80bE5B44cdcB3f39dEb9cE483c8f67191f478',
    18,
    'Syrup',
    'SyrupBar Token',
    'https://towerswap.finance',
  ),
  busd: new Token(
    CMP_TESTNET,
   '0xB21668048d42d7d6423B070B278F5Af14e1f1600',
   18,
   'BUSD',
   'Tower BUSD',
   'https://www.paxos.com/busd/',
  ),
  usdt: new Token(
    CMP_TESTNET,
    '0x55A9f6AA17886DC17E407b3Ec4570f0CA8b9704a',
    6,
    'USDT',
    'Tower USDT',
    'https://towerswap.finance',
  ),
}

export const cmpTokens = {
  wbnb: new Token(
    CMP,
    '0xaB6b6212e5443228D586cE5Aeb54B02b185208Cc',
    18,
    'WCMP',
    'Wrapped CMP',
    'https://caduceus.foundation'
  ),
  cake: new Token(
    CMP,
   '0x09FB691A786284e99D122D2B68dE40D253fec299',
   18,
   'TW',
   'TowerTestnet Token',
   'https://towerswap.finance/',
  ),
  busd: new Token(
    CMP,
   '0xB21668048d42d7d6423B070B278F5Af14e1f1600',
   18,
   'BUSD',
   'Tower BUSD',
   'https://www.paxos.com/busd/',
  ),
  usdt: new Token(
    CMP,
   '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
   6,
   'USDT',
   'Tether USD',
   'https://tether.to/',
  ),
}

const tokens = (): TokenList => {
  const chainId = process.env.REACT_APP_CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(cmpTestTokens).reduce((accum, key) => {
      return { ...accum, [key]: cmpTokens[key] || cmpTestTokens[key] }
    }, {});
  }

  if (parseInt(chainId, 10) === ChainId.CMP_TESTNET) {
    return cmpTestTokens
  }

  if (parseInt(chainId, 10) === ChainId.CMP) {
    return cmpTokens
  }

  return cmpTestTokens
}

export const serializeTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens()
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {})

  return serializedTokens
}

export default tokens()
