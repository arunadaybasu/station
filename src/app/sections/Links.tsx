import { useTranslation } from "react-i18next"
import DescriptionIcon from "@mui/icons-material/Description"
import { FORUMS } from "config/constants"
import { ExternalLink } from "components/general"
import { Contacts } from "components/layout"
import styles from "./Links.module.scss"

const Links = () => {
  const { t } = useTranslation()

  const community = {
    discord: "https://discord.gg/K6Yd8xhYTF",
    telegram: "https://t.me/OfficialTerraRebels",
    twitter: "https://twitter.com/TerraRebels",
    github: "https://github.com/terra-rebels",
  }

  return (
    <div className={styles.links}>
      <div className={styles.forums}>
        <ExternalLink href={FORUMS} className={styles.link}>
          <DescriptionIcon style={{ fontSize: 18 }} />
          {t("Support Forums")}
        </ExternalLink>
      </div>

      <div className={styles.community}>
        <Contacts contacts={community} menu />
      </div>
    </div>
  )
}

export default Links
