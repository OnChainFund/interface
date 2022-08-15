import React, { useState } from 'react'
import { PageWrapper, TopContainer, StatsWrapper } from './styleds'

import 'src/components/Tabs/styles.css'
import Tabs from 'src/components/Tabs/Tabs'
// Tabs Components
import TabOne from 'src/components/Tabs/Tab1'
import TabTwo from 'src/components/Tabs/Tab2'
import TabThree from 'src/components/Tabs/Tab3'

type TabsType = {
  label: string
  index: number
  Component: React.FC<{}>
}[]
// Tabs Array
const tabs: TabsType = [
  {
    label: 'My Deposits',
    index: 1,
    Component: TabOne
  },
  {
    label: 'My Vaults',
    index: 2,
    Component: TabTwo
  },
  {
    label: 'Activity',
    index: 3,
    Component: TabThree
  }
]

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index)

  return (
    <PageWrapper>
      <TopContainer>
        <StatsWrapper></StatsWrapper>
        <StatsWrapper>
          {/* <PageTitle>{t('dashboardPage.dashboard')}</PageTitle> */}
          {/* <PageDescription>{t('dashboardPage.greetings')}</PageDescription> */}
          <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
          {/* <Portfolio /> */}
          {/* {CHAINS[chainId]?.mainnet && (
            <WatchList visibleTradeButton={true} tradeLinkUrl={MENU_LINK.swap} redirect={true} />
          )} */}
        </StatsWrapper>
      </TopContainer>
    </PageWrapper>
  )
}

export default Dashboard
