<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { mdiTicket, mdiFood } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'

const movieStore = useMovieStore()
const movie = ref<Movie>()

onMounted(async () => {})
</script>
<template>
  <v-container fluid style="background: white; font-weight: bold">
    <v-row>
      <v-col>
        <h1 style="color: black; font-weight: 200" class="ml-7">ตรวจสอบตั๋ว/รับอาหารเครื่องดื่ม</h1>
        <!-- <v-card
          class="ml-5 mt-1"
          style="border-radius: 1rem; background: #b91c1c"
          :width="275"
          :height="400"
        >
        </v-card> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" class="ml-8">
        <!-- <h1 class="mb-5 mt-10 ml-7" style="color: black">{{ movie?.movieName }}</h1>
        <p style="color: black; font-weight: 200" class="ml-7">
          หมวดหมู่ : {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
        </p>
        <p class="mt-3 ml-7" style="color: black; font-weight: 200">
          <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
          >{{ movie?.movieLength }} นาที
        </p> -->
        <v-row class="mt-2">
          <v-col cols="9" style="color: black">
            <v-text-field
              :v-model="movie?.movieId"
              :prepend-icon="mdiTicket"
              class="ml-5"
              label="กรอกหมายเลขตั๋วของลูกค้า"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              rounded="xl"
              :width="120"
              :height="40"
              class="mt-2"
              style="
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              >ตรวจสอบ</v-btn
            >
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="9" style="color: black">
            <v-text-field
              :v-model="movie?.movieId"
              :prepend-icon="mdiFood"
              class="ml-5"
              label="กรอกหมายเลขใบเสร็จรับอาหาร/เครื่องดื่ม ของลูกค้า"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              rounded="xl"
              :width="120"
              :height="40"
              class="mt-2"
              style="
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              >ตรวจสอบ</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
