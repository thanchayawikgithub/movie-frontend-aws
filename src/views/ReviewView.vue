<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useMovieStore } from '@/stores/movie'
import { useTicketStore } from '@/stores/ticket'
import type Movie from '@/types/movie'
import type Ticket from '@/types/ticket'
import { mdiTicket, mdiClockOutline } from '@mdi/js'
import { onMounted, ref } from 'vue'

const ticketNumber = router.currentRoute.value.params.ticketNumber.toString()
const movieStore = useMovieStore()
const movie = ref<Movie>()

const ticketStore = useTicketStore()
const authStore = useAuthStore()
const ticket = ref<Ticket>()
const rating = ref(0)
const comment = ref('')

const saveReview = async () => {
  const currentUser = await authStore.getCurrentUser()
  const data = {
    ticketId: ticket.value!.ticketId,
    reviewRating: rating.value,
    reviewComment: comment.value.length > 0 ? comment.value : null,
    cusId: currentUser?.cusId || 0
  }
  await movieStore.saveReview(data)
}
onMounted(async () => {
  ticket.value = await ticketStore.getTicketByNumber(ticketNumber)
  movie.value = ticket.value?.showtime.movie
})
</script>
<template>
  <v-container fluid style="background: white; font-weight: bold">
    <v-row>
      <v-col cols="2">
        <h1 style="color: black; font-weight: 200" class="ml-7">รีวิว</h1>
        <v-card
          class="ml-5 mt-1"
          style="border-radius: 1rem; background: #b91c1c"
          :width="275"
          :height="400"
        >
          <v-img
            class="mt-2 ml-2"
            style="border-radius: 1rem"
            :width="260"
            :height="385"
            :src="`http://localhost:3000/movies/${ticket?.showtime.movie.movieId}/image`"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="4" class="d-flex flex-column ml-8 mt-2">
        <h1 class="mb-5 mt-10 ml-7" style="color: black">{{ movie?.movieName }}</h1>
        <p style="color: black; font-weight: 200" class="ml-7">
          หมวดหมู่ : {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
        </p>
        <p class="mt-3 ml-7" style="color: black; font-weight: 200">
          <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
          >{{ movie?.movieLength }} นาที
        </p>

        <div class="mt-5 ml-3" v-if="ticket?.review">
          <v-row>
            <div class="ml-4" style="color: #b91c1c">
              <v-rating
                v-model="ticket.review.reviewRating"
                hover
                half-increments
                readonly
              ></v-rating>
            </div>
          </v-row>
          <v-textarea
            v-model="ticket.review.reviewComment"
            style="color: black"
            class="ml-5 mt-3"
            :height="250"
            label="แสดงความคิดเห็น"
            variant="outlined"
            readonly
          ></v-textarea>
        </div>

        <div class="mt-5 ml-3" v-else>
          <v-row>
            <div class="ml-4" style="color: #b91c1c">
              <v-rating v-model="rating" hover half-increments></v-rating>
            </div>
          </v-row>
          <v-textarea
            v-model="comment"
            style="color: black"
            class="ml-5 mt-3"
            :height="250"
            label="แสดงความคิดเห็น"
            variant="outlined"
          ></v-textarea>
          <v-btn
            rounded="xl"
            :width="120"
            :height="40"
            class="mt-2 ml-4"
            @click="saveReview(), router.push({ name: 'movieDetail' })"
            style="
              background: linear-gradient(to right, #b91c1c, #ff6640);
              color: white;
              font-weight: bold;
            "
            >รีวิว</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
