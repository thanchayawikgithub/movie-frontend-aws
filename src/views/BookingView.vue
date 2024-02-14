<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { mdiClock, mdiClockOutline } from '@mdi/js'
import { onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const step = ref(1)
const movieStore = useMovieStore()
const movie = ref<Movie>()
onMounted(() => {
  movie.value = movieStore.nowShowingMovie.find((movie) => movie.id === movieId)
})
</script>
<template>
  <v-container fluid
    ><v-card :width="1200" :height="375" class="mx-auto mt-16 pa-3"
      ><v-row
        ><v-col cols="3"><v-img :src="movie?.poster"></v-img></v-col
        ><v-col cols="9" class="d-flex flex-column"
          ><h2 class="mb-5">{{ movie?.title }}</h2>
          <p>หมวดหมู่ : {{ movie?.tag.join() }}</p>
          <p class="mt-2">
            <v-icon>{{ mdiClockOutline }}</v-icon
            >{{ movie?.length }}
          </p>
          <v-btn :width="250" :height="40" variant="outlined" class="mt-5"
            >รายละเอียดภาพยนตร์</v-btn
          >
        </v-col></v-row
      ></v-card
    ><v-stepper alt-labels class="mt-5 mx-auto" v-model="step" :width="1500"
      ><v-stepper-header
        ><v-stepper-item title="เลือกรอบฉาย" :value="1"></v-stepper-item
        ><v-stepper-item title="เลือกที่นั่ง" :value="2"></v-stepper-item
        ><v-stepper-item title="การชำระเงิน" :value="3"></v-stepper-item
        ><v-stepper-item title="สิ้นสุด" :value="4"></v-stepper-item></v-stepper-header
      ><v-stepper-window
        ><v-stepper-window-item :value="1"
          ><v-row v-for="n in 5" style="height: 15vh"
            ><v-col
              ><v-row
                ><v-col cols="2"
                  ><p class="text-center" style="font-size: 18px">โรงภาพยนตร์ 3</p>
                  <v-divider vertical></v-divider></v-col
                ><v-col>s</v-col></v-row
              ></v-col
            ></v-row
          ></v-stepper-window-item
        ><v-stepper-window-item :value="2">2</v-stepper-window-item
        ><v-stepper-window-item :value="3">3</v-stepper-window-item
        ><v-stepper-window-item :value="4">4</v-stepper-window-item></v-stepper-window
      ></v-stepper
    ></v-container
  >
</template>
