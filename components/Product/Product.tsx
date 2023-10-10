import { IProductProps } from "./Product.props"
import styles from "./Product.module.css"
import cn from "classnames"
import { Card } from "../Card/Card"
import { Rating } from "../Rating/Rating"
import { Tag } from "../Tag/Tag"
import { TagColors } from "../Tag/Tag.props"
import { Button } from "../Button/Button"
import { ButtonAppearance, ButtonArrow } from "../Button/Button.props"
import { declOfNum, priceRu } from "../../helpers/helpers"
import { Divider } from "../Divider/Divider"
import Image from "next/image"
import { CardColors } from "../Card/Card.props"
import React, { ForwardedRef, forwardRef, useRef, useState } from "react"
import { Review } from "../Review/Review"
import { ReviewForm } from "../ReviewForm/ReviewForm"
import { motion } from "framer-motion"

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: IProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): React.JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
      const reviewRef = useRef<HTMLDivElement>(null)
      const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }

      return (
        <div className={cn(className)} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              {priceRu(product.price)}
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color={TagColors.green}>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {priceRu(product.credit)}
              <span className={styles.month}>/мес</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag
                  className={styles.category}
                  key={c}
                  color={TagColors.ghost}
                >
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {product.reviewCount}{" "}
                {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
              </a>
            </div>

            <Divider className={styles.hr} />

            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((c) => (
                <div key={c.name} className={styles.characteristics}>
                  <span className={styles.characteristicsName}>{c.name}</span>
                  <span className={styles.characteristicsDots} />
                  <span className={styles.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>

            <Divider className={cn(styles.hr, styles.hr2)} />

            <div className={styles.actions}>
              <Button appearance={ButtonAppearance.primary}>
                Узнать подробнее
              </Button>
              <Button
                onClick={() => setIsReviewOpened(!isReviewOpened)}
                className={styles.reviewButton}
                appearance={ButtonAppearance.ghost}
                arrow={isReviewOpened ? ButtonArrow.down : ButtonArrow.right}
              >
                Читать подробнее
              </Button>
            </div>
          </Card>
          <Card
            color={CardColors.blue}
            className={cn(styles.reviews, {
              [styles.opened]: isReviewOpened,
              [styles.closed]: !isReviewOpened,
            })}
            ref={reviewRef}
          >
            {product.reviews.map((r) => (
              <React.Fragment key={r._id}>
                <Review review={r} />
                <Divider />
              </React.Fragment>
            ))}
            <ReviewForm productId={product._id} />
          </Card>
        </div>
      )
    }
  )
)
