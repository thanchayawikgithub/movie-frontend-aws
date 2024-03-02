<script setup lang="ts">
import MovieList from '@/components/movie/MovieList.vue'
import router from '@/router'

import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { onMounted, ref } from 'vue'

const movieStore = useMovieStore()
const movies = ref<Movie[]>([])
const toBookingPage = async (movieId: number) => {
  router.push({ name: 'booking', params: { movieId: movieId } })
}
</script>

<template>
  <v-container fluid style="color: white"
    ><v-row
      ><v-col cols="4"></v-col
      ><v-col cols="4" align="center">
        <v-btn variant="outlined" :width="250" :height="50" class="mt-5" style="font-weight: bold"
          >เลือกภาพยนตร์<v-overlay
            activator="parent"
            location="bottom center"
            location-strategy="connected"
            origin="auto"
          >
            <v-card class="pa-2" :width="1000" :height="715">
              <v-container fluid style="overflow-y: scroll; height: 100%"
                ><v-row>
                  <v-col v-for="movie in movies" :key="movie.movieId" cols="3"
                    ><v-card hover
                      ><v-card-title
                        style="
                          font-size: 14px;
                          background-color: #b91c1c;
                          color: white;
                          font-weight: bold;
                        "
                        >{{ movie.movieName }}</v-card-title
                      ><v-img
                        :src="`http://localhost:3000/movies/${movie?.movieId}/image`"
                        @click="toBookingPage(movie.movieId)"
                      ></v-img> </v-card
                  ></v-col> </v-row></v-container></v-card></v-overlay
        ></v-btn> </v-col
      ><v-col cols="4"></v-col
    ></v-row>
    <p style="font-size: 35px; text-align: center" class="mt-10">กำลังฉาย</p>
    <MovieList />
  </v-container>
</template>
<style></style>
