<script setup lang="ts">
import { mdiAccountOutline } from '@mdi/js'
</script>
<template>
  <v-app-bar style="color: #b91c1c; font-family: 'Times New Roman', Times, serif"
    ><v-row
      ><v-col cols="4"></v-col
      ><v-col cols="4">
        <p style="font-weight: bold; font-size: 36px; text-align: center">SCALA</p></v-col
      ><v-col cols="4"
        ><v-btn class="mt-2" :prepend-icon="mdiAccountOutline" rounded="xl"
          >สมัครสมาชิก/เข้าสู่ระบบ</v-btn
        ></v-col
      ></v-row
    ></v-app-bar
  >
</template>
<style scoped></style>
