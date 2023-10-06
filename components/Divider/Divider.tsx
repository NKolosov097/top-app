import { IDividerProps } from "./Divider.props"
import styles from "./Divider.module.css"
import cn from "classnames"

export const Divider = ({
  className,
  ...props
}: IDividerProps): React.JSX.Element => {
  return <hr className={cn(className, styles.hr)} {...props} />
}
