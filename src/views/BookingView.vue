<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import type Showtime from '@/types/showtime'
import {
  mdiClock,
  mdiClockOutline,
  mdiMapMarker,
  mdiVolumeHigh,
  mdiSofaSingle,
  mdiSofa
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
onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
})

watch(step, async () => {
  if (step.value === 2) {
    showtime.value = await movieStore.getShowtime(selectedShowtime.value!)
  }
})
const model = ref<null>()
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
          <p>หมวดหมู่ : {{ movie?.tag.join() }}</p>
          <p class="mt-3">
            <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
            >{{ movie?.length }}
          </p>
          <v-btn
            rounded="xl"
            :width="250"
            :height="40"
            class="mt-5"
            style="background: #b91c1c; color: white; font-weight: bold"
            >รายละเอียดภาพยนตร์</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-stepper alt-labels class="mt-5" v-model="step"
      ><v-stepper-header
        ><v-stepper-item title="เลือกรอบฉาย" :value="1"></v-stepper-item
        ><v-stepper-item title="เลือกที่นั่ง" :value="2"></v-stepper-item
        ><v-stepper-item title="การชำระเงิน" :value="3"></v-stepper-item
        ><v-stepper-item title="สิ้นสุด" :value="4"></v-stepper-item
      ></v-stepper-header>

      <v-stepper-window
        ><v-stepper-window-item :value="1">
          <v-sheet class="mx-auto" elevation="8">
            <v-slide-group
              v-model="model"
              selected-class="bg-primary"
              show-arrows
              mandatory
              class="mt-5 mx-auto"
              :width="1500"
            >
              <v-slide-group-item
                v-for="(day, index) in days"
                :key="index"
                v-slot="{ isSelected, toggle, selectedClass }"
              >
                <v-card
                  color="grey-lighten-1"
                  :class="['ma-5', selectedClass]"
                  height="100"
                  width="150"
                  @click="toggle"
                  >{{ day }}
                  <div class="d-flex fill-height align-center justify-center">
                    <v-scale-transition>
                      <v-icon
                        v-if="isSelected"
                        color="white"
                        size="48"
                        icon="mdi-close-circle-outline"
                      ></v-icon>
                    </v-scale-transition>
                  </div>
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
                <v-row v-for="n in 5" style="height: 15vh" :key="n">
                  <v-col
                    ><v-row
                      ><v-col cols="2"
                        ><p class="text-center mt-5" style="font-size: 18px">โรงภาพยนตร์ 3</p>
                      </v-col>
                      <v-divider vertical style="height: 15vh"></v-divider
                      ><v-col class="mt-0"
                        ><v-icon>{{ mdiVolumeHigh }}</v-icon
                        >ENG/TH | 2D <br />
                        <v-btn
                          class="mt-2"
                          style="background-color: #b91c1c; color: white"
                          @click="step = 2"
                          >10:30</v-btn
                        >
                      </v-col>
                    </v-row></v-col
                  ><v-divider></v-divider
                ></v-row>
              </v-sheet>
            </v-expand-transition>
          </v-sheet>
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
