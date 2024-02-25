<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import {
  mdiMapMarker,
  mdiCalendarToday,
  mdiSofaSingle,
  mdiFood,
  mdiClockOutline,
  mdiVolumeHigh
} from '@mdi/js'
import { onMounted, ref } from 'vue'

// const movieId = +router.currentRoute.value.params.movieId.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()
const movieHistoryDetailDialog = ref(false)

onMounted(async () => {
  // movie.value = await movieStore.getMovie(movieId)
})
</script>
<template>
  <v-container fluid style="background: white; color:; font-weight: bold">
    <v-row>
      <v-col cols="2" class="justify-center">
        <h1 style="color: black; font-weight: 200" class="ml-7 mb-5">ประวัติการจอง</h1>
        <v-card
          class="ml-5 mt-1"
          style="border-radius: 1rem; background: #b91c1c"
          :width="275"
          :height="400"
        >
          <v-img class="mt-2 ml-2" style="border-radius: 1rem" :width="260" :height="385"></v-img>
        </v-card>
      </v-col>
      <v-col cols="3" class="d-flex flex-column mt-12 ml-7">
        <h1 class="mb-5 mt-5 ml-7" style="color: black">ดูน 2</h1>

        <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-6">
          <v-icon class="mr-2">{{ mdiMapMarker }}</v-icon
          >สกาลาบางแสน
        </p>
        <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-6">
          <v-icon class="mr-2">{{ mdiCalendarToday }}</v-icon
          >24 ธันวาคม 2567 | 10:30
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
      </v-col>
    </v-row>
    <v-dialog v-model="movieHistoryDetailDialog" width="auto">
      <v-card :width="1200" :height="700">
        <v-row>
          <v-col cols="2" class="justify-center">
            <v-card
              class="ml-10 mt-5"
              style="border-radius: 1rem; background: #b91c1c"
              :width="200"
              :height="250"
            >
              <v-img
                class="mt-2 ml-2"
                style="border-radius: 1rem"
                :width="260"
                :height="385"
              ></v-img>
            </v-card>
          </v-col>
          <v-col cols="10">
            <v-row>
              <v-col cols="8" class="d-flex flex-column mt-12 ml-16">
                <h1 class="mb-2 mt-5 ml-7" style="color: black">ดูน 2</h1>
                <p style="color: black; font-size: medium" class="ml-7">
                  <v-icon>{{ mdiVolumeHigh }}</v-icon
                  >ENG/TH
                </p>
              </v-col>
              <v-col class="d-flex flex-column mt-12 ml-16">
                <p style="color: black; font-weight: 600; font-size: larger" class="mt-5 ml-7">
                  ราคารวม
                </p>
                <p class="ml-7" style="color: #b91c1c; font-weight: 600; font-size: 30px">340฿</p>
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
                <p class="ml-2" style="color: #b91c1c; font-weight: 600; font-size: 25px">D8,D9</p>
              </v-col>
            </v-row>
            <v-row class="mt-7">
              <v-col cols="4" class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-10 pl-8">
                  วันที่
                </p>
                <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 16px">
                  24 ธันวาคม 2567
                </p>
              </v-col>
              <v-col cols="4" class="d-flex flex-column ml-10">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-7">เวลา</p>
                <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 16px">10:30</p>
              </v-col>
            </v-row>
            <v-row class="mt-7">
              <v-col cols="8" class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-6">
                  อาหาร/เครื่องดื่ม
                </p>
                <p class="ml-0" style="color: #b91c1c; font-weight: 600; font-size: 16px">
                  ป็อปคอร์น(ขนาดใหญ่) x1 / น้ำอัดลม 44 Oz. x1
                </p>
              </v-col>
            </v-row>
            <v-row class="mt-7">
              <v-col cols="8" class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-6">
                  รหัสการซื้อ
                </p>
                <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 40px">
                  WP12XPX2
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
    <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>
  </v-container>
</template>
