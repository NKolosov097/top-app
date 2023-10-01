import { ILayoutProps } from "./Layout.props"
import styles from "./Layout.module.css"
import cn from "classnames"
import { Sidebar } from "./Sidebar/Sidebar"
import { Header } from "./Header/Header"
import { Footer } from "./Footer/Footer"
import { FunctionComponent } from "react"
import { AppContextProvider, IAppContext } from "../context/app.context"

const Layout = ({ children }: ILayoutProps): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.main}>{children}</main>
      <Footer className={styles.footer} />
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
