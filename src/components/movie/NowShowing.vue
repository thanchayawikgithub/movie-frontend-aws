<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { mdiTagOutline, mdiClockTimeThreeOutline } from '@mdi/js'
const movieStore = useMovieStore()
</script>
<template>
  <v-slide-group show-arrows>
    <v-slide-group-item v-for="movie in movieStore.nowShowingMovie" :key="movie.id">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          class="ma-5"
          :height="380"
          :width="300"
          rounded="lg"
          v-bind="props"
          :elevation="isHovering ? 10 : 5"
          @click="console.log('click')"
        >
          <v-img :src="movie.poster" cover>
            <v-sheet
              v-if="isHovering"
              style="background-color: rgba(0, 0, 0, 0.8); color: white; height: 100%"
              class="pa-4"
            >
              <p style="font-size: 22px">{{ movie.title }}</p>
              <div class="d-flex mt-3">
                <v-icon>{{ mdiTagOutline }}</v-icon>
                <p style="font-size: 18px" class="ml-3">{{ movie.tag.join(' / ') }}</p>
              </div>
              <div class="d-flex mt-3">
                <v-icon>{{ mdiClockTimeThreeOutline }}</v-icon>
                <p style="font-size: 18px" class="ml-3">{{ movie.length }}</p>
              </div>
            </v-sheet>
          </v-img>
        </v-card>
      </v-hover>
    </v-slide-group-item>
  </v-slide-group>
</template>
<style scoped></style>
