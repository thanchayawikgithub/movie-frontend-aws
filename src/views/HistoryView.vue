<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import { useAuthStore } from '@/stores/auth'
import { useReceiptStore } from '@/stores/receipt'
import type Movie from '@/types/movie'
import type Receipt from '@/types/receipt'
import {
  mdiMapMarker,
  mdiCalendarToday,
  mdiFood,
  mdiVolumeHigh,
  mdiShare,
  mdiCommentText
} from '@mdi/js'
import { onMounted, ref } from 'vue'
import useClipboard from 'vue-clipboard3'

const receiptStore = useReceiptStore()
const movieStore = useMovieStore()
const authStore = useAuthStore()
const receipts = ref<Receipt[]>([])
const movie = ref<Movie>()
const { toClipboard } = useClipboard()
const movieHistoryDetailDialog = ref(false)
const reviewMovieDialog = ref(false)

const getFormattedTime = (dateObject: Date) => {
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const formattedTime = `${padZero(hours)}:${padZero(minutes)}`

  return formattedTime
}

const snackbar = ref(false)

const handleShare = async (ticketReviewUrl: string) => {
  const textToCopy = `${ticketReviewUrl}`

  try {
    await navigator.clipboard.writeText(textToCopy)

    snackbar.value = true
  } catch (err) {
    console.error('Error copying text to clipboard:', err)
  }
  return {
    snackbar
  }
}

const formatShowDate = (dateTime: Date | undefined): string => {
  if (!dateTime) return ''
  const dateObject = new Date(dateTime)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = dateObject.toLocaleDateString('th-TH', options)

  return formattedDate
}

const selectedReceipt = ref<Receipt>()

const handleDetailButtonClick = (receipt: Receipt) => {
  selectedReceipt.value = receipt
  movieHistoryDetailDialog.value = true
}

const handleReviewButtonClick = (receipt: Receipt) => {
  selectedReceipt.value = receipt
  reviewMovieDialog.value = true
}

const handleReview = async (ticketUrls: string) => {
  router.push({ name: 'review', params: { ticketNumber: ticketUrls } })
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${padZero(minutes)}:${padZero(remainingSeconds)}`
}

const padZero = (value: number) => {
  // Add leading zero if the value is less than 10
  return value < 10 ? `0${value}` : value
}

onMounted(async () => {
  const currentUser = await authStore.getCurrentUser()

  receipts.value = await receiptStore.getReceiptByCusId(currentUser!.cusId)

  console.log(receipts.value)
})
</script>
<template>
  <v-container fluid style="background: white; font-weight: bold">
    <h1 style="color: black; font-weight: 200" class="ml-7 mb-5">ประวัติการจอง</h1>
    <!-- <v-row>
      <v-col>ไม่มีประวัติการจอง</v-col>
    </v-row> -->
    <v-row v-for="receipt in receipts" :key="receipt.receiptId">
      <v-col cols="2" class="justify-center">
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
            :src="`${receipt.tickets[0].showtime.movie.movieImage}`"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="3" class="d-flex flex-column mt-12 ml-7">
        <h1 class="mb-5 mt-5 ml-7" style="color: black">
          {{ receipt.tickets[0].showtime.movie.movieName }}
        </h1>

        <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-6">
          <v-icon class="mr-2">{{ mdiMapMarker }}</v-icon
          >สกาลาบางแสน
        </p>
        <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-6">
          <v-icon class="mr-2">{{ mdiCalendarToday }}</v-icon>
          {{ formatShowDate(receipt.tickets[0].showtime.showDate) }} |
          <span>{{ getFormattedTime(new Date(receipt.tickets[0].showtime.showStart)) }}</span>
        </p>
        <p style="color: black; font-weight: 600; font-size: larger" class="ml-7">
          <v-icon class="mr-2">{{ mdiFood }}</v-icon
          >อาหาร/เครื่องดื่ม <span style="color: #b91c1c">(ยังไม่ได้รับ)</span>
        </p>
        <v-row>
          <v-col cols="5">
            <v-btn
              rounded="xl"
              :width="150"
              :height="40"
              class="mt-6 ml-7"
              @click="handleDetailButtonClick(receipt)"
              style="
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              >ดูรายละเอียด</v-btn
            >
          </v-col>

          <v-col>
            <v-btn
              rounded="xl"
              :width="150"
              :height="40"
              class="mt-6 ml-2"
              @click="handleReviewButtonClick(receipt)"
              style="
                background: linear-gradient(to right, #b91c1c, #ff6640);
                color: white;
                font-weight: bold;
              "
              >รีวิว</v-btn
            ></v-col
          >
        </v-row>
      </v-col>
      <v-divider style="border: 1px solid black" class="mt-3 mb-3 border-opacity-20"></v-divider>
    </v-row>
    <v-dialog v-model="movieHistoryDetailDialog" width="auto">
      <v-img
        style="margin-bottom: -12px"
        src="https://cdn.discordapp.com/attachments/893061087069634571/1213425612723589160/ticket-border-top_copy.png?ex=65f56daa&is=65e2f8aa&hm=3895b41dcbc6511a88d029e1685522a8c18e17154cf65d706df80e45f3df3893&"
      ></v-img>
      <v-card :width="1200" :height="730" style="border-radius: 0px" class="ribbon-card">
        <v-row>
          <v-col cols="3" class="justify-center">
            <v-img
              class="mt-7 ml-5"
              :width="350"
              :height="350"
              :src="`${selectedReceipt?.tickets[0].showtime.movie.movieImage}`"
            ></v-img>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="8" class="d-flex flex-column ml-16">
                <h2 class="mb-2 mt-5 ml-7" style="color: black; font-size: 25px">
                  {{ selectedReceipt?.tickets[0].showtime.movie.movieName }}
                </h2>
                <p style="color: black; font-size: 15px" class="ml-7">
                  <v-icon>{{ mdiVolumeHigh }}</v-icon
                  >ENG/TH
                </p>
              </v-col>
              <v-col class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: larger" class="mt-5 ml-7">
                  ราคารวม
                </p>
                <p class="ml-7" style="color: #b91c1c; font-weight: 600; font-size: 30px">
                  {{ selectedReceipt?.recTotalPrice }}฿
                </p>
              </v-col>
            </v-row>
            <v-divider
              style="border: 1px solid black"
              class="mt-3 mb-3 ml-16 mr-5 border-opacity-40"
            ></v-divider>
            <v-row>
              <v-col cols="3" class="d-flex flex-column ml-16">
                <p style="color: #b91c1c; font-weight: 600; font-size: larger" class="ml-7 mb-2">
                  <v-icon>{{ mdiMapMarker }}</v-icon
                  >สกาลาบางแสน
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-10">
                  โรงภาพยนต์
                </p>
                <p class="ml-16 pl-4" style="color: #b91c1c; font-weight: 600; font-size: 25px">
                  1
                </p>
              </v-col>
              <v-col cols="5" class="d-flex flex-column ml-10">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-7">
                  ที่นั่ง
                </p>
                <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 25px">
                  {{
                    selectedReceipt?.tickets
                      .map((showtimeSeat) => showtimeSeat.seat.seatNumber)
                      .join(',')
                  }}
                </p>
              </v-col>
            </v-row>
            <v-row class="mt-7">
              <v-col cols="4" class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-10 pl-8">
                  วันที่
                </p>
                <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 16px">
                  {{ formatShowDate(selectedReceipt?.tickets[0].showtime.showDate) }}
                </p>
              </v-col>
              <v-col cols="4" class="d-flex flex-column ml-10">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-7">เวลา</p>
                <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 16px">
                  {{
                    getFormattedTime(
                      new Date(String(selectedReceipt?.tickets[0].showtime.showStart))
                    )
                  }}
                </p>
              </v-col>
            </v-row>
            <v-row class="mt-7">
              <v-col cols="8" class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-6">
                  อาหาร/เครื่องดื่ม
                </p>
                <p
                  style="color: #b91c1c; font-weight: 600; font-size: 16px"
                  v-if="!selectedReceipt?.recfoods.length"
                  class="ml-16 pl-4"
                >
                  {{
                    selectedReceipt?.recfoods.length
                      ? selectedReceipt?.recfoods
                          .map((food) => `${food.food.foodName} x ${food.recFoodQty}`)
                          .join(', ')
                      : '-'
                  }}
                </p>
                <p style="color: #b91c1c; font-weight: 600; font-size: 16px" v-else class="ml-0">
                  {{
                    selectedReceipt?.recfoods.length
                      ? selectedReceipt?.recfoods
                          .map((food) => `${food.food.foodName} x${food.recFoodQty}`)
                          .join(', ')
                      : '-'
                  }}
                </p>
              </v-col>
            </v-row>
            <v-row class="mt-7">
              <v-col cols="8" class="d-flex flex-column ml-16">
                <p style="color: black; font-weight: 600; font-size: medium" class="ml-6">
                  รหัสการซื้อ
                </p>
                <p class="ml-5" style="color: #b91c1c; font-weight: 600; font-size: 25px">
                  {{ selectedReceipt?.recNumber }}
                </p>
              </v-col>
              <v-col class="d-flex flex-column">
                <v-card
                  :height="65"
                  style="background-color: #b91c1c; border-radius: 0"
                  class="overlay-card"
                >
                  <p
                    class="mt-4"
                    style="color: white; font-weight: 600; font-size: 20px; text-align: center"
                  >
                    ชำระเงินแล้ว<span>({{ selectedReceipt?.recTotalPrice }} ฿)</span>
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-divider class="historyMovie__line"></v-divider>
          <v-row class="mt-1 justify-center">
            <v-card-subtitle style="text-align: center">
              แสดงบัตรชมภาพยนตร์นี้เพื่อเข้าชมภาพยนตร์ <br />
              บัตรชมภาพยนตร์ที่ทำการซื้อแล้วไม่สามารถเปลี่ยนหรือทำรายการคืนได้ทุกกรณี <br />
              เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
              และขอสงวนสิทธิ์ในการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
            </v-card-subtitle>
          </v-row>
        </v-row>

        <v-card-actions>
          <v-btn
            class="mt-5"
            block
            @click="movieHistoryDetailDialog = false"
            style="font-weight: bold"
            color="#b91c1c"
            >ปิด</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-img
        style="margin-top: -3px"
        src="https://media.discordapp.net/attachments/893061087069634571/1213423654583402496/ticket-border-bottom.png?ex=65f56bd7&is=65e2f6d7&hm=23f170cc3f28440e099bc456186783c87a503dd8dea8b7e241d928c162cb49fe&=&format=webp&quality=lossless"
      ></v-img>
    </v-dialog>

    <v-dialog v-model="reviewMovieDialog" width="auto">
      <v-img
        style="margin-bottom: -12px"
        src="https://cdn.discordapp.com/attachments/893061087069634571/1213425612723589160/ticket-border-top_copy.png?ex=65f56daa&is=65e2f8aa&hm=3895b41dcbc6511a88d029e1685522a8c18e17154cf65d706df80e45f3df3893&"
      ></v-img>
      <v-card :width="1200" :height="730" style="border-radius: 0px" class="ribbon-card">
        <v-row>
          <v-col cols="3" class="justify-center">
            <v-img
              class="mt-7 ml-5"
              :width="350"
              :height="350"
              :src="`${selectedReceipt?.tickets[0].showtime.movie.movieImage}`"
            ></v-img>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col cols="10" class="d-flex flex-column" align="center">
                <h1 class="mt-2 ml-7" style="color: black; font-size: 25px">รีวิว</h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" class="d-flex flex-column ml-16">
                <h1 class="mb-2 ml-7" style="color: black; font-size: 25px">
                  {{ selectedReceipt?.tickets[0].showtime.movie.movieName }}
                </h1>
                <p style="color: black; font-size: 15px" class="ml-7">
                  <v-icon>{{ mdiVolumeHigh }}</v-icon
                  >ENG/TH
                </p>
              </v-col>
            </v-row>

            <v-divider
              style="border: 1px solid black"
              class="mt-3 mb-3 ml-16 mr-5 border-opacity-40"
            ></v-divider>

            <v-row>
              <v-col cols="5" class="d-flex flex-column ml-5">
                <p style="color: black; font-weight: bold; font-size: 25px" class="ml-12">
                  ที่นั่ง
                </p>
              </v-col>
            </v-row>
            <v-row v-for="(ticket, index) in selectedReceipt?.tickets" :key="index">
              <v-col cols="8" class="d-flex flex-column ml-9">
                <p class="ml-8" style="color: #b91c1c; font-weight: 600; font-size: 20px">
                  {{ ticket.seat.seatNumber }}<span>: {{ ticket.ticketNumber }}</span>
                </p>
              </v-col>
              <v-col cols="1" class="d-flex flex-column">
                <v-btn
                  color="#b91c1c"
                  @click="handleReview(ticket.ticketNumber)"
                  v-if="!ticket.review"
                  ><v-icon>{{ mdiCommentText }}</v-icon
                  >รีวิว</v-btn
                >
              </v-col>
              <v-col cols="1" class="d-flex flex-column">
                <v-btn
                  color="#b91c1c"
                  @click="handleShare(ticket.ticketReviewUrl)"
                  v-if="!ticket.review"
                >
                  <v-icon>{{ mdiShare }} </v-icon>แชร์</v-btn
                >
              </v-col>

              <v-divider class="mt-3 mb-3 ml-16 mr-8 historyMovie__line"></v-divider>
            </v-row>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-btn block @click="reviewMovieDialog = false" style="font-weight: bold" color="#b91c1c"
            >ปิด</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-img
        style="margin-top: -3px"
        src="https://media.discordapp.net/attachments/893061087069634571/1213423654583402496/ticket-border-bottom.png?ex=65f56bd7&is=65e2f6d7&hm=23f170cc3f28440e099bc456186783c87a503dd8dea8b7e241d928c162cb49fe&=&format=webp&quality=lossless"
      ></v-img>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="600" bottom>
      คัดลอกแล้ว!

      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false"> ปิด </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<style>
.historyMovie__line {
  margin-top: 1px;
  padding: 1px;

  border-top: 2px dashed #000;
}
</style>
