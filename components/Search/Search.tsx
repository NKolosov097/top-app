// "use client"

import { ISearchProps } from "./Search.props"
import styles from "./Search.module.css"
import GlassIcon from "./glass.svg"
import cn from "classnames"
import { Input } from "../Input/Input"
import { Button } from "../Button/Button"
import { useState } from "react"
import { ButtonAppearance } from "../Button/Button.props"
import { useRouter } from "next/router"
import { KeyboardEvent } from "react"

export const Search = ({
  className,
  ...props
}: ISearchProps): React.JSX.Element => {
  const [search, setSearch] = useState<string>("")
  const router = useRouter()

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      return goToSearch()
    }

    return
  }

  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Button
        appearance={ButtonAppearance.primary}
        className={styles.button}
        onClick={goToSearch}
        aria-label="Искать по сайту"
      >
        <GlassIcon />
      </Button>
    </form>
  )
}
