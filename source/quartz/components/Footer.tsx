import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

//#region uexport default ((opts?: Options) => {
//#region u  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
//#region u    const year = new Date().getFullYear()
//#region u    const links = opts?.links ?? []
//#region u    return (
//#region u      <footer class={`${displayClass ?? ""}`}>
//#region u        <p>
//#region u          {i18n(cfg.locale).components.footer.createdWith}{" "}
//#region u          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
//#region u        </p>
//#region u        <ul>
//#region u          {Object.entries(links).map(([text, link]) => (
//#region u            <li>
//#region u              <a href={link}>{text}</a>
//#region u            </li>
//#region u          ))}
//#region u        </ul>
//#region u      </footer>
//#region u    )
//#region u  }
//#region u
//#region u  Footer.css = style
//#region u  return Footer
//#region u}) satisfies QuartzComponentConstructor
