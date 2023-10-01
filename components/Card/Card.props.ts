import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export interface ICardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: CardColors
  children: ReactNode
}

export enum CardColors {
  white = "white",
  blue = "blue",
}
