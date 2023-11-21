import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface IReviewFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  productId: string
  isOpened: boolean
}
