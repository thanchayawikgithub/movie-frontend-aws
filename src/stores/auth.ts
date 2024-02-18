import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import authService from '@/services/auth'
import type Customer from '@/types/customer'

export const useAuthStore = defineStore('auth', () => {
  const showLoginDialog = ref(false)
  const showSignupDialog = ref(false)

  const isLoggedIn = () => {
    return !!localStorage.getItem('access_token')
  }

  const getCurrentUser = async () => {
    const token = localStorage.getItem('access_token') || ''
    const decode: any = jwtDecode(token)
    const customer: Customer = decode.sub
    return customer
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.signIn(email, password)
      localStorage.setItem('access_token', response.data.access_token)
      showLoginDialog.value = false
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const signOut = () => {
    localStorage.removeItem('access_token')
    window.location.reload()
  }

  return {
    showLoginDialog,
    showSignupDialog,
    signIn,
    getCurrentUser,
    isLoggedIn,
    signOut
  }
})
