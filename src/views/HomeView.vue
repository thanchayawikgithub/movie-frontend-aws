<script setup lang="ts">
import NowShowingMovies from '@/components/movie/NowShowingMovies.vue'
import RecommendMovies from '@/components/movie/RecommendMovies.vue'
import { useMovieStore } from '@/stores/movie'
const movieStore = useMovieStore()
</script>

<template>
  <v-container fluid
    ><v-row
      ><v-col cols="4"></v-col
      ><v-col cols="4" class="d-flex px-16 mt-7">
        <v-select
          class="mr-5"
          label="เลือกภาพยนตร์"
          :items="movieStore.nowShowingMovie"
          variant="outlined"
          hide-details
          density="comfortable"
          ><template v-slot:item="{ item, props }">
            <v-list
              ><v-list-item :title="item.raw.title" v-bind="props" :width="220"
                ><v-img
                  :src="item.raw.poster"
                  :width="200"
                  :height="250"
                ></v-img></v-list-item></v-list
          ></template>
        </v-select>

        <v-btn
          :width="120"
          style="
            height: 100%;
            background: linear-gradient(to right, #b91c1c, #ff6640);
            color: white;
            font-weight: bold;
            font-size: 16px;
          "
          >รอบฉาย</v-btn
        ></v-col
      ><v-col cols="4"></v-col
    ></v-row>
    <p style="font-size: 42px; padding-left: 75px" class="my-5">ภาพยนต์แนะนำ</p>
    <RecommendMovies />
    <p style="font-size: 42px; padding-left: 75px" class="my-5">กำลังฉาย</p>
    <NowShowingMovies
  /></v-container>
</template>
