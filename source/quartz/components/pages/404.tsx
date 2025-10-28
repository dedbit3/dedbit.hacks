import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article style={{ textAlign: "center" }} class="popover-hint">
      <h1 style={{ textAlign: "center" }}>404</h1>
      <p style={{ textAlign: "center" }}>
        <img src="/img/sadRat.gif" alt="Rat" width="50%" />
      </p>
      <p style={{ textAlign: "center" }}>Why u trynna fuzz?</p>
      <p style={{ textAlign: "center" }}>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir} style={{ textAlign: "center" }}>{i18n(cfg.locale).pages.error.home}</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
