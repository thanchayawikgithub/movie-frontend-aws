<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { mdiMapMarker, mdiVolumeHigh, mdiSofaSingle, mdiSofa } from '@mdi/js'
import { onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()
const deluxes = ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'AA']
const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
onMounted(() => {
  movie.value = movieStore.nowShowingMovie.find((movie) => movie.id === movieId)
})
</script>
<template>
  <v-container fluid>
    <v-card
      :width="1200"
      :height="375"
      class="mx-auto mt-5 pa-3"
      style="position: relative; z-index: 2"
    >
      <v-row>
        <v-col cols="3">
          <!-- <v-card
            :width="280"
            :height="350"
            class="mx-auto mt-0 pa-3"
            style="position: relative; z-index: 1"
          > -->
          <v-img :src="movie?.poster"></v-img>
        </v-col>
        <v-col cols="9" class="d-flex flex-column">
          <h2 class="mb-5">{{ movie?.title }}</h2>
          <p style="color: #b91c1c; font-weight: bold" class="ml-1">24 ธันวาคม 2023 | 10:30</p>
          <p style="color: #b91c1c; font-weight: bold" class="mt-3">
            <v-icon>{{ mdiMapMarker }}</v-icon
            >สกาลา บางแสน
          </p>
          <p class="ml-1 mt-4">
            โรงภาพยนตร์ 3 | <v-icon>{{ mdiVolumeHigh }}</v-icon> ENG/TH
          </p>
        </v-col>
      </v-row>
    </v-card>
    <v-card :height="580" class="mt-3">
      <v-row>
        <v-col cols="3"
          ><v-card
            variant="outlined"
            :height="90"
            :width="100"
            class="ml-5 mt-5 pt-2"
            style="font-size: 13px; font-weight: bold; text-align: center"
            >โรงภาพยนตร์<br />
            <p style="font-size: 30px; text-align: center">3</p></v-card
          ></v-col
        ><v-col cols="1"
          ><v-icon size="35" class="mt-7 ml-1" color="#fb7185">{{ mdiSofaSingle }}</v-icon
          ><br /><span>Deluxe </span><br />
          <span class="pl-1">170฿</span></v-col
        ><v-col cols="1"
          ><v-icon size="35" class="mt-7 ml-3" color="#e11d48">{{ mdiSofaSingle }}</v-icon
          ><br /><span>Premium </span><br />
          <span class="pl-3">190฿</span></v-col
        ><v-col cols="3"
          ><v-icon size="35" class="mt-7 ml-8" color="#881337">{{ mdiSofa }}</v-icon
          ><br /><span>Sofa Sweet(Pair) </span><br />
          <span class="pl-8">500฿</span></v-col
        >
        <v-col
          ><v-card
            :height="540"
            :width="450"
            class="mt-5"
            style="position: absolute; background-color: #b91c1c"
            >ssd</v-card
          ></v-col
        >
      </v-row>
      <v-row
        ><v-col style="text-align: center"
          ><v-card
            rounded="0"
            :width="950"
            :height="50"
            class="ml-6 ;"
            variant="outlined"
            style="color: #b91c1c"
            ><p style="color: black; font-weight: bold" class="pt-2">จอภาพยนตร์</p></v-card
          ></v-col
        ></v-row
      ><v-row
        v-for="(deluxe, index) in deluxes"
        :key="index"
        class="mt-3 ml-4"
        style="font-size: 12px; font-weight: bold"
        ><p class="mt-2">{{ deluxe }}</p>
        <v-icon v-for="(seat, index) in seats" :key="index" class="ml-5" size="29">{{
          mdiSofaSingle
        }}</v-icon>
      </v-row>
    </v-card>
  </v-container>
</template>
