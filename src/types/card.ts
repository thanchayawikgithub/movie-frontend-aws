import type Customer from './customer'
import type Receipt from './receipt'

export default interface Card {
  cardId: number

  cardHolderName: string

  cardNumber: string

  cardMaskNumber?: string

  cardExpiredDate: string

  cardCvv: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  customer: Customer

  receipts: Receipt[]
}
