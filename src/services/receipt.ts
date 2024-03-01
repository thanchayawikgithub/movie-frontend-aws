import type ReceiptDto from '@/types/receiptDto'
import axios from './axios'

const getReceipts = () => {
  return axios.get(`receipts`)
}

const getReceiptByCusId = (cusId: number) => {
  return axios.get(`receipts/customer/${cusId}`)
}
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
    cardId: receiptDto.recPaymentMethod === 'credit card' ? receiptDto.cardId : undefined
  })
}
export default { saveReceipt, getReceipts, getReceiptByCusId }
