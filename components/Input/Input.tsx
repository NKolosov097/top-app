import { IInputProps } from "./Input.props"
import styles from "./Input.module.css"
import cn from "classnames"
import { ForwardedRef, forwardRef } from "react"

export const Input = forwardRef(
  (
    { className, error, ...props }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): React.JSX.Element => {
    return (
      <div className={cn(className, styles.inputWrapper)}>
        <input
          ref={ref}
          className={cn(styles.input, {
            [styles.error]: error,
          })}
          {...props}
        />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
