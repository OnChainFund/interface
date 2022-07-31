// SocialMedia拿掉 且將左邊menu只留三個 先拆成兩塊 第二塊內容帶更改
import React from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
// import SocialMedia from '../SocialMedia'
import { Sider } from './styled'
// import Backward from '../../assets/svg/backward.svg'
// import Forward from '../../assets/svg/forward.svg'
import { Scrollbars } from 'react-custom-scrollbars'
import Logo from '../Logo'
import { MenuLinks } from './MenuLinks'
interface SidebarProps {
  collapsed: boolean
  onCollapsed: (isCollapsed: boolean) => void
}

export default function Sidebar({ collapsed, onCollapsed }: SidebarProps) {
  const { height } = useWindowSize()

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
        autoHeightMax={height ? height - 150 : window.innerHeight - 150}
        autoHide
        style={{ flex: 1, overflowX: 'hidden' }}
      >
        <MenuLinks collapsed={collapsed} />
      </Scrollbars>
      <Scrollbars
        autoHeight
        autoHeightMax={height ? height - 150 : window.innerHeight - 150}
        autoHide
        style={{ flex: 1, overflowX: 'hidden' }}
      >
        <MenuLinks collapsed={collapsed} />
      </Scrollbars>
    </Sider>
  )
}
