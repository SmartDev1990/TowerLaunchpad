import { ChainId } from '@smartdev1990/tower-sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[ChainId.CMP_TESTNET]
}

export const getAirdropperAddress = () => {
  return getAddress(addresses.airdropper)
}

export const getLockerAddress = () => {
  return getAddress(addresses.locker)
}

export const getNFTFactoryAddress = () => {
  return getAddress(addresses.nftFactory)
}

export const getNFT1155FactoryAddress = () => {
  return getAddress(addresses.nft1155Factory)
}

export const getNFTBundleAddress = () => {
  return getAddress(addresses.nftBundle)
}


export const getTokenFactoryManagerAddress = () => {
  return getAddress(addresses.tokenFactoryManager)
}

export const getSimpleTokenFactoryAddress = () => {
  return getAddress(addresses.tokenSimpleFactory)
}
export const getTokenFactoryAddress = () => {
  return getAddress(addresses.tokenFactory)
}

export const getCrowpadSaleFactoryAddress = () => {
  return getAddress(addresses.launchpadSaleFactory)
}

export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.crowfiProfile)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.crowfiRabbits)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.tradingCompetition)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}
export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.predictions)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.chainlinkOracle)
}
export const getBunnySpecialCakeVaultAddress = () => {
  return getAddress(addresses.bunnySpecialCakeVault)
}
export const getBunnySpecialPredictionAddress = () => {
  return getAddress(addresses.bunnySpecialPrediction)
}
export const getBunnySpecialLotteryAddress = () => {
  return getAddress(addresses.bunnySpecialLottery)
}
export const getFarmAuctionAddress = () => {
  return getAddress(addresses.farmAuction)
}
export const getAnniversaryAchievement = () => {
  return getAddress(addresses.AnniversaryAchievement)
}
export const getNftMarketAddress = () => {
  return getAddress(addresses.nftMarket)
}
export const getNftSaleAddress = () => {
  return getAddress(addresses.nftSale)
}
export const getPancakeSquadAddress = () => {
  return getAddress(addresses.crowfiSquad)
}
export const getReferralAddress = () => {
  return getAddress(addresses.referral)
}
