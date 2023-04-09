import { PropsWithChildren } from "react"
import { has } from "utils/num"
import { useCurrency } from "data/settings/Currency"
import { useMemoizedPrices } from "data/queries/oracle"
import { Grid, Card } from "components/layout"
import { Props as CardProps } from "components/layout/Card"
import { Read } from "components/token"
import { Tag } from "components/display"
import styles from "./StakedCard.module.scss"

interface Props extends CardProps {
  amount: Amount
  value?: Value
}

const StakedCard = (props: PropsWithChildren<Props>) => {
  const currency = useCurrency()
  const denom = currency === "uluna" ? "uusd" : currency
  const { amount, children } = props
  const { data: prices } = useMemoizedPrices(denom)

  return (
    <Card {...props} onClick={has(amount) ? props.onClick : undefined}>
      <Grid gap={2}>
        <span className={styles.amount}>
          <Read amount={amount} denom="uluna" />{" "}
          <span className={styles.small}>{children}</span>
        </span>
        {prices && (
          <div>
            <Tag color={"success"}>
              {"$ "}
              <Read amount={String(prices.uluna * Number(amount))} auto />
            </Tag>
          </div>
        )}
      </Grid>
    </Card>
  )
}

export default StakedCard
