import styles from "./TopPageComponent.module.css"
import { ITopPageComponentProps } from "./TopPageComponent.props"
import {
  Advantages,
  Card,
  HTag,
  HhData,
  P,
  Product,
  Sort,
  Tag,
} from "../../components"
import { TagColors, TagSizes } from "../../components/Tag/Tag.props"
import { HTagValues } from "../../components/HTag/HTag.props"
import { ETopLevelCategory } from "../../interfaces/page.interface"
import { ESortValues } from "../../components/Sort/Sort.props"
import { useEffect, useReducer } from "react"
import { sortReducer } from "./sort.reducer"
import { declOfNum } from "../../helpers/helpers"
import { useReducedMotion } from "framer-motion"

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: ITopPageComponentProps): React.JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: ESortValues.Rating,
    }
  )
  const shouldReduceMotion = useReducedMotion()

  const setSort = (sort: ESortValues) => {
    dispatchSort({ type: sort })
  }

  useEffect(() => {
    dispatchSort({ type: "reset", initialState: products })
  }, [products])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag={HTagValues.h1}>{page.title}</HTag>
        {products && (
          <Tag
            color={TagColors.gray}
            size={TagSizes.m}
            aria-label={
              products.length +
              `${declOfNum(products.length, [
                "элемент",
                "элемента",
                "элементов",
              ])}`
            }
          >
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>

      <div role="list">
        {sortedProducts &&
          sortedProducts.map((p) => (
            <Product
              role="listitem"
              layout={shouldReduceMotion ? false : true}
              key={p._id}
              product={p}
            />
          ))}
      </div>

      <div className={styles.HHTitle}>
        <HTag tag={HTagValues.h2}>Вакансии - {page.category}</HTag>
        {products && (
          <Tag color={TagColors.red} size={TagSizes.m}>
            hh.ru
          </Tag>
        )}
      </div>

      {firstCategory === ETopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <HTag tag={HTagValues.h2}>Преимущества</HTag>
          <Advantages advantages={page.advantages} />
        </>
      )}

      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}

      <HTag tag={HTagValues.h2}>Получаемые навыки</HTag>

      {page.tags.map((t) => (
        <Tag key={t} color={TagColors.primary}>
          {t}
        </Tag>
      ))}
    </div>
  )
}
