import axios from './axios'
const getFoodsByCategory = (categoryId: number) => {
  return axios.post(`foods/category/${categoryId}`)
}
export default { getFoodsByCategory }
