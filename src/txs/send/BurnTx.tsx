import { useTranslation } from "react-i18next"
import { AccAddress } from "@terra-rebels/terra.js"
import { getAmount } from "utils/coin"
import { useTokenBalance } from "data/queries/wasm"
import { useBankBalance } from "data/queries/bank"
import { useTokenItem } from "data/token"
import { Page } from "components/layout"
import TxContext from "../TxContext"
import BurnForm from "./BurnForm"

const BurnTx = () => {
  const { t } = useTranslation()
  const bankBalance = useBankBalance()

  const token = "uluna"

  const { data: cw20Balance, ...state } = useTokenBalance(token)
  const tokenItem = useTokenItem(token)

  const balance = AccAddress.validate(token)
    ? cw20Balance
    : getAmount(bankBalance, token)

  return (
    <Page {...state} title={t("Burn LUNC")}>
      <TxContext>
        {tokenItem && balance && <BurnForm {...tokenItem} balance={balance} />}
      </TxContext>
    </Page>
  )
}

export default BurnTx
