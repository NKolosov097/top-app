import { HTag } from "../components"
import { HTagValues } from "../components/HTag/HTag.props"
import { withLayout } from "../layout/Layout"

function Error500(): React.JSX.Element {
  return (
    <>
      <HTag tag={HTagValues.h1}>Ошибка 500</HTag>
    </>
  )
}

export default withLayout(Error500)
