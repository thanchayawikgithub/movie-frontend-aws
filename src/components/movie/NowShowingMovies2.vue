<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'
import { mdiTagOutline, mdiClockTimeThreeOutline } from '@mdi/js'
import router from '@/router'
const movieStore = useMovieStore()

const toBookingPage = (movieId: number) => {
  router.push({ name: 'booking', params: { movieId: movieId } })
}
</script>
<template>
  <v-container fluid style="padding-inline: 10vw"
    ><v-row
      ><v-col cols="3" v-for="movie in movieStore.nowShowingMovie" align="center"
        ><v-hover v-slot="{ isHovering, props }">
          <v-card
            class="ma-5"
            :height="390"
            :width="310"
            v-bind="props"
            :elevation="isHovering ? 10 : 0"
            style="border-radius: 1rem"
            @click="toBookingPage(movie.id)"
          >
            <v-img
              :src="movie.poster"
              :height="380"
              :width="300"
              style="margin-top: 5px; border-radius: 1rem"
            >
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
                <p style="text-align: center; font-size: 18px; margin-top: 12rem">
                  คลิกเพื่อดูเพิ่มเติม
                </p>
              </v-sheet>
            </v-img>
          </v-card>
        </v-hover></v-col
      ></v-row
    ></v-container
  >
</template>
<style scoped></style>
