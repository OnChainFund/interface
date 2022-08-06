// 上方列 刪除語言 黑白
import { NetworkSelection, useAccountBalanceHook } from '@pangolindex/components'
import React, { useState, useRef, useMemo } from 'react'
import { useActiveWeb3React } from '../../hooks'
import Web3Status from '../../components/Web3Status'
import Modal from '../../components/Modal'
import PngBalanceContent from './PngBalanceContent'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import {
  HeaderFrame,
  HeaderControls,
  HeaderElement,
  AccountElement,
  PNGAmount,
  PNGWrapper,
  NetworkCard,
  BalanceText
} from './styled'
import { Hidden, MEDIA_WIDTHS } from 'src/theme'
import { useChainId } from 'src/hooks'
import { NETWORK_CURRENCY, NETWORK_LABELS } from 'src/constants'
import { useMedia } from 'react-use'
import { MobileHeader } from './MobileHeader'
// import Logo from '../Logo'

interface Props {
  activeMobileMenu: boolean
  handleMobileMenu: () => void
}

export default function Header({ activeMobileMenu, handleMobileMenu }: Props) {
  const { account } = useActiveWeb3React()
  const chainId = useChainId()

  const useETHBalances = useAccountBalanceHook[chainId]

  const accounts = useMemo(() => (account ? [account] : []), [account])

  const userEthBalance = useETHBalances(chainId, accounts)?.[account ?? '']

  const [showPngBalanceModal, setShowPngBalanceModal] = useState(false)
  const [openNetworkSelection, setOpenNetworkSelection] = useState(false)
  // const [isDrawerCollapsed] = useState(true)
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.FARM)
  const toggle = useToggleModal(ApplicationModal.FARM)
  useOnClickOutside(node, open ? toggle : undefined)

  const closeNetworkSelection = () => {
    setOpenNetworkSelection(false)
  }

  const isMobile = useMedia(`(max-width: ${MEDIA_WIDTHS.upToMedium}px)`)

  return (
    <HeaderFrame>
      <Modal isOpen={showPngBalanceModal} onDismiss={() => setShowPngBalanceModal(false)}>
        {showPngBalanceModal && <PngBalanceContent setShowPngBalanceModal={setShowPngBalanceModal} />}
      </Modal>
      {isMobile ? (
        <MobileHeader activeMobileMenu={activeMobileMenu} handleMobileMenu={handleMobileMenu} />
      ) : (
        <HeaderControls>
          {/* <Logo collapsed={isDrawerCollapsed} /> */}
          <HeaderElement>
            <Hidden upToSmall={true}>
              <NetworkSelection open={openNetworkSelection} closeModal={closeNetworkSelection} />
              {chainId && NETWORK_LABELS[chainId] && (
                <NetworkCard
                  title={NETWORK_LABELS[chainId]}
                  onClick={() => setOpenNetworkSelection(!openNetworkSelection)}
                >
                  {NETWORK_LABELS[chainId]}
                </NetworkCard>
              )}
            </Hidden>
            <PNGWrapper onClick={() => setShowPngBalanceModal(true)}>
              <PNGAmount active={!!account} style={{ pointerEvents: 'auto' }}>
                PNG
              </PNGAmount>
            </PNGWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {NETWORK_CURRENCY[chainId]}
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </HeaderControls>
      )}
    </HeaderFrame>
  )
}
