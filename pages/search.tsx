import { withLayout } from "../layout/Layout"
import { GetStaticProps } from "next"
import axios from "axios"
import { IMenuItem } from "../interfaces/menu.interface"

function Search(): React.JSX.Element {
  return <>Search</>
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<Array<IMenuItem>>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
    { firstCategory }
  )

  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

export interface IHomeProps extends Record<string, unknown> {
  menu: Array<IMenuItem>
  firstCategory: number
}
