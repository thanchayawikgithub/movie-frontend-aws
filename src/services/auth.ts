import axios from './axios'
const signIn = (email: string, password: string) => {
  return axios.post('auth/signIn', { email: email, password: password })
}
export default { signIn }
