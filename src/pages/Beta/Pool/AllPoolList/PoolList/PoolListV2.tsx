import React, { useCallback, useEffect, useState, memo } from 'react'
import {
  MinichefStakingInfo,
  useSortFarmAprs,
  useFetchFarmAprs,
  useUpdateAllFarmsEarnAmount,
  sortingOnAvaxStake,
  sortingOnStakedAmount
} from 'src/state/stake/hooks'
import { DOUBLE_SIDE_STAKING_REWARDS_INFO } from 'src/state/stake/doubleSideConfig'
import PoolCardV2 from '../PoolCard/PoolCardV2'
import { useChainId } from 'src/hooks'
import useDebounce from 'src/hooks/useDebounce'
import { BIG_INT_ZERO, MINICHEF_ADDRESS } from 'src/constants'
import { usePoolDetailnModalToggle } from 'src/state/application/hooks'
import PoolCardListView, { SortingType } from './PoolCardListView'

export interface EarnProps {
  version: string
  stakingInfos: MinichefStakingInfo[]
  poolMap?: { [key: string]: number }
  setMenu: (value: string) => void
  activeMenu: string
  menuItems: Array<{ label: string; value: string }>
}

type StakingInfoByPid = { [pid: string]: MinichefStakingInfo }

const PoolListV2: React.FC<EarnProps> = ({ version, stakingInfos, setMenu, activeMenu, menuItems }) => {
  const chainId = useChainId()

  const [poolCardsLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery, 250)
  const [stakingInfoData, setStakingInfoData] = useState<MinichefStakingInfo[]>([])
  const [stakingInfoByPid, setStakingInfoByPid] = useState<StakingInfoByPid>({})

  const [selectedPoolIndex, setSelectedPoolIndex] = useState('')

  const togglePoolDetailModal = usePoolDetailnModalToggle()

  // fetch farms earned amount
  useUpdateAllFarmsEarnAmount()
  // fetch farms apr
  useFetchFarmAprs()

  const sortedFarmsApr = useSortFarmAprs()

  const handleSearch = useCallback(value => {
    setSearchQuery(value.trim())
  }, [])

  useEffect(() => {
    if (sortBy === SortingType.totalStakedInUsd) {
      const sortedFarms = [...stakingInfoData].sort(function(info_a, info_b) {
        return info_a.totalStakedInUsd?.greaterThan(info_b.totalStakedInUsd ?? BIG_INT_ZERO) ? -1 : 1
      })
      setStakingInfoData(sortedFarms)
    } else if (sortBy === SortingType.totalApr) {
      const sortedFarms = sortedFarmsApr
        .map(item => stakingInfoData.find(infoItem => infoItem?.pid === item.pid) as MinichefStakingInfo)
        .filter(element => !!element)
      setStakingInfoData(sortedFarms)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  useEffect(() => {
    if (stakingInfos?.length > 0) {
      const updatedStakingInfos = stakingInfos
        // sort by total staked
        .sort(sortingOnAvaxStake)
        .sort(sortingOnStakedAmount)

      let finalArr = updatedStakingInfos

      // if user has searched something, then filter those results
      if (debouncedSearchQuery) {
        const filtered = stakingInfos.filter(function(stakingInfo) {
          return (
            (stakingInfo?.tokens?.[0]?.symbol || '').toUpperCase().includes(debouncedSearchQuery.toUpperCase()) ||
            (stakingInfo?.tokens?.[1]?.symbol || '').toUpperCase().includes(debouncedSearchQuery.toUpperCase())
          )
        })

        finalArr = filtered
      }

      const finalArrByPid = finalArr.reduce((acc, info) => {
        acc[info?.pid] = info
        return acc
      }, {} as StakingInfoByPid)

      setStakingInfoByPid(finalArrByPid)
      setStakingInfoData(finalArr)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakingInfos, debouncedSearchQuery])

  const stakingRewardsExist = Boolean(
    //@dev if exist minicheft in chain then exist staking rewards because in deploy we added in minicheft pool PNG/WAVAX
    typeof chainId === 'number' &&
      ((DOUBLE_SIDE_STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0 || MINICHEF_ADDRESS[chainId])
  )
  const selectedPool = !!selectedPoolIndex ? stakingInfoByPid[selectedPoolIndex] : ({} as MinichefStakingInfo)

  return (
    <PoolCardListView
      version={version}
      setMenu={setMenu}
      activeMenu={activeMenu}
      menuItems={menuItems}
      handleSearch={handleSearch}
      onChangeSortBy={setSortBy}
      sortBy={sortBy}
      searchQuery={searchQuery}
      isLoading={(stakingRewardsExist && stakingInfoData?.length === 0 && !searchQuery) || poolCardsLoading}
      doesNotPoolExist={(!stakingRewardsExist || stakingInfoData?.length === 0) && !poolCardsLoading}
      selectedPool={selectedPool}
    >
      {stakingInfoData.map(stakingInfo => (
        <PoolCardV2
          key={stakingInfo?.pid}
          stakingInfo={stakingInfo}
          onClickViewDetail={() => {
            setSelectedPoolIndex(stakingInfo?.pid)
            togglePoolDetailModal()
          }}
          version={Number(version)}
        />
      ))}
    </PoolCardListView>
  )
}

export default memo(PoolListV2)
