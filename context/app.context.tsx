import { PropsWithChildren, ReactNode, createContext, useState } from "react"
import { IMenuItem } from "../interfaces/menu.interface"
import { ETopLevelCategory } from "../interfaces/page.interface"

export interface IAppContext {
  menu: Array<IMenuItem>
  firstCategory: ETopLevelCategory
  setMenu?: (newMenu: Array<IMenuItem>) => void
}

export const AppContext = createContext<IAppContext>({
  menu: [],
  firstCategory: ETopLevelCategory.Courses,
})

export const AppContextProvider = ({
  menu,
  firstCategory,
  children,
}: PropsWithChildren<IAppContext>): React.JSX.Element => {
  const [menuState, setMenuState] = useState<Array<IMenuItem>>(menu)
  const setMenu = (newMenu: Array<IMenuItem>) => {
    setMenuState(newMenu)
  }

  return (
    <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
      {children}
    </AppContext.Provider>
  )
}
