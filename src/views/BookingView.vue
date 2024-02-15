<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { mdiClock, mdiClockOutline, mdiMapMarker, mdiVolumeHigh } from '@mdi/js'
import { onMounted, ref } from 'vue'

const movieId = +router.currentRoute.value.params.movieId.toString()
const step = ref(1)
const movieStore = useMovieStore()
const movie = ref<Movie>()
onMounted(() => {
  movie.value = movieStore.nowShowingMovie.find((movie) => movie.id === movieId)
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
    </v-stepper>
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
                  <v-btn class="mt-2" style="background-color: #b91c1c; color: white">10:30</v-btn>
                </v-col>
              </v-row></v-col
            ><v-divider></v-divider
          ></v-row>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </v-container>
</template>
