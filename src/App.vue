<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppBar from './components/appbar/AppBar.vue'
import LoginDialog from './views/auth/LoginDialog.vue'
import SignUpDialog from './views/auth/SignUpDialog.vue'
</script>
<template>
  <LoginDialog />
  <SignUpDialog />
  <v-layout>
    <AppBar />
    <v-main style="background-color: #b91c1c; color: white"><RouterView /></v-main>
  </v-layout>
</template>
