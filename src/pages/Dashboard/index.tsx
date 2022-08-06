// import React from 'react'
import React, { useState } from 'react'
import { PageWrapper, TopContainer, StatsWrapper } from './styleds'
import { WatchList, Portfolio } from '@pangolindex/components'
import { ChainId, CHAINS } from '@pangolindex/sdk'
import { useActiveWeb3React } from 'src/hooks'
// import { Hidden } from 'src/theme'
import { MENU_LINK } from 'src/constants'
import Sidebar from 'src/layout/Sidebar'

const Dashboard = () => {
  // const { t } = useTranslation()
  const { chainId = ChainId.AVALANCHE } = useActiveWeb3React()
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(true)

  // const [activeMobileMenu, setActiveMobileMenu] = useState(false)

  return (
    <PageWrapper>
      <TopContainer>
        <StatsWrapper>
          <Sidebar collapsed={isDrawerCollapsed} onCollapsed={value => setIsDrawerCollapsed(value)} />
          {/* <PageTitle>{t('dashboardPage.dashboard')}</PageTitle> */}
          {/* <PageDescription>{t('dashboardPage.greetings')}</PageDescription> */}
          <Portfolio />
          {CHAINS[chainId]?.mainnet && (
            <WatchList visibleTradeButton={true} tradeLinkUrl={MENU_LINK.swap} redirect={true} />
          )}
        </StatsWrapper>
      </TopContainer>
    </PageWrapper>
  )
}

export default Dashboard
