import { useTranslation } from "react-i18next"
import { AccAddress } from "@terra-rebels/terra.js"
import { getAmount } from "utils/coin"
import { useTokenBalance } from "data/queries/wasm"
import { useBankBalance } from "data/queries/bank"
import { useTokenItem } from "data/token"
import { Page } from "components/layout"
import TxContext from "../TxContext"
import FundForm from "./FundForm"

const FundTx = () => {
  const { t } = useTranslation()
  const bankBalance = useBankBalance()

  const token = "uluna"

  const { data: cw20Balance, ...state } = useTokenBalance(token)
  const tokenItem = useTokenItem(token)

  const symbol = tokenItem?.symbol ?? ""
  const balance = AccAddress.validate(token)
    ? cw20Balance
    : getAmount(bankBalance, token)

  return (
    <Page {...state} title={t("Fund Community Pool", { symbol })}>
      <TxContext>
        {tokenItem && balance && <FundForm {...tokenItem} balance={balance} />}
      </TxContext>
    </Page>
  )
}

export default FundTx
