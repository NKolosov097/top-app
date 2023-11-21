import styles from "./Button.module.css"
import { ButtonAppearance, ButtonArrow, IButtonProps } from "./Button.props"
import ArrowIcon from "./arrow.svg"
import cn from "classnames"
import { motion, useMotionValue } from "framer-motion"

export const Button = ({
  appearance,
  arrow = ButtonArrow.none,
  children,
  className,
  ...props
}: IButtonProps): React.JSX.Element => {
  const scale = useMotionValue(1)

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(styles.button, className, {
        [styles.primary]: appearance === ButtonAppearance.primary,
        [styles.ghost]: appearance === ButtonAppearance.ghost,
      })}
      style={{ scale }}
      {...props}
    >
      {children}
      {arrow !== ButtonArrow.none && (
        <span
          className={cn(styles.arrow, {
            [styles.right]: arrow === ButtonArrow.right,
            [styles.down]: arrow === ButtonArrow.down,
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  )
}
