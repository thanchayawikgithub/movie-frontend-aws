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
