<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const movieId = +router.currentRoute.value.params.movieId.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()
onMounted(() => {
  movie.value = movieStore.nowShowingMovie.find((movie) => movie.id === movieId)
})
</script>
<template>
  <div>{{ movie }}</div>
</template>
