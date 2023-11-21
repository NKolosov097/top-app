import { IReviewFormProps } from "./ReviewForm.props"
import styles from "./ReviewForm.module.css"
import cn from "classnames"
import { Input } from "../Input/Input"
import { Rating } from "../Rating/Rating"
import { Textarea } from "../Textarea/Textarea"
import { Button } from "../Button/Button"
import { ButtonAppearance } from "../Button/Button.props"
import CloseIcon from "./close.svg"
import { useForm, Controller } from "react-hook-form"
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface"
import axios, { AxiosError } from "axios"
import { API } from "../../helpers/api"
import { useState } from "react"

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: IReviewFormProps): React.JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      )
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setError("Что-то пошло не так...")
      }
    } catch (e) {
      setError((e as AxiosError).message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={cn(className, styles.reviewForm)}>
        <Input
          {...register("name", {
            required: { value: true, message: "Заполните имя" },
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register("title", {
            required: { value: true, message: "Заполните заголовок отзыва" },
          })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />

        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: "Укажите рейтинг" },
            }}
            render={({ field }) => (
              <Rating
                ref={field.ref}
                isEditable
                rating={field.value}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          ></Controller>
        </div>

        <Textarea
          {...register("description", {
            required: {
              value: true,
              message: "Заполните текст (описание) отзыва",
            },
          })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Текст отзыва"
          aria-invalid={errors.description ? true : false}
        />

        <div className={styles.submit}>
          <Button
            onClick={() => clearErrors()}
            appearance={ButtonAppearance.primary}
            tabIndex={isOpened ? 0 : -1}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>

      {isSuccess && (
        <div className={styles.success} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо! Ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.closeIcon}
            onClick={() => setIsSuccess(false)}
            aria-label="Закрыть оповещение об успешной отправке отзыва"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {error && (
        <div className={styles.error} role="alert">
          Что-то пошло не так, попробуйте обновить страницу
          <button
            className={styles.closeIcon}
            onClick={() => setError(undefined)}
            aria-label="Закрыть оповещение о неудачной отправке отзыва"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  )
}
