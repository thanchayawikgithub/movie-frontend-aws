import type Card from './card'
import type Customer from './customer'
import type ReceiptFood from './receipt_food'

import type Ticket from './ticket'

export default interface Receipt {
  receiptId: number

  recTotalPrice: number

  recPaymentMethod: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  customer: Customer

  card: Card

  tickets: Ticket[]

  recfoods: ReceiptFood[]
}
