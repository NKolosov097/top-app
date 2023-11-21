import { KeyboardEvent, useContext, useState } from "react"
import styles from "./Menu.module.css"
import cn from "classnames"
import { AppContext } from "../../context/app.context"
import { IFirstLevelMenuItem, IPageItem } from "../../interfaces/menu.interface"
import Link from "next/link"
import { useRouter } from "next/router"
import { firstLevelMenu } from "../../helpers/helpers"
import { motion, useReducedMotion } from "framer-motion"

export const Menu = (): React.JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext)
  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>()
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
    },
    hidden: {
      marginBottom: 0,
    },
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      height: 0,
    },
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpened ? "closed" : "opened")
            m.isOpened = !m.isOpened
          }

          return m
        })
      )
  }

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault()
      openSecondLevel(secondCategory)
    }
  }

  const buildThirdLevel = (
    pages: Array<IPageItem>,
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((page) => (
      <motion.li key={page._id} variants={variantsChildren}>
        <Link
          tabIndex={isOpened ? 0 : -1}
          href={`/${route}/${page.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]:
              `/${route}/${page.alias}` === router.asPath,
          })}
          aria-current={
            `/${route}/${page.alias}` === router.asPath ? "page" : false
          }
        >
          {page.category}
        </Link>
      </motion.li>
    ))
  }

  const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true
          }

          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          )
        })}
      </ul>
    )
  }

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
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
      </ul>
    )
  }

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span role="log" className="visuallyHidden">
          {announce === "opened" ? "Развернуто" : "Свернуто"}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  )
}
