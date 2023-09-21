import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import { Button, HTag, P, Rating } from "../components"
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

const inter = Inter({ subsets: ["latin"] })

function Home(): React.JSX.Element {
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
    </>
  )
}

export default withLayout(Home)
