import { HTag } from "../components"
import { HTagValues } from "../components/HTag/HTag.props"
import { withLayout } from "../layout/Layout"

export function Error404(): React.JSX.Element {
  return (
    <>
      <HTag tag={HTagValues.h1}>Ошибка 404</HTag>
    </>
  )
}

export default withLayout(Error404)
