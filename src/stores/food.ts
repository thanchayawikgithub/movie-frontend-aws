import { defineStore } from 'pinia'
import foodService from '@/services/food'
export const useFoodStore = defineStore('food', () => {
  const getFoodByCat = async (catId: number) => {
    try {
      const response = await foodService.getFoodsByCategory(catId)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  const getFoods = async () => {
    try {
      const response = await foodService.getFoods()
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
  return { getFoodByCat, getFoods }
})
