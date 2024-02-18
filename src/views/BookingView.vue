<script setup lang="ts">
import router from '@/router'
import { useMovieStore } from '@/stores/movie'
import type Movie from '@/types/movie'
import type ReceiptDto from '@/types/receiptDto'
import type Seat from '@/types/seat'
import type Showtime from '@/types/showtime'
import type ShowtimeSeat from '@/types/showtime_seat'
import type Theater from '@/types/theater'
import {
  mdiClock,
  mdiClockOutline,
  mdiMapMarker,
  mdiVolumeHigh,
  mdiSofaSingle,
  mdiSofa,
  mdiCloseCircleOutline,
  mdiAccountCircleOutline,
  mdiCheckCircle,
  mdiQrcodeScan,
  mdiCreditCardOutline,
  mdiTrashCan,
  mdiPlus
} from '@mdi/js'
import { computed } from 'vue'
import { watch } from 'vue'
import { onMounted, ref } from 'vue'

const receipt = ref<ReceiptDto>({
  cusId: 0,
  showId: 0,
  receiptFoods: [],
  tickets: [],
  recTotalPrice: 0,
  recPaymentMethod: ''
})

const movieId = +router.currentRoute.value.params.movieId.toString()
const step = ref(1)
const movieStore = useMovieStore()
const movie = ref<Movie>()
const showtime = ref<Showtime>()
const selectedShowtime = ref<number>()
const customRowOrder = ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'AA']
const rows = ref<{ name: string; showtimeSeats: ShowtimeSeat[] }[]>([])
const getFormattedTime = (dateObject: Date) => {
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const formattedTime = `${padZero(hours)}:${padZero(minutes)}`

  return formattedTime
}

const padZero = (value: number) => {
  // Add leading zero if the value is less than 10
  return value < 10 ? `0${value}` : value
}

function findRow(seatNumber: string) {
  // Extract alphabetic characters from the seat number
  const row = seatNumber.match(/[A-Za-z]+/)![0]
  return row
}

const getSeatColor = (showtimeSeat: ShowtimeSeat) => {
  if (showtimeSeat.showSeatStatus === false) {
    return 'gray'
  } else if (receipt.value.tickets.includes(showtimeSeat)) {
    return 'red'
  } else {
    switch (showtimeSeat.seat.seatType) {
      case 'Deluxe':
        return '#fb7185'
      case 'Premium':
        return '#e11d48'
      default:
        return '#881337'
    }
  }
}

const getSeatIcon = (showtimeSeat: ShowtimeSeat) => {
  if (showtimeSeat.showSeatStatus === false) {
    return mdiAccountCircleOutline
  } else if (receipt.value.tickets.includes(showtimeSeat)) {
    return mdiCheckCircle
  } else {
    switch (showtimeSeat.seat.seatType) {
      case 'Sofa Sweet (Pair)':
        return mdiSofa
      case 'Deluxe':
        return mdiSofaSingle
      case 'Premium':
        return mdiSofaSingle
      default:
        return mdiSofaSingle
    }
  }
}

const selectSeat = (showtimeSeat: ShowtimeSeat) => {
  const index = receipt.value.tickets.findIndex((seat) => seat === showtimeSeat)
  if (index !== -1) {
    receipt.value.tickets.splice(index, 1)
  } else {
    receipt.value.tickets.push(showtimeSeat)
  }
}
const showtimesTheater = ref<Theater[]>([])

const formatShowDate = (dateTime: Date | undefined): string => {
  if (!dateTime) return ''
  const dateObject = new Date(dateTime)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = dateObject.toLocaleDateString('th-TH', options)

  return formattedDate
}
onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
  console.log(movie.value)
  showtimesTheater.value = await movieStore.getShowtimesTheater(movieId)
  console.log(showtimesTheater.value)
})
watch(receipt.value.tickets, (newValue) => {
  receipt.value.recTotalPrice = newValue.reduce((total, ticket) => total + ticket.seat.seatPrice, 0)
  console.log(receipt.value.recTotalPrice)
})
watch(step, async () => {
  if (step.value === 2) {
    showtime.value = await movieStore.getShowtime(receipt.value.showId)
    console.log(showtime.value)
    showtime.value?.showtimeseats.forEach((showtimeSeat) => {
      const rowName = findRow(showtimeSeat.seat.seatNumber)
      let row = rows.value.find((row) => row.name === rowName)

      if (!row) {
        row = { name: rowName, showtimeSeats: [] }
        rows.value.push(row)
      }

      row.showtimeSeats.push(showtimeSeat)
    })

    rows.value.sort((a, b) => {
      return customRowOrder.indexOf(a.name) - customRowOrder.indexOf(b.name)
    })

    // Sort seats within each row
    rows.value.forEach((row) => {
      row.showtimeSeats.sort((a, b) => {
        // Extract the numeric part of seat numbers
        const numA = parseInt(a.seat.seatNumber.match(/\d+/)![0])
        const numB = parseInt(b.seat.seatNumber.match(/\d+/)![0])
        // Compare the numeric parts
        return numA - numB
      })
    })
  }
})
const model = ref(0)

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
    <v-card :width="1200" :height="405" class="mx-auto mt-5 pa-3">
      <v-row>
        <v-col cols="3">
          <v-img
            :height="385"
            :width="260"
            :src="`http://localhost:3000/movies/${movie?.movieId}/image`"
          ></v-img>
        </v-col>
        <v-col cols="9" class="d-flex flex-column">
          <h2 class="mb-5">{{ movie?.movieName }}</h2>
          <p>
            หมวดหมู่ : {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
          </p>
          <p class="mt-3">
            <v-icon class="mr-1">{{ mdiClockOutline }}</v-icon
            >{{ movie?.movieLength }} นาที
          </p>
          <v-btn
            rounded="xl"
            :width="250"
            :height="40"
            class="mt-5"
            @click="router.push({ name: 'movieDetail' })"
            style="
              background: linear-gradient(to right, #b91c1c, #fa5830);
              color: white;
              font-weight: bold;
            "
            >รายละเอียดภาพยนตร์</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-stepper alt-labels class="mt-5" v-model="step" :height="1100"
      ><v-stepper-header
        ><v-stepper-item title="เลือกรอบฉาย" :value="1" color="red"></v-stepper-item
        ><v-divider></v-divider>
        <v-stepper-item title="เลือกที่นั่ง" :value="2" color="red"></v-stepper-item
        ><v-divider></v-divider
        ><v-stepper-item title="เลือกอาหาร / เครื่องดื่ม" :value="3" color="red"></v-stepper-item
        ><v-divider></v-divider
        ><v-stepper-item title="การชำระเงิน" :value="4" color="red"></v-stepper-item
        ><v-divider></v-divider
        ><v-stepper-item title="สิ้นสุด" :value="5" color="red"></v-stepper-item
      ></v-stepper-header>
      <v-stepper-window
        ><v-stepper-window-item :value="1">
          <v-card>
            <v-slide-group
              v-model="model"
              selected-class="bg-primary"
              show-arrows
              mandatory
              class="mx-auto"
              :width="1500"
            >
              <v-slide-group-item
                v-for="(day, index) in days"
                :key="index"
                v-slot="{ toggle, selectedClass }"
              >
                <v-card
                  variant="flat"
                  style="text-align: center"
                  :class="['ma-5   ', selectedClass]"
                  height="30"
                  width="150"
                  @click="toggle"
                  >{{ day }}
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
                <v-row
                  v-for="theater in showtimesTheater"
                  style="height: 15vh"
                  :key="theater.theaterId"
                >
                  <v-col
                    ><v-row
                      ><v-col cols="2"
                        ><p class="text-center mt-5" style="font-size: 18px">
                          {{ theater.theaterName }}
                        </p>
                      </v-col>
                      <v-divider vertical style="height: 15vh"></v-divider
                      ><v-col class="mt-0"
                        ><v-icon>{{ mdiVolumeHigh }}</v-icon
                        >ENG/TH | 2D <br />
                        <v-btn
                          v-for="showtime in theater.showtimes"
                          :key="showtime.showId"
                          class="mt-2 ml-3"
                          style="background-color: #b91c1c; color: white"
                          @click="(receipt.showId = showtime.showId), (step = 2)"
                        >
                          {{ getFormattedTime(new Date(showtime.showStart)) }}</v-btn
                        >
                      </v-col>
                    </v-row></v-col
                  ><v-divider></v-divider
                ></v-row>
              </v-sheet>
            </v-expand-transition>
          </v-card>
        </v-stepper-window-item>
        <v-stepper-window-item :value="2">
          <v-card :height="700">
            <v-row>
              <v-col cols="7">
                <v-card variant="flat" :height="700">
                  <v-row>
                    <v-col cols="4" align="right"
                      ><v-card
                        variant="outlined"
                        :height="90"
                        :width="100"
                        class="mt-5 pt-2 mr-10"
                        style="font-size: 13px; font-weight: bold; text-align: center"
                      >
                        <p style="font-size: 20px; text-align: center">
                          {{ showtime?.theater.theaterName }}
                        </p></v-card
                      ></v-col
                    ><v-col cols="2" align="right" class="ml-0"
                      ><v-icon size="35" class="mt-7 mr-1" color="#fb7185">{{
                        mdiSofaSingle
                      }}</v-icon
                      ><br /><span>Deluxe </span><br />
                      <span class="pr-2">200฿</span></v-col
                    ><v-col cols="2" align="center"
                      ><v-icon size="35" class="mt-7 mr-0" color="#e11d48">{{
                        mdiSofaSingle
                      }}</v-icon
                      ><br /><span>Premium </span><br />
                      <span class="pr-0">220฿</span></v-col
                    ><v-col cols="2"
                      ><v-icon size="35" class="mt-7 ml-8" color="#881337">{{ mdiSofa }}</v-icon
                      ><br /><span>Sofa Sweet(Pair) </span><br />
                      <span class="pl-8">600฿</span></v-col
                    >
                  </v-row>
                  <v-row class="justify-center">
                    <v-card
                      rounded="0"
                      :width="700"
                      :height="50"
                      class="ml-8 mb-7"
                      variant="outlined"
                      style="color: #b91c1c; text-align: center"
                      ><p style="color: black; font-weight: bold" class="pt-2">
                        จอภาพยนตร์
                      </p></v-card
                    ></v-row
                  ><v-row
                    v-for="(row, index) in rows"
                    :key="index"
                    class="mt-3 ml-5 justify-center"
                    :style="{
                      'font-size': '15px',
                      'font-weight': 'bold'
                    }"
                  >
                    <p
                      class="mt-2"
                      :style="{
                        'margin-right': index === 12 ? '19px' : '0px',
                        'padding-left': index === 12 ? '25px' : '0px'
                      }"
                    >
                      {{ row.name }}
                    </p>
                    <v-icon
                      v-for="showtimeSeat in row.showtimeSeats"
                      :key="showtimeSeat.seat.seatId"
                      size="xx-large"
                      class="ml-3"
                      @click="selectSeat(showtimeSeat)"
                      :color="getSeatColor(showtimeSeat)"
                      :style="{ 'margin-right': index === 12 ? '12px' : '0' }"
                      >{{ getSeatIcon(showtimeSeat) }}
                    </v-icon>
                    <p
                      class="mt-2"
                      :style="{
                        'margin-right': index === 12 ? '33px' : '0px',
                        'margin-left': index === 12 ? '0px' : '12px',
                        'padding-left': index === 12 ? '15px' : '0px'
                      }"
                    >
                      {{ row.name }}
                    </p>
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                ><v-card
                  :height="630"
                  :width="450"
                  class="mt-5 ml-5 pa-5"
                  style="background-color: #f1f5f9"
                  elevation="0"
                  ><v-row>
                    <v-col style="font-size: 22px; font-weight: bold">{{
                      'ภาพยนตร์ : ' + movie?.movieName
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col style="font-size: 20px"
                      >รอบฉาย :
                      <span style="color: #b91c1c"
                        >{{ formatShowDate(showtime?.showStart) }}
                        {{
                          showtime && showtime.showStart
                            ? getFormattedTime(new Date(showtime.showStart)) + ' น.'
                            : ''
                        }}</span
                      >
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col style="font-size: 20px"
                      >{{ 'โรงภาพยนตร์ : ' + showtime?.theater.theaterName }}
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col align="center" class="mt-9"
                      ><v-card
                        :width="360"
                        :height="380"
                        class="d-flex flex-column pa-5"
                        elevation="0"
                        ><h3>ที่นั่งที่เลือก</h3>
                        <h3 class="mt-3" style="color: #f84802">
                          {{
                            receipt.tickets
                              .map((showtimeSeat) => showtimeSeat.seat.seatNumber)
                              .join(',') || '-'
                          }}
                        </h3>
                        <h3 class="mt-4">ราคารวม</h3>
                        <h3 class="mt-4" style="color: #f84802">{{ receipt.recTotalPrice }}</h3>
                        <v-spacer></v-spacer>
                        <v-btn
                          rounded="lg"
                          class="mb-2"
                          elevation="0"
                          size="large"
                          style="
                            background: linear-gradient(to right, #b91c1c, #fa5830);
                            color: white;
                          "
                          @click="step = 3"
                          >ซื้ออาหาร / เครื่องดื่ม</v-btn
                        >
                        <v-btn
                          rounded="lg"
                          elevation="0"
                          size="large"
                          style="
                            background: linear-gradient(to right, #b91c1c, #fa5830);
                            color: white;
                          "
                          @click="step = 4"
                          >ชำระเงิน</v-btn
                        ></v-card
                      ></v-col
                    >
                  </v-row>
                </v-card></v-col
              >
            </v-row>
          </v-card></v-stepper-window-item
        >
        <v-stepper-window-item :value="3">
          <v-card :height="700">
            <v-row>
              <v-col cols="7">
                <v-card variant="flat" :height="700">
                  <p style="font-size: 30px; font-weight: bold; text-align: center; color: #b91c1c">
                    อาหารและเครื่องดื่ม
                  </p>
                  <v-row>
                    <v-col cols="12">
                      <v-btn :height="250" :width="220" class="mt-5 pt-2 mr-10" variant="outlined">
                        <v-card
                          variant="flat"
                          :height="220"
                          :width="210"
                          style="font-size: 13px; font-weight: bold; text-align: center"
                          ><v-img
                            class="image mb-2"
                            style="height: 15vh; width: 20vw"
                            :src="`http://localhost:3000/movies/${movie?.movieId}/image`"
                          >
                          </v-img>
                          <p style="font-size: 20px; text-align: center">
                            {{ showtime?.theater.theaterName }}
                          </p>
                          <p style="font-size: 20px; text-align: center">20 ฿</p>
                        </v-card></v-btn
                      ></v-col
                    >
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                ><v-card
                  :height="630"
                  :width="530"
                  class="mt-5 ml-5 pa-5"
                  style="background-color: #f1f5f9"
                  elevation="0"
                  ><v-row>
                    <v-col style="font-size: 22px; font-weight: bold; text-align: center"
                      >รายการ</v-col
                    >
                  </v-row>
                  <v-row>
                    <v-col class="ml-9" style="font-size: 20px" cols="4">น้ำอัดลม 45 Oz. </v-col>
                    <v-col style="font-size: 20px" cols="3">
                      <v-btn
                        style="background-color: #f1f5f9; font-size: 17px; font-weight: bold"
                        density="compact"
                        icon=""
                        variant="plain"
                        >-</v-btn
                      >
                      1
                      <v-btn
                        style="background-color: #f1f5f9; font-size: 17px; font-weight: bold"
                        density="compact"
                        icon=""
                        variant="plain"
                        >+</v-btn
                      ></v-col
                    >
                    <v-col style="font-size: 20px" cols="2">50 ฿</v-col>
                    <v-col style="font-size: 20px"
                      ><v-btn
                        variant="plain"
                        style="background-color: #f1f5f9"
                        density="compact"
                        icon=""
                        ><v-icon size="25px" color="red">{{ mdiTrashCan }}</v-icon></v-btn
                      ></v-col
                    >
                  </v-row>

                  <v-row>
                    <v-col align="center" class="mt-9"
                      ><v-card
                        :width="360"
                        :height="380"
                        class="d-flex flex-column pa-5"
                        elevation="0"
                      >
                        <h3 class="mt-4">ราคารวม</h3>
                        <h3 class="mt-4" style="color: #f84802">{{ 0 }}</h3>
                        <v-spacer></v-spacer>

                        <v-btn
                          rounded="lg"
                          elevation="0"
                          size="large"
                          style="
                            background: linear-gradient(to right, #b91c1c, #fa5830);
                            color: white;
                          "
                          @click="step = 4"
                          >ชำระเงิน</v-btn
                        ></v-card
                      ></v-col
                    >
                  </v-row>
                </v-card></v-col
              >
            </v-row>
          </v-card></v-stepper-window-item
        >
        <v-stepper-window-item :value="4"
          ><v-card
            style="margin-inline: 50vh; border-color: #b91c1c; border-width: 3px"
            rounded="lg"
            variant="outlined"
            class="pa-10"
            ><v-card-title
              style="text-align: center; font-size: 30px; font-weight: bold"
              class="mb-4"
              >ยืนยันการซื้อ</v-card-title
            >
            <v-row
              ><v-col align="center"
                ><v-img
                  :src="`http://localhost:3000/movies/${movie?.movieId}/image`"
                  :width="250"
                ></v-img></v-col
              ><v-col
                ><h3 style="font-size: 22px">ภาพยนตร์ : {{ movie?.movieName }}</h3>
                <p class="mt-3">
                  รอบฉาย :
                  <span style="color: #b91c1c"
                    >{{ formatShowDate(showtime?.showStart) }}
                    {{
                      showtime && showtime.showStart
                        ? getFormattedTime(new Date(showtime.showStart)) + ' น.'
                        : ''
                    }}
                  </span>
                </p>
                <p class="mt-3">
                  ทั้งนั่ง :
                  <span style="color: #b91c1c">{{
                    receipt.tickets.map((showtimeSeat) => showtimeSeat.seat.seatNumber).join(',') ||
                    '-'
                  }}</span>
                </p>
                <p class="mt-3">
                  โรงภาพยนตร์ :
                  {{ showtime?.theater.theaterName }}
                </p>
              </v-col></v-row
            >
            <v-card-title
              style="
                text-align: center;
                background: linear-gradient(to right, #b91c1c, #fa5830);
                color: white;
                border-radius: 8px;
              "
              class="mt-10"
              >ราคารวม : {{ receipt.recTotalPrice + ' บาท' }}</v-card-title
            >
            <v-card-title style="text-align: center" class="mt-3">เลือกวิธีการชำระเงิน</v-card-title
            ><v-row class="mt-3"
              ><v-col
                ><v-btn
                  style="width: 100%"
                  :height="200"
                  stacked
                  elevation="1"
                  @click="receipt.recPaymentMethod = 'credit card'"
                  ><v-icon
                    size="100"
                    :color="receipt.recPaymentMethod === 'credit card' ? 'red' : 'black'"
                    >{{ mdiCreditCardOutline }}</v-icon
                  >
                  <h3
                    class="mt-3"
                    :style="{ color: receipt.recPaymentMethod === 'credit card' ? 'red' : 'black' }"
                  >
                    บัตรเครดิต / บัตรเดบิต
                  </h3></v-btn
                ></v-col
              ><v-col>
                <v-btn
                  style="width: 100%"
                  :height="200"
                  stacked
                  elevation="1"
                  @click="receipt.recPaymentMethod = 'qr-payment'"
                  ><v-icon
                    size="100"
                    :color="receipt.recPaymentMethod === 'qr-payment' ? 'red' : 'black'"
                    >{{ mdiQrcodeScan }}</v-icon
                  >
                  <h3
                    class="mt-3"
                    :style="{ color: receipt.recPaymentMethod === 'qr-payment' ? 'red' : 'black' }"
                  >
                    QR-Payment
                  </h3></v-btn
                >
              </v-col></v-row
            ><v-btn
              rounded="lg"
              elevation="0"
              class="mt-5"
              style="
                background: linear-gradient(to right, #b91c1c, #fa5830);
                color: white;
                width: 100%;
                height: 5vh;
                font-size: 18px;
              "
              @click="step = 4"
              >ชำระเงิน</v-btn
            ></v-card
          ></v-stepper-window-item
        ><v-stepper-window-item :value="5">4</v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </v-container>
</template>
<style scoped></style>
