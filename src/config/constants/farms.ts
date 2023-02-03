import { cmpTestTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 3) should always be at the top of the file.
   */
   {
    pid: 1,
    lpSymbol: 'TW-WCMP LP',
    lpAddresses: {
      512512: '0xCF506651b80796D34085dADb1c761ebF71BB2b8d',
      256256: '',
    },
    token: cmpTestTokens.cake,
    quoteToken: cmpTestTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'TW-BUSD LP',
    lpAddresses: {
      512512: '0xa4B690F4F53caC099549e57e6309A11c79C6Bf56',
      256256: '',
    },
    token: cmpTestTokens.cake,
    quoteToken: cmpTestTokens.busd,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD-WCMP LP',
    lpAddresses: {
      512512: '0x6b9dB0B7504e04E2a4E5C4B6B22bD84E9a8710fd',
      256256: '',
    },
    token: cmpTestTokens.busd,
    quoteToken: cmpTestTokens.wbnb,
  }
]

export default farms
