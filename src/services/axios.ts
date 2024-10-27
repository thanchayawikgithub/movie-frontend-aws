import router from '@/router'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://18.140.217.116:3000'
})

instance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  async function (res) {
    // await delay(1000);
    return res
  },
  function (error) {
    // Do something with request error
    if (401 === error.response.status) {
      router.replace('/')
    }
    return Promise.reject(error)
  }
)

export default instance
