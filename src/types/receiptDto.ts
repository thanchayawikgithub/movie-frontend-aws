import type ShowtimeSeat from './showtime_seat'

export default interface ReceiptDto {
  cusId: number

  showId: number

  tickets: ShowtimeSeat[]

  receiptFoods: {
    foodId: number
    recFoodQty: number
    recFoodPrice: number
  }[]

  recTotalPrice: number

  recPaymentMethod: string

  cardId?: number
}
