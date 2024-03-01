import axios from './axios'
const addCustomer = (data: {
  email: string
  password: string
  firstname: string
  lastname: string
}) => {
  return axios.post('customers', {
    cusEmail: data.email,
    cusPassword: data.password,
    cusFirstname: data.firstname,
    cusLastname: data.lastname
  })
}

const getCustomer = (cusId: number) => {
  return axios.get(`customers/${cusId}`)
}
export default { addCustomer, getCustomer }
