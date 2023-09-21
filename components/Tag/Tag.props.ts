import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export interface ITagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: TagSizes
  children: ReactNode
  color?: TagColors
  href?: string
}

export enum TagSizes {
  s = "s",
  m = "m",
}

export enum TagColors {
  ghost = "ghost",
  red = "red",
  gray = "gray",
  green = "green",
  primary = "primary",
}
