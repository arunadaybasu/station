import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useRoutes } from "react-router-dom"

import { ReactComponent as WalletIcon } from "styles/images/menu/Wallet.svg"
import { ReactComponent as NFTIcon } from "styles/images/menu/NFT.svg"
import { ReactComponent as HistoryIcon } from "styles/images/menu/History.svg"
import { ReactComponent as SwapIcon } from "styles/images/menu/Swap.svg"
import { ReactComponent as StakeIcon } from "styles/images/menu/Stake.svg"
import { ReactComponent as GovernanceIcon } from "styles/images/menu/Governance.svg"
import { ReactComponent as ContractIcon } from "styles/images/menu/Contract.svg"
import BurnIcon from "@mui/icons-material/LocalFireDepartment"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import StatusIcon from "@mui/icons-material/Storage"

/* menu */
import Dashboard from "pages/dashboard/Dashboard"
import Wallet from "pages/wallet/Wallet"
import NFT from "pages/nft/NFT"
import History from "pages/history/History"
import Stake from "pages/stake/Stake"
import Governance from "pages/gov/Governance"
import Contract from "pages/contract/Contract"
import Status from "pages/services/Status"

/* details */
import ValidatorDetails from "pages/stake/ValidatorDetails"
import ProposalDetails from "pages/gov/ProposalDetails"

/* txs */
import SendTx from "txs/send/SendTx"
import BurnTx from "txs/send/BurnTx"
import FundTx from "txs/send/FundTx"
import TransferCW721Tx from "txs/wasm/TransferCW721Tx"
import SwapTx from "txs/swap/SwapTx"
import SwapMultipleTx from "txs/swap/SwapMultipleTx"
import StakeTx from "txs/stake/StakeTx"
import WithdrawRewardsTx from "txs/stake/WithdrawRewardsTx"
import WithdrawCommissionTx from "txs/stake/WithdrawCommissionTx"
import SubmitProposalTx from "txs/gov/SubmitProposalTx"
import DepositTx from "txs/gov/DepositTx"
import VoteTx from "txs/gov/VoteTx"
import StoreCodeTx from "txs/wasm/StoreCodeTx"
import InstantiateContractTx from "txs/wasm/InstantiateContractTx"
import ExecuteContractTx from "txs/wasm/ExecuteContractTx"
import MigrateContractTx from "txs/wasm/MigrateContractTx"
import UpdateAdminContractTx from "txs/wasm/UpdateAdminContractTx"
import AnchorEarnTx from "txs/earn/AnchorEarnTx"
import SignMultisigTxPage from "pages/multisig/SignMultisigTxPage"
import PostMultisigTxPage from "pages/multisig/PostMultisigTxPage"

/* auth */
import Auth from "auth/modules/Auth"
import ManageNetworksPage from "auth/networks/ManageNetworksPage"
import AddNetworkPage from "auth/networks/AddNetworkPage"

/* settings */
import Settings from "pages/Settings"

/* labs */
import Labs from "pages/labs/Labs"

/* 404 */
import NotFound from "pages/NotFound"
import DonateAllVestingTokensTx from "txs/stake/DonateAllVestingTokensTx"

const ICON_SIZE = { width: 20, height: 20 }

export const useNav = () => {
  const { t } = useTranslation()

  const menu = [
    {
      path: "/wallet",
      element: <Wallet />,
      title: t("Wallet"),
      icon: <WalletIcon {...ICON_SIZE} />,
    },
    {
      path: "/history",
      element: <History />,
      title: t("History"),
      icon: <HistoryIcon {...ICON_SIZE} />,
    },
    {
      path: "/swap",
      element: <SwapTx />,
      title: t("Swap"),
      icon: <SwapIcon {...ICON_SIZE} />,
    },
    {
      path: "/stake",
      element: <Stake />,
      title: t("Stake"),
      icon: <StakeIcon {...ICON_SIZE} />,
    },
    {
      path: "/burn",
      element: <BurnTx />,
      title: t("Burn"),
      icon: <BurnIcon {...ICON_SIZE} />,
    },
    {
      path: "/fund",
      element: <FundTx />,
      title: t("Fund"),
      icon: <AccountBalanceIcon {...ICON_SIZE} />,
    },
    {
      path: "/gov",
      element: <Governance />,
      title: t("Governance"),
      icon: <GovernanceIcon {...ICON_SIZE} />,
    },
    {
      path: "/nft",
      element: <NFT />,
      title: t("NFT"),
      icon: <NFTIcon {...ICON_SIZE} />,
    },
    {
      path: "/contract",
      element: <Contract />,
      title: t("Contract"),
      icon: <ContractIcon {...ICON_SIZE} />,
    },
    {
      path: "/status",
      element: <Status />,
      title: t("Status"),
      icon: <StatusIcon {...ICON_SIZE} />,
    },
  ]

  const routes = [
    { path: "/", element: <Dashboard /> },

    /* pages */
    ...menu,
    { path: "/validator/:address", element: <ValidatorDetails /> },
    { path: "/proposal/:id", element: <ProposalDetails /> },

    /* multisig */
    { path: "/multisig/sign", element: <SignMultisigTxPage /> },
    { path: "/multisig/post", element: <PostMultisigTxPage /> },

    /* txs */
    { path: "/send", element: <SendTx /> },
    { path: "/nft/transfer", element: <TransferCW721Tx /> },
    { path: "/swap/multiple", element: <SwapMultipleTx /> },
    { path: "/stake/:address", element: <StakeTx /> },
    { path: "/rewards", element: <WithdrawRewardsTx /> },
    { path: "/commission", element: <WithdrawCommissionTx /> },
    { path: "/proposal/new", element: <SubmitProposalTx /> },
    { path: "/proposal/:id/deposit", element: <DepositTx /> },
    { path: "/proposal/:id/vote", element: <VoteTx /> },
    { path: "/contract/instantiate", element: <InstantiateContractTx /> },
    { path: "/contract/store", element: <StoreCodeTx /> },
    { path: "/contract/execute/:contract", element: <ExecuteContractTx /> },
    { path: "/contract/migrate/:contract", element: <MigrateContractTx /> },
    {
      path: "/contract/updateadmin/:contract",
      element: <UpdateAdminContractTx />,
    },
    { path: "/earn", element: <AnchorEarnTx /> },
    { path: "/donate", element: <DonateAllVestingTokensTx /> },

    /* auth */
    { path: "/auth/*", element: <Auth /> },
    { path: "/networks", element: <ManageNetworksPage /> },
    { path: "/network/new", element: <AddNetworkPage /> },
    { path: "/settings", element: <Settings /> },

    /* dev */
    { path: "/labs", element: <Labs /> },

    /* 404 */
    { path: "*", element: <NotFound /> },
  ]

  return { menu, element: useRoutes(routes) }
}

/* helpers */
export const useGoBackOnError = ({ error }: QueryState) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (error) navigate("..", { replace: true })
  }, [error, navigate])
}
