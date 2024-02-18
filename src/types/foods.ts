import type FoodCategory from './food_category'
import type ReceiptFood from './receipt_food'

export default interface Food {
  foodId: number

  foodName: string

  foodImage: string

  foodPrice: number

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  foodcat: FoodCategory

  recfoods: ReceiptFood[]
}
