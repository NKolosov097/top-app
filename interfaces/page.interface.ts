export enum ETopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export interface ITopPageAdvantage {
  _id: string
  title: string
  description: string
}

export interface IHHData {
  _id: string
  count: number
  juniorSalary: number
  middleSalary: number
  seniorSalary: number
  updateAt: Date
}

export interface ITopPageModel {
  tags: Array<string>
  _id: string
  secondCategory: string
  alias: string
  title: string
  category: string
  seoText?: string
  tagsTitle: string
  metaTitle: string
  metaDescription: string
  firstCategory: ETopLevelCategory
  advantages?: Array<ITopPageAdvantage>
  createdAt: Date
  updatedAt: Date
  __v: number
  hh?: IHHData
}
