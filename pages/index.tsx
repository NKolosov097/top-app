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
    <>
      <HTag tag={HTagValues.h1}>Some Text</HTag>
      <Button
        appearance={ButtonAppearance.primary}
        onClick={() => console.log("ji")}
        arrow={ButtonArrow.right}
      >
        Кнопка
      </Button>
      <Button appearance={ButtonAppearance.ghost} arrow={ButtonArrow.down}>
        Кнопка
      </Button>
      <P size={PSizes.s}>I am Paragraph</P>
      <Tag size={TagSizes.m}>I am Tag</Tag>
      <Rating rating={counter} setRating={setCounter} isEditable></Rating>
      <Input />
      <Textarea />
    </>
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
