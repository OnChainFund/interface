// 更改左側menu的內容
import React, { useContext } from 'react'
import { MENU_LINK } from 'src/constants'
import { ThemeContext } from 'styled-components'
import { Menu, MenuItem, MenuLink, MenuName, MenuWrapper } from './styled'
import { useTranslation } from '@pangolindex/components'
import { Dashboard, Swap, Pool } from '../../components/Icons'
import { useLocation } from 'react-router-dom'
import { useChainId } from 'src/hooks'
import { CHAINS } from '@pangolindex/sdk'

interface Props {
  collapsed?: boolean
  onClick?: () => void
}

export const MenuLinks: React.FC<Props> = ({ collapsed = false, onClick }) => {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  const chainId = useChainId()
  const chain = CHAINS[chainId]

  const location: any = useLocation()

  const mainLinks = [
    {
      link: MENU_LINK.dashboard,
      icon: Dashboard,
      title: t('header.dashboard'),
      id: 'dashboard',
      isActive: location?.pathname?.startsWith(MENU_LINK.dashboard)
    },
    {
      link: MENU_LINK.swap,
      icon: Swap,
      title: t('header.swap'),
      id: 'swap',
      isActive: location?.pathname?.startsWith(MENU_LINK.swap)
    },
    {
      link: MENU_LINK.pool,
      icon: Pool,
      title: `${t('header.pool')} & ${t('header.farm')}`,
      id: 'pool',
      isActive: location?.pathname?.startsWith(MENU_LINK.pool)
    }
  ]

  // for now, for non evm chain, hide all other menus except dashboard and swap
  if (!chain.evm) {
    mainLinks.splice(2)
  }

  // !!text
  return (
    <MenuWrapper>
      <Menu>
        {mainLinks.map((x, index) => {
          const Icon = x.icon
          return (
            <MenuItem isActive={x.isActive} key={index}>
              <MenuLink id={x.id} to={x.link} onClick={onClick}>
                <Icon size={16} fillColor={x.isActive ? theme.black : theme.color22} />
                {
                  <MenuName fontSize={[16, 14]} color={x.isActive ? 'black' : undefined}>
                    {x.title}
                  </MenuName>
                }
              </MenuLink>
            </MenuItem>
          )
        })}
      </Menu>
    </MenuWrapper>
  )
}
export const MenuLinks2: React.FC<Props> = ({ collapsed = false, onClick }) => {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  const chainId = useChainId()
  const chain = CHAINS[chainId]

  const location: any = useLocation()

  const mainLinks = [
    {
      link: MENU_LINK.dashboard,
      icon: Dashboard,
      title: t('header.dashboard'),
      id: 'dashboard',
      isActive: location?.pathname?.startsWith(MENU_LINK.dashboard)
    },
    {
      link: MENU_LINK.swap,
      icon: Swap,
      title: t('header.swap'),
      id: 'swap',
      isActive: location?.pathname?.startsWith(MENU_LINK.swap)
    },
    {
      link: MENU_LINK.pool,
      icon: Pool,
      title: `${t('header.pool')} & ${t('header.farm')}`,
      id: 'pool',
      isActive: location?.pathname?.startsWith(MENU_LINK.pool)
    }
  ]

  // for now, for non evm chain, hide all other menus except dashboard and swap
  if (!chain.evm) {
    mainLinks.splice(2)
  }

  // !!text
  return (
    <MenuWrapper>
      <Menu>
        {mainLinks.map((x, index) => {
          const Icon = x.icon
          return (
            <MenuItem isActive={x.isActive} key={index}>
              <MenuLink id={x.id} to={x.link} onClick={onClick}>
                <Icon size={16} fillColor={x.isActive ? theme.black : theme.color22} />
                {
                  <MenuName fontSize={[16, 14]} color={x.isActive ? 'black' : undefined}>
                    {x.title}
                  </MenuName>
                }
              </MenuLink>
            </MenuItem>
          )
        })}
      </Menu>
    </MenuWrapper>
  )
}
