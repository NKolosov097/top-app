import { ESortValues } from "../../components/Sort/Sort.props"
import { IProductModel } from "../../interfaces/product.interface"

export type TSortActions =
  | { type: ESortValues.Price }
  | { type: ESortValues.Rating }
  | { type: "reset"; initialState: Array<IProductModel> }

export interface ISortReducerState {
  sort: ESortValues
  products: Array<IProductModel>
}

export const sortReducer = (
  state: ISortReducerState,
  action: TSortActions
): ISortReducerState => {
  switch (action.type) {
    case ESortValues.Rating:
      return {
        sort: ESortValues.Rating,
        products: state.products.sort((a, b) =>
          a.initialRating > b.initialRating ? -1 : 1
        ),
      }
    case ESortValues.Price:
      return {
        sort: ESortValues.Price,
        products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
      }

    case "reset":
      return {
        sort: ESortValues.Rating,
        products: action.initialState,
      }
    default:
      return state
  }
}
