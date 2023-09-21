import { IPProps, PSizes } from "./P.props"
import styles from "./P.module.css"
import cn from "classnames"

export const P = ({
  size = PSizes.m,
  children,
  className,
  ...props
}: IPProps): React.JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size === PSizes.s,
        [styles.m]: size === PSizes.m,
        [styles.l]: size === PSizes.l,
      })}
      {...props}
    >
      {children}
    </p>
  )
}
