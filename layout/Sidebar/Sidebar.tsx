import { ISidebarProps } from "./Sidebar.props"
import styles from "./Sidebar.module.css"
import cn from "classnames"

export const Sidebar = ({ ...props }: ISidebarProps): React.JSX.Element => {
  return <div {...props}>Sidebar</div>
}
