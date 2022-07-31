import React, { useContext } from 'react'
import { MENU_LINK } from 'src/constants'
import { ThemeContext } from 'styled-components'
import { Menu, MenuItem, MenuLink, MenuName, MenuExternalLink, MenuWrapper } from './styled'
import { Box, Text, useTranslation } from '@pangolindex/components'
import { Dashboard, Swap, Pool } from '../../components/Icons'
import Charts from '../../assets/svg/menu/analytics.svg'
import { ANALYTICS_PAGE } from '../../constants'
import Bridge from '../../assets/svg/menu/bridge.svg'
import Governance from '../../assets/svg/menu/governance.svg'
import { useLocation } from 'react-router-dom'
import { useChainId } from 'src/hooks'
import { CHAINS } from '@pangolindex/sdk'

interface Props {
  collapsed?: boolean
  onClick?: () => void
}

interface Link {
  link: string
  icon: string
  title: string
  id: string
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

  const pangolinLinks = [
    {
      link: ANALYTICS_PAGE,
      icon: Charts,
      title: t('header.charts'),
      id: 'charts'
    },
    {
      link: 'https://gov.pangolin.exchange',
      icon: Governance,
      title: t('header.forum'),
      id: 'forum'
    }
  ]

  const otherLinks = [
    {
      link: 'https://bridge.avax.network/',
      icon: Bridge,
      title: `Avalanche ${t('header.bridge')}`,
      id: 'bridge'
    },
    {
      link: 'https://satellite.axelar.network/',
      icon: Bridge,
      title: `Satellite ${t('header.bridge')}`,
      id: 'satellite-bridge'
    }
  ]

  const createMenuLink = (link: Link, index: number) => {
    return (
      <MenuItem key={index}>
        <MenuExternalLink id={link.id} href={link.link}>
          <img src={link.icon} width={16} alt={link.title} />
          {!collapsed && <MenuName fontSize={[16, 14]}>{link.title}</MenuName>}
        </MenuExternalLink>
      </MenuItem>
    )
  }

  return (
    <MenuWrapper>
      <Menu>
        {mainLinks.map((x, index) => {
          const Icon = x.icon

          return (
            <MenuItem isActive={x.isActive} key={index}>
              <MenuLink id={x.id} to={x.link} onClick={onClick}>
                <Icon size={16} fillColor={x.isActive ? theme.black : theme.color22} />
                {!collapsed && (
                  <MenuName fontSize={[16, 14]} color={x.isActive ? 'black' : undefined}>
                    {x.title}
                  </MenuName>
                )}
              </MenuLink>
            </MenuItem>
          )
        })}
      </Menu>

      <Box mt={collapsed ? '0px' : '10px'} overflowY="hidden">
        {!collapsed && (
          <Box height={35} overflowY="hidden">
            <Text color="color22" fontSize={12}>
              PANGOLIN LINKS{' '}
            </Text>
          </Box>
        )}

        {pangolinLinks.map((x, index) => createMenuLink(x, index))}
      </Box>
      <Box mt={collapsed ? '0px' : '10px'}>
        {!collapsed && (
          <Box height={35} overflowY="hidden">
            <Text color="color22" fontSize={12}>
              {t('header.usefulLinks')}
            </Text>
          </Box>
        )}

        {otherLinks.map((x, index) => createMenuLink(x, index))}
      </Box>
    </MenuWrapper>
  )
}
