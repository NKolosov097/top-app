import { ReactNode } from "react"

export interface IHTagProps {
  tag: HTagValues
  children: ReactNode
}

export enum HTagValues {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
}
