import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const showLoginDialog = ref(false)
  const showSignupDialog = ref(false)

  return { showLoginDialog, showSignupDialog }
})
