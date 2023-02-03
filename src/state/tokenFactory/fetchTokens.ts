import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import lpGeneratorTokenABI from 'config/abi/liquidityGeneratorToken.json'
import multicall from 'utils/multicall'

export interface PublicTokenData {
    name: string,
    symbol: string,
    decimals: number,
    address: string,
    totalSupply:SerializedBigNumber,
    taxFee?: SerializedBigNumber,
    lpFee?: SerializedBigNumber
}

export const fetchStandardTokens = async (account: string, addresses: string[]): Promise<PublicTokenData[]> => {

    const calls = addresses.reduce((accum, address, index) => {
        accum.push({
            address,
            name: 'name',
            params: []
        })
        accum.push({
            address,
            name: 'symbol',
            params: []
        })
        accum.push({
            address,
            name: 'decimals',
            params: []
        })
        accum.push({
            address,
            name: 'totalSupply',
            params: []
        })
        return accum
    }, [])

    const response = await multicall(erc20ABI, calls)
    const res = response.reduce((accum: any[][], item, index) => {
        const chunk = Math.floor(index / 4)
        const chunks = accum
        chunks[chunk] = ([] as any[]).concat(accum[chunk] || [], item)
        return chunks
    }, []).map((item, index) => {
        return {
            address: addresses[index],
            name: item[0],
            symbol : item[1],
            decimals: item[2],
            totalSupply: new BigNumber(item[3]._hex).toJSON()
        }
    })
    return res
}

export const fetchLPGeneratorTokens = async (account: string, addresses: string[]): Promise<PublicTokenData[]> => {

    const calls = addresses.reduce((accum, address, index) => {
        accum.push({
            address,
            name: 'name',
            params: []
        })
        accum.push({
            address,
            name: 'symbol',
            params: []
        })
        accum.push({
            address,
            name: 'decimals',
            params: []
        })
        accum.push({
            address,
            name: 'totalSupply',
            params: []
        })
        accum.push({
            address,
            name: '_taxFee',
            params: []
        })
        accum.push({
            address,
            name: '_liquidityFee',
            params: []
        })
        return accum
    }, [])

    const response = await multicall(lpGeneratorTokenABI, calls)
    const res = response.reduce((accum: any[][], item, index) => {
        const chunk = Math.floor(index / 6)
        const chunks = accum
        chunks[chunk] = ([] as any[]).concat(accum[chunk] || [], item)
        return chunks
    }, []).map((item, index) => {
        return {
            address: addresses[index],
            name: item[0],
            symbol : item[1],
            decimals: item[2],
            totalSupply: new BigNumber(item[3]._hex).toJSON(),
            taxFee: new BigNumber(item[4]._hex).toJSON(),
            lpFee: new BigNumber(item[5]._hex).toJSON()
        }
    })
    return res
}