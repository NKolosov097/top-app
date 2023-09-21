import { IFooterProps } from "./Footer.props"
import styles from "./Footer.module.css"
import cn from "classnames"
import { format } from "date-fns"

export const Footer = ({
  className,
  ...props
}: IFooterProps): React.JSX.Element => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div className={styles.first}>
        OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены
      </div>
      <a href="#" target="_blank" className={styles.userAgree}>
        пользовательское соглашение
      </a>
      <a href="#" target="_blank" className={styles.privacyPolicy}>
        Политика конфиденциальности
      </a>
    </footer>
  )
}
