<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const movieId = ref(parseInt(route.params.id[0]))
const movieStore = useMovieStore()
const movie = ref<Movie>()
onMounted(() => {
  movie.value = movieStore.nowShowingMovie.find((movie) => movie.id === movieId.value)
})
</script>
<template>
  <div>{{ movie }}</div>
</template>
