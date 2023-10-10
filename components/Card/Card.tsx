import { CardColors, ICardProps } from "./Card.props"
import styles from "./Card.module.css"
import cn from "classnames"
import { ForwardedRef, forwardRef } from "react"

export const Card = forwardRef(
  (
    { color = CardColors.white, children, className, ...props }: ICardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): React.JSX.Element => {
    return (
      <div
        className={cn(className, styles.card, {
          [styles.blue]: color === CardColors.blue,
        })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
