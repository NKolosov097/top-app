import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import axios from "axios"
import { withLayout } from "../../layout/Layout"
import { IMenuItem } from "../../interfaces/menu.interface"
import { firstLevelMenu } from "../../helpers/helpers"
import { ParsedUrlQuery } from "querystring"
import { API } from "../../helpers/api"

function Type({ firstCategory }: ITypeProps): React.JSX.Element {
  return <>Type: {firstCategory}</>
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((m) => "/" + m.route),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ITypeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type)
  if (!firstCategoryItem) return { notFound: true }
  const { data: menu } = await axios.post<Array<IMenuItem>>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  })

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
    },
  }
}

export interface ITypeProps extends Record<string, unknown> {
  menu: Array<IMenuItem>
  firstCategory: number
}
