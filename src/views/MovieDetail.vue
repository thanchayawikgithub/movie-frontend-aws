<script setup lang="ts">
import router from '@/router'
import customer from '@/services/customer'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import type Review from '@/types/review'
import { mdiAccountCircle, mdiClockOutline } from '@mdi/js'
import { onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()
const reviews = ref<Review[]>()

const getFormattedTime = (dateObject: Date) => {
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const formattedTime = `${padZero(hours)}:${padZero(minutes)}`

  return formattedTime
}

const formatShowDate = (dateTime: Date | undefined): string => {
  if (!dateTime) return ''
  const dateObject = new Date(dateTime)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = dateObject.toLocaleDateString('th-TH', options)

  return formattedDate
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${padZero(minutes)}:${padZero(remainingSeconds)}`
}

const padZero = (value: number) => {
  // Add leading zero if the value is less than 10
  return value < 10 ? `0${value}` : value
}

onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
  reviews.value = await movieStore.getMovieReviews(movieId)
})
</script>
<template>
  <v-container fluid style="background: white; font-weight: bold">
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
      <v-col cols="11">
        <h2 class="mb-1 ml-5" style="color: black">เรื่องย่อ</h2>
        <p class="mt-1 ml-5" style="color: black; font-weight: 200">
          {{ movie?.movieDesc }}
        </p></v-col
      >
    </v-row>
    <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>
    <h2 class="mb-1 ml-5" style="color: black">รีวิวภาพยนตร์</h2>
    <v-row v-for="review in reviews" :key="review.reviewId" v-if="reviews && reviews?.length > 0">
      <v-col cols="7">
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">
          <v-icon color="#b91c1c">{{ mdiAccountCircle }}</v-icon>
          {{
            review.customer
              ? review.customer.cusFirstname + ' ' + review.customer.cusLastname
              : 'Anonymous'
          }}
        </p>
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">
          {{ formatShowDate(review.creatDate) }} |
          <span>{{ getFormattedTime(new Date(review.creatDate)) }}</span>
        </p>
        <p class="mb-1 ml-5" style="color: black; font-weight: 200">{{ review.reviewComment }}</p>
        <v-rating
          v-model="review.reviewRating"
          readonly
          size="large"
          class="ma-2 ml-3"
          density="compact"
          style="color: #b91c1c"
        ></v-rating>
      </v-col>
      <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>
    </v-row>
    <p v-else class="ml-5 mt-5" style="font-size: 25px; color: gray">ยังไม่มีรีวิว</p>
    <!-- <v-row>
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
    </v-row> -->
  </v-container>
</template>
