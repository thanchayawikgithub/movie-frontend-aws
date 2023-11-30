<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppBar from './components/appbar/AppBar.vue'
</script>
<template>
  <v-layout>
    <AppBar />
    <v-main style="background-color: #b91c1c; color: white"><RouterView /></v-main>
  </v-layout>
</template>
