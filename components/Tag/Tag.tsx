import { ITagProps, TagColors, TagSizes } from "./Tag.props"
import styles from "./Tag.module.css"
import cn from "classnames"

export const Tag = ({
  size = TagSizes.s,
  color = TagColors.ghost,
  href,
  children,
  className,
  ...props
}: ITagProps): React.JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === TagSizes.s,
        [styles.m]: size === TagSizes.m,

        [styles.ghost]: color === TagColors.ghost,
        [styles.red]: color === TagColors.red,
        [styles.gray]: color === TagColors.gray,
        [styles.green]: color === TagColors.green,
        [styles.primary]: color === TagColors.primary,
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  )
}
