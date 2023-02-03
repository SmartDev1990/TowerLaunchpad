import { Currency, ETHER, Token } from '@smartdev1990/tower-sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return ETHER.symbol
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
