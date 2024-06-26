import { ILayoutProps } from "./Layout.props"
import styles from "./Layout.module.css"
import cn from "classnames"
import { Sidebar } from "./Sidebar/Sidebar"
import { Header } from "./Header/Header"
import { Footer } from "./Footer/Footer"
import { FunctionComponent, KeyboardEvent, useRef, useState } from "react"
import { AppContextProvider, IAppContext } from "../context/app.context"
import { Up } from "../components"

const Layout = ({ children }: ILayoutProps): React.JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false)
  const mainRef = useRef<HTMLElement>(null)

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault()
      mainRef.current?.focus()
    }

    setIsSkipLinkDisplayed(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={0}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed,
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.main} ref={mainRef} tabIndex={0} role="main">
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): React.JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
