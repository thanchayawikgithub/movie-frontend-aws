<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { mdiTicket, mdiClockOutline } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()
const isTicket = ref(false)
const rating = ref(0)

const isCheckTicket = () => {
  isTicket.value = Boolean(movie?.value?.movieId)
}

onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
})
</script>
<template>
  <v-container fluid style="background: white; font-weight: bold">
    <v-row>
      <v-col cols="2">
        <h1 style="color: black; font-weight: 200" class="ml-7">รีวิว</h1>
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
      <v-col cols="4" class="d-flex flex-column ml-8 mt-2">
        <h1 class="mb-5 mt-10 ml-7" style="color: black">{{ movie?.movieName }}</h1>
        <p style="color: black; font-weight: 200" class="ml-7">
          หมวดหมู่ : {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
        </p>
        <p class="mt-3 ml-7" style="color: black; font-weight: 200">
          <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
          >{{ movie?.movieLength }} นาที
        </p>
        <v-row class="mt-2">
          <v-col cols="9" style="color: black">
            <v-text-field
              :v-model="movie?.movieId"
              :prepend-icon="mdiTicket"
              class="ml-5"
              label="กรอกหมายเลขตั๋วของท่าน หรือ ทำการเข้าสู่ระบบ"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              rounded="xl"
              :width="120"
              :height="40"
              class="mt-2"
              @click="isCheckTicket"
              style="
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              >ตรวจสอบ</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="isTicket">
          <div class="ml-4" style="color: #b91c1c">
            <v-rating v-model="rating" hover half-increments></v-rating>
          </div>
        </v-row>
        <v-textarea
          v-if="isTicket"
          style="color: #b91c1c"
          class="ml-5 mt-3"
          :height="250"
          label="แสดงความคิดเห็น"
          variant="outlined"
        ></v-textarea>
        <v-btn
          v-if="isTicket"
          rounded="xl"
          :width="120"
          :height="40"
          class="mt-2 ml-4"
          @click="router.push({ name: 'movieDetail' })"
          style="
            background: linear-gradient(to right, #b91c1c, #ff6640);
            color: white;
            font-weight: bold;
          "
          >รีวิว</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
