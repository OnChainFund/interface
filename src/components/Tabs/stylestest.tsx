import { Box } from '@pangolindex/components'
import styled from 'styled-components'

export const PageWrapper = styled(Box)`
  width: 100%;
`
// !!右下方塊比例 100% 0% ->暫時news消失
export const TopContainer = styled(Box)`
  display: grid;
  // margin-right: 120 px;
  // margin-left: 320 px;
  grid-template-columns: 20% 80%;
  grid-gap: 12px;
  margin-bottom: 22px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: none;
    grid-template-rows: max-content auto;
    margin-bottom: 0px;
  `};
`
// Portfolio Value in All Chains
// Connect a wallet to see your Portfolio
export const StatsWrapper = styled(Box)`
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 12px;
`
// Dashboard
// Greetings kind guests! Let’s ape in today…
export const PageTitle = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.text7};

  ${({ theme }) => theme.mediaWidth.upToSmall`
   font-size: 22px;
  `};
`
// Dashboard
// Greetings kind guests! Let’s ape in today…
export const PageDescription = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text8};

  ${({ theme }) => theme.mediaWidth.upToSmall`
   font-size: 14px;
  `};
`
