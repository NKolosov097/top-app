import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export interface IPProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: PSizes
  children: ReactNode
}

export enum PSizes {
  s = "s",
  m = "m",
  l = "l",
}
