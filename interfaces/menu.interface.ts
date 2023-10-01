import { ETopLevelCategory } from "./page.interface"

export interface IPageItem {
  alias: string
  title: string
  _id: string
  category: string
}

export interface IMenuItem {
  _id: {
    secondCategory: string
  }
  isOpened?: boolean
  pages: Array<IPageItem>
}

export interface IFirstLevelMenuItem {
  route: string
  name: string
  icon: React.JSX.Element
  id: ETopLevelCategory
}
