import type Food from './foods'
import type ShowtimeSeat from './showtime_seat'

export default interface ReceiptDto {
  cusId: number

  showId: number

  tickets: ShowtimeSeat[]

  receiptFoods: {
    food: Food
    recFoodQty: number
    recFoodPrice: number
  }[]

  recTotalPrice: number

  recPaymentMethod: string

  cardId?: number
}
