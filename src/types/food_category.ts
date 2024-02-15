import type Food from './foods'

export default interface FoodCategory {
  foodCatId: number

  foodCatName: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  foods: Food[]
}
