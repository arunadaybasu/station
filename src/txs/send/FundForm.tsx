import { useCallback, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { AccAddress } from "@terra-rebels/terra.js"
import {
  MsgExecuteContract,
  MsgFundCommunityPool,
} from "@terra-rebels/terra.js"
import { isDenom, toAmount } from "@terra-rebels/kitchen-utils"
import { queryKey } from "data/query"
import { useAddress } from "data/wallet"
import { useBankBalance } from "data/queries/bank"
import { useTnsAddress } from "data/external/tns"
import { Auto, Card, Grid } from "components/layout"
import { Form, FormItem, Input, FormWarning } from "components/form"
import { getPlaceholder, toInput, CoinInput } from "../utils"
import validate from "../validate"
import Tx, { getInitialGasDenom } from "../Tx"

interface TxValues {
  recipient?: string // AccAddress | TNS
  address?: AccAddress // hidden input
  input?: number
  memo?: string
}

interface Props extends TokenItem {
  decimals: number
  balance: Amount
}

const BurnForm = ({ token, decimals, balance }: Props) => {
  const { t } = useTranslation()
  const connectedAddress = useAddress()
  const bankBalance = useBankBalance()

  /* tx context */
  const initialGasDenom = getInitialGasDenom(bankBalance)

  /* form */
  const form = useForm<TxValues>({ mode: "onChange" })
  const { register, trigger, watch, setValue, setError, handleSubmit } = form
  const { formState } = form
  const { errors } = formState
  const { recipient, input } = watch()
  const burnAddress = "terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu"

  const amount = toAmount(input, { decimals })

  /* resolve recipient */
  const { data: resolvedAddress, ...tnsState } = useTnsAddress(recipient ?? "")
  useEffect(() => {
    console.log(recipient)
    if (!recipient) {
      setValue("address", undefined)
      console.log("is !")
      setValue("address", burnAddress)
      setValue("recipient", burnAddress)
    } else if (AccAddress.validate(recipient)) {
      setValue("address", recipient)
      form.setFocus("input")
    } else if (resolvedAddress) {
      setValue("address", resolvedAddress)
    } else {
      setValue("address", recipient)
      setValue("address", burnAddress)
      setValue("recipient", burnAddress)
    }
  }, [form, recipient, resolvedAddress, setValue])

  // validate(tns): not found
  const invalid =
    recipient?.endsWith(".ust") && !tnsState.isLoading && !resolvedAddress
      ? t("Address not found")
      : ""

  const disabled =
    invalid || (tnsState.isLoading && t("Searching for address..."))

  useEffect(() => {
    if (invalid) setError("recipient", { type: "invalid", message: invalid })
  }, [invalid, setError])

  /* tx */
  const createTx = useCallback(
    ({ address, input, memo }: TxValues) => {
      if (!connectedAddress) return
      if (!(address && AccAddress.validate(address))) return
      const amount = toAmount(input, { decimals })
      const execute_msg = { transfer: { recipient: address, amount } }

      const msgs = isDenom(token)
        ? [new MsgFundCommunityPool(connectedAddress, amount + token)]
        : [new MsgExecuteContract(connectedAddress, token, execute_msg)]

      return { msgs, memo }
    },
    [connectedAddress, decimals, token]
  )

  /* fee */
  const coins = [{ input, denom: token, taxRequired: true }] as CoinInput[]
  const estimationTxValues = useMemo(
    () => ({ address: connectedAddress, input: toInput(1, decimals) }),
    [connectedAddress, decimals]
  )

  const onChangeMax = useCallback(
    async (input: number) => {
      setValue("input", input)
      await trigger("input")
    },
    [setValue, trigger]
  )

  const tx = {
    token,
    decimals,
    amount,
    coins,
    balance,
    initialGasDenom,
    estimationTxValues,
    createTx,
    disabled,
    onChangeMax,
    onSuccess: { label: t("Wallet"), path: "/wallet" },
    taxRequired: true,
    queryKeys: AccAddress.validate(token)
      ? [[queryKey.wasm.contractQuery, token, { balance: connectedAddress }]]
      : undefined,
  }

  return (
    <Auto
      columns={[
        <Card isFetching={tnsState.isLoading}>
          <Tx {...tx}>
            {({ max, fee, submit }) => (
              <Form onSubmit={handleSubmit(submit.fn)}>
                <Grid gap={4}>
                  <FormWarning>
                    {t(
                      "You are about to send a lunc amount to the community pool (distribution module), this operation cannot be reversed"
                    )}
                  </FormWarning>
                </Grid>

                <FormItem
                  label={t("Amount")}
                  extra={max.render()}
                  error={errors.input?.message}
                >
                  <Input
                    {...register("input", {
                      valueAsNumber: true,
                      validate: validate.input(
                        toInput(max.amount, decimals),
                        decimals
                      ),
                    })}
                    token={token}
                    inputMode="decimal"
                    onFocus={max.reset}
                    placeholder={getPlaceholder(decimals)}
                  />
                </FormItem>

                {fee.render()}
                {submit.button}
              </Form>
            )}
          </Tx>
        </Card>,
        <div />,
      ]}
    />
  )
}

export default BurnForm
