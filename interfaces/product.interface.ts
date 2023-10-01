export interface IProductCharacteristic {
  value: string
  name: string
}

export interface IReviewModel {
  _id: string
  name: string
  title: string
  description: string
  rating: number
  createdAt: Date
}

export interface IProductModel {
  _id: string
  categories: Array<string>
  tags: Array<string>
  title: string
  link: string
  price: number
  credit: number
  oldPrice: number
  description: string
  characteristics: Array<IProductCharacteristic>
  createdAt: Date
  updatedAt: Date
  __v: number
  image: string
  initialRating: number
  reviews: Array<IReviewModel>
  reviewsCount: number
  reviewAvg?: number
  advantages: string
}
