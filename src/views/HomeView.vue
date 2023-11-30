<script setup lang="ts">
import NowShowingMovies from '@/components/movie/NowShowingMovies.vue'
import RecommendMovies from '@/components/movie/RecommendMovies.vue'
</script>

<template>
  <v-container fluid style="font-family: 'Times New Roman', Times, serif"
    ><p style="font-weight: bold; font-size: 36px; padding-left: 75px" class="my-5">ภาพยนต์แนะนำ</p>
    <RecommendMovies />
    <p style="font-weight: bold; font-size: 36px; padding-left: 75px" class="my-5">กำลังฉาย</p>
    <NowShowingMovies
  /></v-container>
</template>
