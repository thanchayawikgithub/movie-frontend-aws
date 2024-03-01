import { defineStore } from 'pinia'
import customerService from '@/services/customer'

export const useCustomerStore = defineStore('customer', () => {
  const addCustomer = async (data: {
    email: string
    password: string
    firstname: string
    lastname: string
  }) => {
    try {
      await customerService.addCustomer(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCustomer = async (cusId: number) => {
    try {
      const response = await customerService.getCustomer(cusId)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
  return { addCustomer, getCustomer }
})
