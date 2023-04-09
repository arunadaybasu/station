import { useTranslation } from "react-i18next"
import { Page } from "components/layout"

const Status = () => {
  const { t } = useTranslation()

  return (
    <Page title={t("Services Status")}>
      {t("Service available at ")}
      <a href="https://status.terrarebels.net">
        https://status.terrarebels.net
      </a>
      <iframe
        title="Status"
        style={{ border: "none", height: "2600px" }}
        src="https://status.terrarebels.net"
        width="100%"
      />
    </Page>
  )
}

export default Status
