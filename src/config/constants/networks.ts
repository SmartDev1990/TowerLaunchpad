import { ChainId } from '@smartdev1990/tower-sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://bsc-dataseed1.defibit.io',
  [ChainId.TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [ChainId.CMP]: 'https://mainnet.block.caduceus.foundation',
  [ChainId.CMP_TESTNET]: 'https://galaxy.block.caduceus.foundation'

}

export default NETWORK_URLS
