import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Flex, Spinner } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import tokens from 'config/constants/tokens'
import useTokenBalance from 'hooks/useTokenBalance'

import { usePrivateSales, usePollPrivateSalesPublicData, usePollPrivateSalesWithUserData } from 'state/privatesales/hooks'
import PrivateSaleRow from './components/PrivateSaleRow'


const StyledPage = styled(Page)`
    position: relative;
    min-height: calc(100vh - 460px);
    @media screen and (max-width: 768px) {
      min-height: calc(100vh - 500px);
    }
    @media screen and (max-width: 576px) {
      min-height: 200px;
    }
`

const SpinnerWrapper = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

const FullWidthFlex = styled(Flex)`
    width: 100%;
`

const PrivateSales: React.FC = () => {
    const { data: privateSales } = usePrivateSales()
    const { balance: usdcBalance, fetchStatus: usdcFetchStatus } = useTokenBalance(tokens.busd.address)
    const { account } = useWeb3React()
    const hasData = privateSales.filter((sale) => sale.startDate).length > 0

    usePollPrivateSalesPublicData();
    usePollPrivateSalesWithUserData();
    return (
        <>
            <StyledPage >
                { hasData ?
                (
                    <Flex flexDirection="column">
                        {privateSales.filter((sale) => sale.startDate).map((sale) => (
                            <PrivateSaleRow
                            key={sale.type}
                            sale={sale}
                            account={account}
                            usdcBalance={usdcBalance}
                            usdcFetchStatus={usdcFetchStatus}
                            />
                        ))}
                    </Flex>
                )
                :
                (
                    <SpinnerWrapper >
                        <FullWidthFlex justifyContent="center" alignItems="center">
                            <Spinner />
                        </FullWidthFlex>
                    </SpinnerWrapper>
                )
                }


            </StyledPage>
        </>
    )
}

export default PrivateSales
