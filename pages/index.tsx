import { Inter } from "@next/font/google"
import { Button, HTag, Input, P, Rating, Textarea } from "../components"
import { HTagValues } from "../components/HTag/HTag.props"
import {
  ButtonAppearance,
  ButtonArrow,
} from "../components/Button/Button.props"
import { PSizes } from "../components/P/P.props"
import { Tag } from "../components/Tag/Tag"
import { TagSizes } from "../components/Tag/Tag.props"
import { useState } from "react"
import { withLayout } from "../layout/Layout"
import { GetStaticProps } from "next"
import axios from "axios"
import { IMenuItem } from "../interfaces/menu.interface"
import { API } from "../helpers/api"

const inter = Inter({ subsets: ["latin"] })

function Home({ menu }: IHomeProps): React.JSX.Element {
  const [counter, setCounter] = useState<number>(3)

  return (
    <section>
      <HTag tag={HTagValues.h1} >
        <div style={{ width: '100%', textAlign: 'center', color: 'var(--primary);' }}>
          OWL top
        </div>
      </HTag>

      <P size={PSizes.l} style={{ marginTop: 20 }}>В этом приложении Вы можете посмотреть каталог всех курсов и посмотреть реализацию доступности</P>

      <P size={PSizes.m} style={{ marginTop: 40 }}>
        Можете посмотреть другие проекты и дать обратную связь тут &nbsp;
        <a href="https://github.com/NKolosov097" style={{ color: 'var(--primary);' }}>@NKolosov097</a>
        🙂
      </P>
    </section>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<Array<IMenuItem>>(API.topPage.find, {
    firstCategory,
  })

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
