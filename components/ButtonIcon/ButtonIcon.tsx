import styles from "./ButtonIcon.module.css"
import {
  ButtonAppearance,
  ButtonArrow,
  IButtonIconProps,
  icons,
} from "./ButtonIcon.props"
import cn from "classnames"

export const ButtonIcon = ({
  appearance,
  icon,
  className,
  ...props
}: IButtonIconProps): React.JSX.Element => {
  const IconComponent = icons[icon]

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === ButtonAppearance.primary,
        [styles.white]: appearance === ButtonAppearance.white,
      })}
      {...props}
    >
      <IconComponent />
    </button>
  )
}
