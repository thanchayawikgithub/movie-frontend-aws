<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { mdiTagOutline, mdiClockTimeThreeOutline } from '@mdi/js'
import router from '@/router'
import { onMounted, ref } from 'vue'
import type Movie from '@/types/movie'

const movieStore = useMovieStore()
const movies = ref<Movie[]>([])
const toBookingPage = async (movieId: number) => {
  router.push({ name: 'booking', params: { movieId: movieId } })
}

onMounted(async () => {
  ///ข้อมูล
  movies.value = await movieStore.getMovies()
  console.log(movies.value)
})
</script>
<template>
  <v-container fluid style="padding-inline: 10vw"
    ><v-row
      ><v-col cols="3" v-for="movie in movies" :key="movie.movieId" align="center"
        ><v-hover v-slot="{ isHovering, props }">
          <v-card
            class="ma-5"
            :height="400"
            :width="280"
            v-bind="props"
            :elevation="isHovering ? 10 : 0"
            style="border-radius: 1rem"
            @click="toBookingPage(movie.movieId)"
          >
            <v-img
              :src="`http://localhost:3000/movies/${movie?.movieId}/image`"
              :height="385"
              :width="260"
              style="margin-top: 5px; border-radius: 1rem"
            >
              <v-sheet
                v-if="isHovering"
                style="background-color: rgba(0, 0, 0, 0.8); color: white; height: 100%"
                class="pa-4"
              >
                <p style="font-size: 22px">{{ movie.movieName }}</p>
                <div class="d-flex mt-3">
                  <v-icon>{{ mdiTagOutline }}</v-icon>
                  <p style="font-size: 15px" class="ml-3">
                    {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
                  </p>
                </div>
                <div class="d-flex mt-3">
                  <v-icon>{{ mdiClockTimeThreeOutline }}</v-icon>
                  <p style="font-size: 15px" class="ml-3">{{ movie.movieLength }} นาที</p>
                </div>
                <p style="text-align: center; font-size: 18px; margin-top: 12rem">
                  คลิกเพื่อดูเพิ่มเติม
                </p>
              </v-sheet>
            </v-img>
          </v-card>
        </v-hover></v-col
      ></v-row
    ></v-container
  >
</template>
<style scoped></style>
