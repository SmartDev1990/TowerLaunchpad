import { cmpTestTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: cmpTestTokens.cake,
    earningToken: cmpTestTokens.cake,
    contractAddress: {
      256256: '',
      512512: '0x861b7a1e3DfeCEdC8771Bd67F79CC3EB28203BDb',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '100',
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: cmpTestTokens.cake,
    earningToken: cmpTestTokens.wbnb,
    contractAddress: {
      256256: '',
      512512: '0x18Ea23f980716557Da6Af169D2EA5d39175f72Ed',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.1',
    isFinished: false,
  },
  {
    sousId: 2,
    stakingToken: cmpTestTokens.cake,
    earningToken: cmpTestTokens.busd,
    contractAddress: {
      256256: '',
      512512: '0x2132921e45139Ca153992555bDCf7F3C0c63E004',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.03',
    isFinished: false,
  },
]

export default pools
