import { IRatingProps } from "./Rating.props"
import styles from "./Rating.module.css"
import cn from "classnames"
import StarIcon from "./star.svg"
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
} from "react"

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      children,
      setRating,
      error,
      tabIndex,
      ...props
    }: IRatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): React.JSX.Element => {
    const [ratingArray, setRatingArray] = useState<Array<React.JSX.Element>>(
      new Array(5).fill(<></>)
    )
    const ratingArrayRef = useRef<Array<HTMLSpanElement | null>>([])

    useEffect(() => {
      constructRating(rating)
    }, [rating, tabIndex])

    const constructRating = (currentRating: number) => {
      const changeDisplay = (i: number) => {
        if (!isEditable) return

        constructRating(i)
      }

      const onClick = (i: number) => {
        if (!isEditable || !setRating) return

        setRating(i)
      }

      const handleKey = (e: KeyboardEvent) => {
        if (!isEditable || !setRating) return

        if (e.code === "ArrowUp" || e.code === "ArrowRight") {
          if (!rating) {
            setRating(1)
          } else {
            e.preventDefault()
            setRating(rating < 5 ? rating + 1 : 5)
          }
          ratingArrayRef.current[rating]?.focus()
        }

        if (e.code === "ArrowDown" || e.code === "ArrowLeft") {
          e.preventDefault()
          setRating(rating > 1 ? rating - 1 : 1)
          ratingArrayRef.current[rating - 2]?.focus()
        }
      }

      const computeFocus = (r: number, i: number): number => {
        if (!isEditable) return -1
        if (!rating && i === 0) return tabIndex ?? 0
        if (r === i + 1) return tabIndex ?? 0

        return -1
      }

      const updatedArray = ratingArray.map(
        (r: React.JSX.Element, i: number) => {
          return (
            <span
              className={cn(styles.star, {
                [styles.filled]: i < currentRating,
                [styles.editable]: isEditable,
              })}
              onMouseEnter={() => changeDisplay(i + 1)}
              onMouseLeave={() => changeDisplay(rating)}
              onClick={() => onClick(i + 1)}
              tabIndex={computeFocus(rating, i)}
              onKeyDown={handleKey}
              ref={(r) => ratingArrayRef.current?.push(r)}
              role={isEditable ? "slider" : ""}
              aria-invalid={error ? true : false}
              aria-aria-label={
                isEditable ? "Укажите рейтинг" : "Рейтинг" + rating
              }
              aria-valuemin={1}
              aria-valuenow={rating}
              aria-valuemax={5}
            >
              <StarIcon />
            </span>
          )
        }
      )

      setRatingArray(updatedArray)
    }

    return (
      <div
        ref={ref}
        className={cn(styles.filled, {
          [styles.error]: error,
        })}
        {...props}
      >
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
