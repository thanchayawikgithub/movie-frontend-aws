<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import { useAuthStore } from '@/stores/auth'
import { useReceiptStore } from '@/stores/receipt'
import type Movie from '@/types/movie'
import type Receipt from '@/types/receipt'
import { mdiMapMarker, mdiCalendarToday, mdiFood, mdiVolumeHigh } from '@mdi/js'
import { onMounted, ref } from 'vue'

const receiptStore = useReceiptStore()
const movieStore = useMovieStore()
const authStore = useAuthStore()
const receipts = ref<Receipt[]>([])
const movie = ref<Movie>()
const movieHistoryDetailDialog = ref(false)

const handleReviewButtonClick = async (selectedMovieId: number) => {
  // Now you can use selectedMovieId as needed
  movie.value = await movieStore.getMovie(selectedMovieId)
  router.push({ name: 'review', params: { movieId: selectedMovieId } })
}

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
  const currentUser = await authStore.getCurrentUser()

  receipts.value = await receiptStore.getReceiptByCusId(currentUser!.cusId)

  console.log(receipts.value)
})
</script>
<template>
  <v-container fluid style="background: white; color:; font-weight: bold">
    <h1 style="color: black; font-weight: 200" class="ml-7 mb-5">ประวัติการจอง</h1>
    <v-row v-for="receipt in receipts" :key="receipt.receiptId">
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
            :src="`http://localhost:3000/movies/${receipt.tickets[0].showtime.movie.movieId}/image`"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="3" class="d-flex flex-column mt-12 ml-7">
        <h1 class="mb-5 mt-5 ml-7" style="color: black">
          {{ receipt.tickets[0].showtime.movie.movieName }}
        </h1>

        <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-6">
          <v-icon class="mr-2">{{ mdiMapMarker }}</v-icon
          >สกาลาบางแสน
        </p>
        <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-6">
          <v-icon class="mr-2">{{ mdiCalendarToday }}</v-icon>
          {{ formatShowDate(receipt.tickets[0].showtime.showDate) }} |
          <span>{{ getFormattedTime(new Date(receipt.tickets[0].showtime.showStart)) }}</span>
        </p>
        <p style="color: black; font-weight: 600; font-size: larger" class="ml-7">
          <v-icon class="mr-2">{{ mdiFood }}</v-icon
          >อาหาร/เครื่องดื่ม <span style="color: #b91c1c">(ยังไม่ได้รับ)</span>
        </p>
        <v-row>
          <v-col cols="5">
            <v-btn
              rounded="xl"
              :width="150"
              :height="40"
              class="mt-6 ml-7"
              @click="movieHistoryDetailDialog = true"
              style="
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              >ดูรายละเอียด</v-btn
            >
          </v-col>

          <v-col>
            <v-btn
              rounded="xl"
              :width="150"
              :height="40"
              class="mt-6 ml-2"
              @click="handleReviewButtonClick(receipt.tickets[0].showtime.movie.movieId)"
              style="
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              >รีวิว</v-btn
            ></v-col
          >
        </v-row>
      </v-col>
      <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>
      <v-dialog v-model="movieHistoryDetailDialog" width="auto">
        <v-card :width="1200" :height="700">
          <v-row>
            <v-col cols="2" class="justify-center">
              <v-card
                class="ml-10 mt-5"
                style="border-radius: 1rem; background: #b91c1c"
                :width="190"
                :height="265"
              >
                <v-img
                  class="mt-2"
                  style="border-radius: 1rem"
                  :width="200"
                  :height="250"
                  :src="`http://localhost:3000/movies/${receipt.tickets[0].showtime.movie.movieId}/image`"
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="10">
              <v-row>
                <v-col cols="8" class="d-flex flex-column mt-12 ml-16">
                  <h1 class="mb-2 mt-5 ml-7" style="color: black">
                    {{ receipt.tickets[0].showtime.movie.movieName }}
                  </h1>
                  <p style="color: black; font-size: medium" class="ml-7">
                    <v-icon>{{ mdiVolumeHigh }}</v-icon
                    >ENG/TH
                  </p>
                </v-col>
                <v-col class="d-flex flex-column mt-12 ml-16">
                  <p style="color: black; font-weight: 600; font-size: larger" class="mt-5 ml-7">
                    ราคารวม
                  </p>
                  <p class="ml-7" style="color: #b91c1c; font-weight: 600; font-size: 30px">
                    {{ receipt.tickets[0].ticketPrice }}฿
                  </p>
                </v-col>
              </v-row>
              <v-divider
                style="border: 1px solid black"
                class="mt-3 mb-3 ml-16 mr-5 border-opacity-40"
              ></v-divider>
              <v-row>
                <v-col cols="3" class="d-flex flex-column ml-16">
                  <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-2">
                    <v-icon>{{ mdiMapMarker }}</v-icon
                    >สกาลาบางแสน
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="d-flex flex-column ml-16">
                  <p style="color: black; font-weight: 600; font-size: medium" class="ml-10">
                    โรงภาพยนต์
                  </p>
                  <p class="ml-16 pl-4" style="color: #b91c1c; font-weight: 600; font-size: 25px">
                    1
                  </p>
                </v-col>
                <v-col cols="5" class="d-flex flex-column ml-10">
                  <p style="color: black; font-weight: 600; font-size: medium" class="ml-7">
                    ที่นั่ง
                  </p>
                  <p class="ml-2" style="color: #b91c1c; font-weight: 600; font-size: 25px">
                    {{ receipt.tickets[0].seat }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-7">
                <v-col cols="4" class="d-flex flex-column ml-16">
                  <p style="color: black; font-weight: 600; font-size: medium" class="ml-10 pl-8">
                    วันที่
                  </p>
                  <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 16px">
                    {{ formatShowDate(receipt.tickets[0].showtime.showDate) }}
                  </p>
                </v-col>
                <v-col cols="4" class="d-flex flex-column ml-10">
                  <p style="color: black; font-weight: 600; font-size: medium" class="ml-7">เวลา</p>
                  <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 16px">
                    {{ getFormattedTime(new Date(receipt.tickets[0].showtime.showStart)) }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-7">
                <v-col cols="8" class="d-flex flex-column ml-16">
                  <p style="color: black; font-weight: 600; font-size: medium" class="ml-6">
                    อาหาร/เครื่องดื่ม
                  </p>
                  <p class="ml-0" style="color: #b91c1c; font-weight: 600; font-size: 16px">
                    {{ receipt.recfoods[0].food.foodName }} x
                    <span>1</span>
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-7">
                <v-col cols="8" class="d-flex flex-column ml-16">
                  <p style="color: black; font-weight: 600; font-size: medium" class="ml-6">
                    รหัสการซื้อ
                  </p>
                  <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 25px">
                    {{ receipt.tickets[0].ticketNumber }}
                  </p>
                </v-col>
                <v-col class="d-flex flex-column">
                  <p
                    class="mt-15"
                    style="color: #b91c1c; font-weight: 600; font-size: 25px; text-align: center"
                  >
                    ชำระเงินแล้ว
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn
              block
              @click="movieHistoryDetailDialog = false"
              style="font-weight: bold"
              color="#b91c1c"
              >ปิด</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
