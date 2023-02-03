import { Token } from "@smartdev1990/tower-sdk";
import BigNumber from "bignumber.js";

export interface CronosPairToken {
    name: string
    address: string
    timestamp: number
    totalSupply: BigNumber
    decimals: number
    token0: Token
    token1: Token
}