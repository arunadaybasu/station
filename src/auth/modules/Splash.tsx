import { FlexColumn } from "components/layout"
import { useThemeAnimation } from "data/settings/Theme"
import { useTranslation } from "react-i18next"
import styles from "./Splash.module.scss"

const Splash = () => {
  const { t } = useTranslation()
  const animation = useThemeAnimation()

  return (
    <FlexColumn gap={20} className={styles.screen}>
      <img src={animation} alt="" width={80} height={80} />
      <h1>{t("Initializing app...")}</h1>
    </FlexColumn>
  )
}

export default Splash
