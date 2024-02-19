import { defineStore } from 'pinia'
import receiptService from '@/services/receipt'
import type ReceiptDto from '@/types/receiptDto'
export const useReceiptStore = defineStore('receipt', () => {
  const saveReceipt = async (receiptDto: ReceiptDto) => {
    try {
      const response = await receiptService.saveReceipt(receiptDto)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return { saveReceipt }
})
