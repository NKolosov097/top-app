import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  appearance: ButtonAppearance
  arrow?: ButtonArrow
}

export enum ButtonAppearance {
  primary = "primary",
  ghost = "ghost",
}

export enum ButtonArrow {
  right = "right",
  down = "down",
  none = "none",
}
