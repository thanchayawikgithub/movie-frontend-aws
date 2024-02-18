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
  return { addCustomer }
})
