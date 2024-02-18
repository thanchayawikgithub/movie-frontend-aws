import type Card from './card'
import type Receipt from './receipt'
import type Review from './review'

export default interface Customer {
  cusId: number

  cusFirstname: string

  cusLastname: string

  cusEmail: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  reviews: Review[]

  cards: Card[]

  receipts: Receipt[]
}
