import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export interface IButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onAnimationStart" | "onDragStart" | "onDrag" | "onDragEnd" | "ref"
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
