import { defineStore } from 'pinia'
import ticketService from '@/services/ticket'
export const useTicketStore = defineStore('ticket', () => {
  const getTicketByNumber = async (ticketNumber: string) => {
    try {
      const response = await ticketService.getTicketByNumber(ticketNumber)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return { getTicketByNumber }
})
