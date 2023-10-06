import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface ISortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: ESortValues
  setSort: (sort: ESortValues) => void
}

export enum ESortValues {
  Rating,
  Price,
}
