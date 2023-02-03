import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getBunnySpecialCakeVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getSimpleTokenFactoryAddress,
  getTokenFactoryAddress,
  getTokenFactoryManagerAddress,
  getAirdropperAddress,
  getLockerAddress,
  getCrowpadSaleFactoryAddress,
  getNFTFactoryAddress,
  getNFT1155FactoryAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/crowfiProfile.json'
import pancakeRabbitsAbi from 'config/abi/crowfiRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefV2 from 'config/abi/sousChefV2.json'
import sousChefBnb from 'config/abi/sousChefBnb.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultAbi from 'config/abi/cakeVault.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialCakeVaultAbi from 'config/abi/bunnySpecialCakeVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/crowfiSquad.json'
import erc721CollctionAbi from 'config/abi/erc721collection.json'
import privateSaleAbi from 'config/abi/presale.json'
import tokenFactoryManagerAbi from 'config/abi/tokenFactoryManager.json'
import standardTokenFactoryAbi from 'config/abi/standardTokenFactory.json'
import lpTokenFactoryAbi from 'config/abi/lpGeneratorTokenFactory.json'
import standardTokenAbi from 'config/abi/standardToken.json'
import lpGeneratorTokenAbi from 'config/abi/liquidityGeneratorToken.json'
import crowpadAirdropper from 'config/abi/crowpadAirdropper.json'
import crowLockABI from 'config/abi/crowLock.json'
import crowpadSaleFactoryABI from 'config/abi/crowpadSaleFactory.json'
import crowpadSaleABI from 'config/abi/crowpadSale.json'
import { ERC20_ABI } from 'config/abi/erc20'
import nftFactoryAbi from 'config/abi/nftFactory.json'
import nft1155FactoryAbi from 'config/abi/nft1155Factory.json'
import erc165Abi from 'config/abi/erc165.json'
import erc721TokenAbi from 'config/abi/erc721Token.json'
import erc1155TokenAbi from 'config/abi/erc1155Token.json'
import nftBundleAbi from 'config/abi/nftbundle.json'
import baseNftAbi from 'config/abi/baseNft.json'
import { ChainLinkOracleContract, FarmAuctionContract, PancakeProfileContract } from './types'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}


export const getNFTFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftFactoryAbi, getNFTFactoryAddress(), signer)
}

export const getNFT1155FactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nft1155FactoryAbi, getNFT1155FactoryAddress(), signer)
}

export const getERC721TokenContract = (address:string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721TokenAbi, address, signer)
}

export const getERC1155TokenContract = (address:string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc1155TokenAbi, address, signer)
}

export const getNFTBundleContract = (address:string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftBundleAbi, address, signer)
}

export const getERC165Contract = (address:string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc165Abi, address, signer)
}

export const getCrowpadSaleContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(crowpadSaleABI, address, signer)
}

export const getCrowpadSaleFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(crowpadSaleFactoryABI, getCrowpadSaleFactoryAddress(), signer)
}

export const getAirdropperContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(crowpadAirdropper, getAirdropperAddress(), signer)
}

export const getLockerContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(crowLockABI, getLockerAddress(), signer)
}

export const getTokenFactoryManagerContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tokenFactoryManagerAbi, getTokenFactoryManagerAddress(), signer)
}

export const getSimpleTokenFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(standardTokenFactoryAbi, getSimpleTokenFactoryAddress(), signer)
}

export const getTokenFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenFactoryAbi, getTokenFactoryAddress(), signer)
}

export const getStandardTokenContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(standardTokenAbi, address, signer)
}
export const getLiquidityGeneratorTokenContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpGeneratorTokenAbi, address, signer)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}

export const getErc20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ERC20_ABI, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}
export const getBaseNFTContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(baseNftAbi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getIfoV1Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV1Abi, address, signer)
}
export const getIfoV2Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV2Abi, address, signer)
}
export const getSouschefContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config.contractAddress), signer)
}
export const getSouschefV2Contract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config.contractAddress), signer)
}
export const getPointCenterIfoContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), signer)
}
export const getCakeContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeAbi, tokens.cake.address, signer)
}
export const getBUSDContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, tokens.busd.address, signer)
}
export const getPrivateSaleContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(privateSaleAbi, address, signer)
}

export const getProfileContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(profileABI, getPancakeProfileAddress(), signer) as PancakeProfileContract
}
export const getPancakeRabbitContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), signer)
}
export const getBunnyFactoryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), signer)
}
export const getBunnySpecialContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), signer)
}
export const getLotteryV2Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(), signer)
}
export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}
export const getClaimRefundContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), signer)
}
export const getTradingCompetitionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), signer)
}
export const getEasterNftContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(easterNftAbi, getEasterNftAddress(), signer)
}
export const getCakeVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeVaultAbi, getCakeVaultAddress(), signer)
}

export const getChainlinkOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), signer) as ChainLinkOracleContract
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}
export const getBunnySpecialCakeVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialCakeVaultAbi, getBunnySpecialCakeVaultAddress(), signer)
}
export const getBunnySpecialPredictionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialPredictionAbi, getBunnySpecialPredictionAddress(), signer)
}
export const getBunnySpecialLotteryContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(), signer)
}
export const getFarmAuctionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(farmAuctionAbi, getFarmAuctionAddress(), signer) as FarmAuctionContract
}
export const getAnniversaryAchievementContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(anniversaryAchievementAbi, getAnniversaryAchievement(), signer)
}
export const getNftMarketContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftMarketAbi, getNftMarketAddress(), signer)
}
export const getNftSaleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftSaleAbi, getNftSaleAddress(), signer)
}
export const getPancakeSquadContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pancakeSquadAbi, getPancakeSquadAddress(), signer)
}
export const getErc721CollectionContract = (signer?: ethers.Signer | ethers.providers.Provider, address?: string) => {
  return getContract(erc721CollctionAbi, address, signer)
}
