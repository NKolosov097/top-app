import { withLayout } from "../../layout/Layout"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import axios from "axios"
import { IMenuItem } from "../../interfaces/menu.interface"
import {
  ETopLevelCategory,
  ITopPageModel,
} from "../../interfaces/page.interface"
import { ParsedUrlQuery } from "querystring"
import { IProductModel } from "../../interfaces/product.interface"
import { firstLevelMenu } from "../../helpers/helpers"
import { TopPageComponent } from "../../page-components"

function TopPage({
  page,
  products,
  firstCategory,
}: ITopPageProps): React.JSX.Element {
  return (
    <TopPageComponent
      page={page}
      products={products}
      firstCategory={firstCategory}
    />
  )
}

export default withLayout(TopPage)

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: Array<string> = []
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<Array<IMenuItem>>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      { firstCategory: m.id }
    )

    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
    )
  }

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ITopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type)
  if (!firstCategoryItem) return { notFound: true }

  try {
    const { data: menu } = await axios.post<Array<IMenuItem>>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      { firstCategory: firstCategoryItem.id }
    )
    if (menu.length === 0) {
      return { notFound: true }
    }

    const { data: page } = await axios.get<ITopPageModel>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
    )
    const { data: products } = await axios.post<Array<IProductModel>>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
      { category: page.category, limit: 10 }
    )

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    }
  } catch (e) {
    return { notFound: true }
  }
}

export interface ITopPageProps extends Record<string, unknown> {
  menu: Array<IMenuItem>
  firstCategory: ETopLevelCategory
  page: ITopPageModel
  products: Array<IProductModel>
}