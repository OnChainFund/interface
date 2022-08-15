import React, { FC, Fragment } from 'react'
// import { WatchList, Portfolio } from '@pangolindex/components'
// import { ChainId, CHAINS } from '@pangolindex/sdk'
// import { MENU_LINK } from 'src/constants'
// import { useActiveWeb3React } from 'src/hooks'

const TabOne: FC<{}> = () => {
  // const { chainId = ChainId.AVALANCHE } = useActiveWeb3React()
  return (
    <Fragment>
      <h3>Tab One</h3>
      <p>one</p>
      {/* <Portfolio />
      {CHAINS[chainId]?.mainnet && (
        <WatchList visibleTradeButton={true} tradeLinkUrl={MENU_LINK.swap} redirect={true} />
      )} */}
    </Fragment>
  )
}
export default TabOne
