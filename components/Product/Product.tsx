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

export const Product = ({
  product,
  className,
  ...props
}: IProductProps): React.JSX.Element => {
  return (
    <Card className={styles.product}>
      <div className={styles.logo}>
        <img
          src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
          alt={product.title}
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
          <Tag className={styles.category} key={c} color={TagColors.ghost}>
            {c}
          </Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>кредит</div>
      <div className={styles.rateTitle}>
        {product.reviewCount}{" "}
        {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
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

      <Divider className={styles.hr} />

      <div className={styles.actions}>
        <Button appearance={ButtonAppearance.primary}>Узнать подробнее</Button>
        <Button
          className={styles.reviewButton}
          appearance={ButtonAppearance.ghost}
          arrow={ButtonArrow.right}
        >
          Читать подробнее
        </Button>
      </div>
    </Card>
  )
}