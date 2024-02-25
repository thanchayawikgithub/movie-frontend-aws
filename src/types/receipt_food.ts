import type Food from './foods'
import type Receipt from './receipt'

export default interface ReceiptFood {
  recFoodId: number

  recFoodQty: number

  recFoodPrice: number

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  food: Food

  receipt: Receipt
}
