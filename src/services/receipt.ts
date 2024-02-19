import type ReceiptDto from '@/types/receiptDto'
import axios from './axios'

const saveReceipt = (receiptDto: ReceiptDto) => {
  return axios.post('receipts', {
    cusId: receiptDto.cusId,
    recTotalPrice: receiptDto.recTotalPrice,
    recPaymentMethod: receiptDto.recPaymentMethod,
    showId: receiptDto.showId,
    tickets: receiptDto.tickets.map((ticket) => ({ showtimeSeatId: ticket.showSeatId })),
    receiptFoods: receiptDto.receiptFoods.map((recFood) => ({
      foodId: recFood.food.foodId,
      recFoodQty: recFood.recFoodQty,
      recFoodPrice: recFood.recFoodPrice
    })),
    card: receiptDto.recPaymentMethod === 'credit card' ? receiptDto.cardId : undefined
  })
}
export default { saveReceipt }
