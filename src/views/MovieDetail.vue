<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { mdiMapMarker, mdiVolumeHigh, mdiSofaSingle, mdiSofa, mdiClockOutline } from '@mdi/js'
import { onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()

onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
})
</script>
<template>
  <v-container fluid style="background-color: white">
    <v-row>
      <v-col cols="2" class="justify-center">
        <!-- <v-card
            :width="280"
            :height="350"
            class="mx-auto mt-0 pa-3"
            style="position: relative; z-index: 1"
          > -->
        <v-img
          class="ml-5"
          style="border-radius: 1rem"
          :width="280"
          :height="400"
          :src="`http://localhost:3000/movies/${movieId}/image`"
        ></v-img>
      </v-col>
      <v-col cols="3" class="d-flex flex-column ml-8 mt-2">
        <h1 class="mb-5" style="color: black">{{ movie?.movieName }}</h1>
        <p style="color: black">หมวดหมู่ : {{ movie?.categories.join() }}</p>
        <p class="mt-3" style="color: black">
          <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
          >{{ movie?.movieLength }} นาที
        </p>
        <v-btn
          rounded="xl"
          :width="250"
          :height="40"
          class="mt-5"
          @click="router.push({ name: 'booking' })"
          style="background: #b91c1c; color: white; font-weight: bold"
          >รอบฉายทั้งหมด</v-btn
        >
      </v-col>
      <v-col cols="6">
        <iframe
          style="border-radius: 1rem"
          class="ml-5"
          width="105%"
          height="100%"
          :src="`http://localhost:3000/movies/${movie?.movieId}/trailer`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </v-col>
    </v-row>
    <v-divider style="border: 1px solid black" class="mt-3 mb-3"></v-divider>
    <v-row>
      <v-col cols="7">
        <h2 class="mb-1" style="color: black">เรื่องย่อ</h2>
        <p class="mt-1" style="color: black">{{ movie?.movieDesc }} นาที</p></v-col
      >
    </v-row>
    <v-divider style="border: 1px solid black" class="mt-3 mb-3"></v-divider>
    <v-row>
      <v-col cols="7">
        <h2 class="mb-1" style="color: black">รีวิวภาพยนตร์</h2>
      </v-col>
    </v-row>
  </v-container>
</template>
