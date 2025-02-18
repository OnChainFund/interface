import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { TextInput, Box, Loader, useTranslation } from '@pangolindex/components'
import { Search } from 'react-feather'
import Scrollbars from 'react-custom-scrollbars'
import { PanelWrapper, LoadingWrapper, MobileGridContainer, PoolsWrapper } from './styleds'
import DetailModal from '../../DetailModal'
import DropdownMenu from 'src/components/Beta/DropdownMenu'
import { Hidden } from 'src/theme'
import { StakingInfo } from 'src/state/stake/hooks'

export enum SortingType {
  totalStakedInUsd = 'totalStakedInUsd',
  totalApr = 'totalApr'
}

export const SortOptions = [
  {
    label: 'Liquidity',
    value: SortingType.totalStakedInUsd
  },
  {
    label: 'APR',
    value: SortingType.totalApr
  }
]

export interface PoolCardListViewProps {
  version: string
  setMenu: (value: string) => void
  activeMenu: string
  menuItems: Array<{ label: string; value: string }>
  handleSearch: (value: any) => void
  onChangeSortBy: (value: string) => void
  sortBy: string
  searchQuery: string
  isLoading: boolean
  doesNotPoolExist: boolean
  children: React.ReactNode
  selectedPool: StakingInfo
}

const PoolCardListView = ({
  version,
  setMenu,
  activeMenu,
  menuItems,
  handleSearch,
  sortBy,
  searchQuery,
  onChangeSortBy,
  isLoading,
  doesNotPoolExist,
  children,
  selectedPool
}: PoolCardListViewProps) => {
  const { t } = useTranslation()

  const theme = useContext(ThemeContext)

  const renderPoolCardListView = () => {
    if (isLoading && !searchQuery)
      return (
        <LoadingWrapper>
          <Loader size={100} />
        </LoadingWrapper>
      )
    else if (doesNotPoolExist && !searchQuery) {
      return (
        <Box textAlign="center" color="color4">
          {t('earnPage.noActiveRewards')}
        </Box>
      )
    } else {
      return (
        <>
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={10}>
              <Box width="100%">
                <TextInput
                  placeholder={t('searchModal.tokenName')}
                  onChange={handleSearch}
                  value={searchQuery}
                  id="token-search-input"
                  addonAfter={<Search style={{ marginTop: '5px' }} color={theme.text2} size={20} />}
                />
              </Box>
              <Hidden upToSmall={true}>
                <Box ml={10}>
                  <DropdownMenu
                    title="Sort by:"
                    options={SortOptions}
                    value={sortBy}
                    onSelect={value => {
                      onChangeSortBy(value)
                    }}
                    height="54px"
                  />
                </Box>
              </Hidden>
            </Box>
            <MobileGridContainer>
              <DropdownMenu
                options={menuItems}
                value={activeMenu}
                onSelect={value => {
                  setMenu(value)
                }}
              />
              <DropdownMenu
                title="Sort by:"
                options={SortOptions}
                value={sortBy}
                onSelect={value => {
                  onChangeSortBy(value)
                }}
              />
            </MobileGridContainer>
          </Box>
          {doesNotPoolExist && searchQuery ? (
            <Box textAlign="center" color="color4">
              {t('pool.noFarms')}
            </Box>
          ) : (
            <Scrollbars>
              <PanelWrapper>{children}</PanelWrapper>
            </Scrollbars>
          )}
        </>
      )
    }
  }

  return (
    <PoolsWrapper>
      {renderPoolCardListView()}
      <DetailModal stakingInfo={selectedPool} version={Number(version)} />
    </PoolsWrapper>
  )
}

export default PoolCardListView
