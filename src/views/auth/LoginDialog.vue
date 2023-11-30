<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
<template>
  <v-dialog v-model="authStore.showLoginDialog"
    ><v-card :width="600" :height="700" class="mx-auto"
      ><p style="text-align: center; font-size: 30px; font-weight: bold">เข้าสู่ระบบ</p></v-card
    ></v-dialog
  >
</template>
