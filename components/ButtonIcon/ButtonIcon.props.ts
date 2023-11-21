import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import up from "./up.svg"
import close from "./close.svg"
import menu from "./menu.svg"

export const icons = {
  up,
  close,
  menu,
}

export type TIconName = keyof typeof icons

export interface IButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: TIconName
  appearance: ButtonAppearance
}

export enum ButtonAppearance {
  primary = "primary",
  white = "white",
}

export enum ButtonArrow {
  right = "right",
  down = "down",
  none = "none",
}
