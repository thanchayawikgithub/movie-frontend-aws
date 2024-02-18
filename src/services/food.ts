import axios from './axios'
const getFoodsByCategory = (categoryId: number) => {
  return axios.get(`foods/category/${categoryId}`)
}

const getFoods = () => {
  return axios.get(`foods`)
}
export default { getFoodsByCategory, getFoods }
