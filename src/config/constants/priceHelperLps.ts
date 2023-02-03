import tokens from './tokens'
import { SerializedFarmConfig } from './types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'BUSD-WCMP LP',
    lpAddresses: {
      512512: '0x6b9dB0B7504e04E2a4E5C4B6B22bD84E9a8710fd',
      256256: '',
    },
    token: tokens.busd,
    quoteToken: tokens.wcmp,
  },
]

export default priceHelperLps
