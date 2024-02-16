<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import type Showtime from '@/types/showtime'
import type Theater from '@/types/theater'
import {
  mdiClock,
  mdiClockOutline,
  mdiMapMarker,
  mdiVolumeHigh,
  mdiSofaSingle,
  mdiSofa,
  mdiCloseCircleOutline
} from '@mdi/js'
import { watch } from 'vue'
import { onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const step = ref(1)
const movieStore = useMovieStore()
const movie = ref<Movie>()
const showtime = ref<Showtime>()
const selectedShowtime = ref<number>()
const deluxes = ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'AA']
const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const getFormattedTime = (dateObject: Date) => {
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const formattedTime = `${padZero(hours)}:${padZero(minutes)}`

  return formattedTime
}

const padZero = (value: number) => {
  // Add leading zero if the value is less than 10
  return value < 10 ? `0${value}` : value
}

const showtimesTheater = ref<Theater[]>([])

onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
  console.log(movie.value)
  showtimesTheater.value = await movieStore.getShowtimesTheater(movieId)
  console.log(showtimesTheater.value)
})

watch(step, async () => {
  if (step.value === 2) {
    showtime.value = await movieStore.getShowtime(selectedShowtime.value!)
    console.log(showtime.value)
  }
})
const model = ref(0)

const days = [
  'อาทิตย์',
  'จันทร์',
  'อังคาร',
  'พุธ',
  'พฤหัสบดี',
  'ศุกร์',
  'เสาร์',
  'อาทิตย์',
  'จันทร์',
  'อังคาร',
  'พุธ',
  'พฤหัสบดี',
  'ศุกร์',
  'เสาร์'
]
</script>
<template>
  <v-container fluid>
    <v-card :width="1200" :height="405" class="mx-auto mt-5 pa-3">
      <v-row>
        <v-col cols="3">
          <v-img
            :height="385"
            :width="260"
            :src="`http://localhost:3000/movies/${movie?.movieId}/image`"
          ></v-img>
        </v-col>
        <v-col cols="9" class="d-flex flex-column">
          <h2 class="mb-5">{{ movie?.movieName }}</h2>
          <p>
            หมวดหมู่ : {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
          </p>
          <p class="mt-3">
            <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
            >{{ movie?.movieLength }} นาที
          </p>
          <v-btn
            rounded="xl"
            :width="250"
            :height="40"
            class="mt-5"
            @click="router.push({ name: 'movieDetail' })"
            style="background: #b91c1c; color: white; font-weight: bold"
            >รายละเอียดภาพยนตร์</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-stepper alt-labels class="mt-5" v-model="step"
      ><v-stepper-header
        ><v-stepper-item title="เลือกรอบฉาย" :value="1"></v-stepper-item><v-divider></v-divider>
        <v-stepper-item title="เลือกที่นั่ง" :value="2"></v-stepper-item><v-divider></v-divider
        ><v-stepper-item title="การชำระเงิน" :value="3"></v-stepper-item><v-divider></v-divider
        ><v-stepper-item title="สิ้นสุด" :value="4"></v-stepper-item
      ></v-stepper-header>

      <v-stepper-window
        ><v-stepper-window-item :value="1">
          <v-card>
            <v-slide-group
              v-model="model"
              selected-class="bg-primary"
              show-arrows
              mandatory
              class="mx-auto"
              :width="1500"
            >
              <v-slide-group-item
                v-for="(day, index) in days"
                :key="index"
                v-slot="{ toggle, selectedClass }"
              >
                <v-card
                  variant="flat"
                  style="text-align: center"
                  :class="['ma-5   ', selectedClass]"
                  height="30"
                  width="150"
                  @click="toggle"
                  >{{ day }}
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
            <v-divider></v-divider>
            <v-expand-transition>
              <v-sheet v-if="model != null" height="600">
                <v-row>
                  <p class="ml-15 mt-6 mb-3" style="color: #b91c1c">
                    <v-icon>{{ mdiMapMarker }}</v-icon
                    >สกาลา บางแสน
                  </p>

                  <v-divider></v-divider>
                </v-row>
                <v-row
                  v-for="theater in showtimesTheater"
                  style="height: 15vh"
                  :key="theater.theaterId"
                >
                  <v-col
                    ><v-row
                      ><v-col cols="2"
                        ><p class="text-center mt-5" style="font-size: 18px">
                          {{ theater.theaterName }}
                        </p>
                      </v-col>
                      <v-divider vertical style="height: 15vh"></v-divider
                      ><v-col class="mt-0"
                        ><v-icon>{{ mdiVolumeHigh }}</v-icon
                        >ENG/TH | 2D <br />
                        <v-btn
                          v-for="showtime in theater.showtimes"
                          :key="showtime.showId"
                          class="mt-2 ml-3"
                          style="background-color: #b91c1c; color: white"
                          @click="(selectedShowtime = showtime.showId), (step = 2)"
                        >
                          {{ getFormattedTime(new Date(showtime.showStart)) }}</v-btn
                        >
                      </v-col>
                    </v-row></v-col
                  ><v-divider></v-divider
                ></v-row>
              </v-sheet>
            </v-expand-transition>
          </v-card>
        </v-stepper-window-item>
        <v-stepper-window-item :value="2"
          ><v-card :height="580" class="mt-3">
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
                  class="mt-5 ml-5"
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
          </v-card></v-stepper-window-item
        ><v-stepper-window-item :value="3">3</v-stepper-window-item
        ><v-stepper-window-item :value="4">4</v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </v-container>
</template>
<style scoped></style>
