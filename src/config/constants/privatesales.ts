import { serializeTokens } from './tokens'
import { PrivateSaleType, SerializedPrivateSaleConfig } from './types'

const serializedTokens = serializeTokens()
const privatesales: SerializedPrivateSaleConfig[] = [
    {
        type: PrivateSaleType.seedsale,
        name: 'Seed Sale',
        desc: 'Participate in the CrowFi seed sale and receive Crow Tokens at the best price possible!',
        price: 0.01,
        manager: {
            512512: '0xFB45aF3Fe47334e8c3c1F6EaA8e9a1E17Df30f11',
            256256: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
        },
        tempToken: serializedTokens.cake,
        quoteToken: serializedTokens.wbnb,
        whitelistEnabled: true
    },
    {
        type: PrivateSaleType.privatesale,
        name: 'Private Sale',
        desc: 'Participate in the exclusive CrowFi private sale to get tokens at an incredible price!',
        price: 0.015,
        manager: {
          512512: '0xFB45aF3Fe47334e8c3c1F6EaA8e9a1E17Df30f11',
          256256: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
        },
        tempToken: serializedTokens.cake,
        quoteToken: serializedTokens.wbnb,
        whitelistEnabled: true
    },
    {
        type: PrivateSaleType.preSale,
        name: 'Public Pre Sale',
        desc: 'Join the public pre sale and receive tokens at a great price!',
        price: 0.018,
        manager: {
          512512: '0xFB45aF3Fe47334e8c3c1F6EaA8e9a1E17Df30f11',
          256256: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
        },
        tempToken: serializedTokens.cake,
        quoteToken: serializedTokens.wbnb,
        whitelistEnabled: false
    }
]

export default privatesales
