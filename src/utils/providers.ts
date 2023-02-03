import { ethers } from 'ethers'

const RPC_URL = 'https://galaxy.block.caduceus.foundation'

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

export default null
