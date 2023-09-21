import { IRatingProps } from "./Rating.props"
import styles from "./Rating.module.css"
import cn from "classnames"
import StarIcon from "./star.svg"
import { useEffect, useState, KeyboardEvent } from "react"

export const Rating = ({
  isEditable = false,
  rating,
  children,
  setRating,
  ...props
}: IRatingProps): React.JSX.Element => {
  const [ratingArray, setRatingArray] = useState<Array<React.JSX.Element>>(
    new Array(5).fill(<></>)
  )

  useEffect(() => {
    constructRating(rating)
  }, [rating])

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: React.JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
              isEditable && handleSpace(i + 1, e)
            }
          />
        </span>
      )
    })

    const changeDisplay = (i: number) => {
      if (!isEditable) return

      constructRating(i)
    }

    const onClick = (i: number) => {
      if (!isEditable || !setRating) return

      setRating(i)
    }

    const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
      if (e.code != "Space" || !setRating) return

      setRating(i)
    }
    setRatingArray(updatedArray)
  }

  return (
    <div className={cn(styles.filled, {})} {...props}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  )
}
