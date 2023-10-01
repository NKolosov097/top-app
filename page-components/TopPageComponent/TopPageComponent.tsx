import styles from "./TopPageComponent.module.css"
import { ITopPageComponentProps } from "./TopPageComponent.props"
import { Advantages, Card, HTag, HhData, P, Tag } from "../../components"
import { TagColors, TagSizes } from "../../components/Tag/Tag.props"
import { HTagValues } from "../../components/HTag/HTag.props"
import { ETopLevelCategory } from "../../interfaces/page.interface"

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: ITopPageComponentProps): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag={HTagValues.h1}>{page.title}</HTag>
        {products && (
          <Tag color={TagColors.gray} size={TagSizes.m}>
            {products.length}
          </Tag>
        )}
        <span>Сортировка</span>
      </div>

      <div>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
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
