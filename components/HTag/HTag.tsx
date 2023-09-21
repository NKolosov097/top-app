import { HTagValues, IHTagProps } from "./HTag.props"
import styles from "./HTag.module.css"

export const HTag = ({ tag, children }: IHTagProps): React.JSX.Element => {
  switch (tag) {
    case HTagValues.h1:
      return <h1 className={styles.h1}>{children}</h1>
    case HTagValues.h2:
      return <h2 className={styles.h2}>{children}</h2>
    case HTagValues.h3:
      return <h3 className={styles.h3}>{children}</h3>
    default:
      return <></>
  }
}
