// SocialMedia拿掉 且將左邊menu只留三個 先拆成兩塊 第二塊內容帶更改
import React from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Sider, SiderbarVault } from './styled'
import { Scrollbars } from 'react-custom-scrollbars'
import Logo from '../Logo'
import { MenuLinks, MenuLinks2 } from './MenuLinks'
// import { MenuLinks } from './MenuLinks'
// import { Dashboard } from 'src/layout/SidebarVault/styled'
interface SidebarProps {
  collapsed: boolean
  onCollapsed: (isCollapsed: boolean) => void
}
// import { useState } from 'react'
// import 'src/components/SidebarTabs/style.css'
// import Tabs from 'src/components/SidebarTabs/Tabs'
// // Tabs Components
// import TabOne from 'src/components/SidebarTabs/Tab1'
// import TabTwo from 'src/components/SidebarTabs/Tab2'
// import TabThree from 'src/components/SidebarTabs/Tab3'

// type TabsType = {
//   label: string
//   index: number
//   Component: React.FC<{}>
// }[]
// Tabs Array
// const tabs: TabsType = [
//   {
//     label: 'My Deposits',
//     index: 1,
//     Component: TabOne
//   },
//   {
//     label: 'My Vaults',
//     index: 2,
//     Component: TabTwo
//   },
//   {
//     label: 'Activity',
//     index: 3,
//     Component: TabThree
//   }
// ]
export default function Sidebar({ collapsed, onCollapsed }: SidebarProps) {
  const { height } = useWindowSize()
  // const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index)
  return (
    <Sider
      collapsed={collapsed}
      onMouseEnter={() => {
        onCollapsed(false)
      }}
      onMouseLeave={() => {
        if (!collapsed) {
          onCollapsed(true)
        }
      }}
    >
      <Logo collapsed={collapsed} />

      <Scrollbars
        autoHeight
        autoHeightMax={height ? height - 390 : window.innerHeight - 390}
        autoHide
        style={{ flex: 1, overflowX: 'hidden' }}
      >
        <MenuLinks collapsed={collapsed} />
      </Scrollbars>
      {/* <SiderbarVault>
        <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
      </SiderbarVault> */}
      <SiderbarVault>
        <Scrollbars
          autoHeight
          autoHeightMax={height ? height - 200 : window.innerHeight - 200}
          autoHide
          style={{ flex: 1, overflowX: 'hidden' }}
        >
          <MenuLinks2 collapsed={collapsed} />
        </Scrollbars>
      </SiderbarVault>
    </Sider>
  )
}
