import { CardColors, ICardProps } from "./Card.props"
import styles from "./Card.module.css"
import cn from "classnames"

export const Card = ({
  color = CardColors.white,
  children,
  className,
  ...props
}: ICardProps): React.JSX.Element => {
  return (
    <div
      className={cn(className, styles.card, {
        [styles.blue]: color === CardColors.blue,
      })}
      {...props}
    >
      {children}
    </div>
  )
}
