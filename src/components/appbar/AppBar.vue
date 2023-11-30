<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { mdiAccountOutline } from '@mdi/js'
import router from '@/router'
const authStore = useAuthStore()
</script>
<template>
  <v-app-bar style="font-family: 'Times New Roman', Times, serif" density="default"
    ><v-row
      ><v-col cols="4"></v-col
      ><v-col cols="4" align="center">
        <p
          style="
            font-weight: bold;
            font-size: 36px;
            text-align: center;
            color: #b91c1c;
            cursor: pointer;
            display: inline;
          "
          @click="router.push({ name: 'home' })"
        >
          SCALA
        </p></v-col
      ><v-col cols="4"
        ><v-btn
          class="mt-2"
          :prepend-icon="mdiAccountOutline"
          rounded="xl"
          style="background: linear-gradient(to right, #b91c1c, #ff6640); color: white"
          @click="authStore.showLoginDialog = true"
          >สมัครสมาชิก/เข้าสู่ระบบ</v-btn
        ></v-col
      ></v-row
    ></v-app-bar
  >
</template>
<style scoped></style>
