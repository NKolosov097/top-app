import styles from "./Sort.module.css"
import cn from "classnames"
import { ESortValues, ISortProps } from "./Sort.props"
import SortIcon from "./sort.svg"

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: ISortProps): React.JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(ESortValues.Rating)}
        className={cn({ [styles.active]: sort === ESortValues.Rating })}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        onClick={() => setSort(ESortValues.Price)}
        className={cn({ [styles.active]: sort === ESortValues.Price })}
      >
        <SortIcon className={styles.sortIcon} />
        По&nbsp;Цене
      </span>
    </div>
  )
}
