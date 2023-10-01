import { ISidebarProps } from "./Sidebar.props"
import styles from "./Sidebar.module.css"
import cn from "classnames"
import { Menu } from "../Menu/Menu"
import Logo from "../logo.svg"

export const Sidebar = ({
  className,
  ...props
}: ISidebarProps): React.JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>Search</div>
      <Menu />
    </div>
  )
}
