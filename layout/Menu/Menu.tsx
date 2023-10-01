import { useContext } from "react"
import styles from "./Menu.module.css"
import cn from "classnames"
import { AppContext } from "../../context/app.context"
import { IFirstLevelMenuItem, IPageItem } from "../../interfaces/menu.interface"
import Link from "next/link"
import { useRouter } from "next/router"
import { firstLevelMenu } from "../../helpers/helpers"

export const Menu = (): React.JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext)
  const router = useRouter()

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            m.isOpened = !m.isOpened
          }

          return m
        })
      )
  }

  const buildThirdLevel = (pages: Array<IPageItem>, route: string) => {
    return (
      <>
        {pages.map((page) => (
          <Link
            key={page._id}
            href={`/${route}/${page.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]:
                `/${route}/${page.alias}` === router.asPath,
            })}
          >
            {page.category}
          </Link>
        ))}
      </>
    )
  }

  const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true
          }

          return (
            <div key={m._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
              >
                {m._id.secondCategory}
              </div>
              <div
                className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpened]: m.isOpened,
                })}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <li key={m.route}>
            <Link href={`/${m.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id === firstCategory,
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </>
    )
  }

  return <menu className={styles.menu}>{buildFirstLevel()}</menu>
}
