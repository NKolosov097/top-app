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
      <span className={styles.sortName} id="sort">
        Сортировка
      </span>
      <button
        id="sortByRating"
        onClick={() => setSort(ESortValues.Rating)}
        className={cn({ [styles.active]: sort === ESortValues.Rating })}
        tabIndex={0}
        aria-labelledby="sort sortByRating"
        aria-selected={sort === ESortValues.Rating}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id="sortByPrice"
        onClick={() => setSort(ESortValues.Price)}
        className={cn({ [styles.active]: sort === ESortValues.Price })}
        tabIndex={0}
        aria-labelledby="sort sortByPrice"
        aria-selected={sort === ESortValues.Price}
      >
        <SortIcon className={styles.sortIcon} />
        По&nbsp;Цене
      </button>
    </div>
  )
}
