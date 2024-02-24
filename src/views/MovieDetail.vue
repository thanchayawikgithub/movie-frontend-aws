<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { mdiMapMarker, mdiVolumeHigh, mdiSofaSingle, mdiSofa, mdiClockOutline } from '@mdi/js'
import { onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()
const rating = ref(4)
onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
})
</script>
<template>
  <v-container fluid style="background: white; color:; font-weight: bold">
    <v-row>
      <v-col cols="2" class="justify-center">
        <v-card
          class="ml-5 mt-1"
          style="border-radius: 1rem; background: #b91c1c"
          :width="275"
          :height="400"
        >
          <v-img
            class="mt-2 ml-2"
            style="border-radius: 1rem"
            :width="260"
            :height="385"
            :src="`http://localhost:3000/movies/${movieId}/image`"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="3" class="d-flex flex-column ml-8 mt-2">
        <h1 class="mb-5 mt-5 ml-7" style="color: black">{{ movie?.movieName }}</h1>
        <p style="color: black; font-weight: 200" class="ml-7">
          หมวดหมู่ : {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
        </p>
        <p class="mt-3 ml-7" style="color: black; font-weight: 200">
          <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
          >{{ movie?.movieLength }} นาที
        </p>
        <v-btn
          rounded="xl"
          :width="250"
          :height="40"
          class="mt-5 ml-7"
          @click="router.push({ name: 'booking' })"
          style="
            background: linear-gradient(to right, #b91c1c, #ff6640);
            color: white;
            font-weight: bold;
          "
          >รอบฉายทั้งหมด</v-btn
        >
      </v-col>
      <v-col cols="6">
        <iframe
          style="border-radius: 1rem"
          class="ml-5"
          width="105%"
          height="100%"
          :src="`http://www.youtube.com/embed/${movie?.movieTrailer}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </v-col>
    </v-row>
    <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>

    <v-row>
      <v-col cols="7">
        <h2 class="mb-1 ml-5" style="color: black">เรื่องย่อ</h2>
        <p class="mt-1 ml-5" style="color: black; font-weight: 200">
          {{ movie?.movieDesc }}
        </p></v-col
      >
    </v-row>
    <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>
    <v-row>
      <v-col cols="7">
        <h2 class="mb-1 ml-5" style="color: black">รีวิวภาพยนตร์</h2>
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">1521****545</p>
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">24 ธันวาคม 2567 10:50</p>

        <v-rating
          v-model="rating"
          readonly
          size="large"
          class="ma-2 ml-3"
          density="compact"
          style="color: #b91c1c"
        ></v-rating>
      </v-col>
    </v-row>
    <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>
    <v-row>
      <v-col cols="7">
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">ภัทร***จำ</p>
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">25 ธันวาคม 2567 05:50</p>

        <v-rating
          v-model="rating"
          readonly
          size="large"
          class="ma-2 ml-3"
          density="compact"
          style="color: #b91c1c"
        ></v-rating>
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">
          สนุกมากเนื้อเรื่องดี cg ดีมาก
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" align="center"
        ><v-btn
          rounded="xl"
          :width="250"
          :height="40"
          class="mt-5"
          @click="router.push({ name: 'review' })"
          style="
            background: linear-gradient(to right, #b91c1c, #ff6640);
            color: white;
            font-weight: bold;
          "
          >รีวิว</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>
