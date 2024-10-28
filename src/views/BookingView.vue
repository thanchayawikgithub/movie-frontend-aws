<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useCounterStore } from '@/stores/counter'
import { useCustomerStore } from '@/stores/customer'
import { useFoodStore } from '@/stores/food'
import { useMovieStore } from '@/stores/movie'
import { useReceiptStore } from '@/stores/receipt'
import type Customer from '@/types/customer'
import type Food from '@/types/foods'
import type Movie from '@/types/movie'
import type ReceiptDto from '@/types/receiptDto'
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
  mdiAccountCircleOutline,
  mdiCheckCircle,
  mdiQrcodeScan,
  mdiCreditCardOutline,
  mdiTrashCan,
  mdiTicketPercent,
  mdiCancel,
  mdiCreditCardPlusOutline
} from '@mdi/js'
import { computed } from 'vue'
import { watch } from 'vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { VForm } from 'vuetify/components'
const authStore = useAuthStore()
const receiptStore = useReceiptStore()
const receipt = ref<ReceiptDto>({
  cusId: 0,
  showId: 0,
  receiptFoods: [],
  tickets: [],
  recTotalPrice: 0,
  recPaymentMethod: ''
})

const saveReceipt = async () => {
  const customer = await authStore.getCurrentUser()
  receipt.value.cusId = customer!.cusId || 0
  const savedReceipt = await receiptStore.saveReceipt(receipt.value)
  console.log(savedReceipt)
  step.value = 5
}

const movieId = +router.currentRoute.value.params.movieId.toString()
const step = ref(1)
const customerStore = useCustomerStore()

const customer = ref<Customer>()
const movieStore = useMovieStore()
const movie = ref<Movie>()
const showtime = ref<Showtime>()
const foodStore = useFoodStore()
const foods = ref<Food[]>([])
const ticketsEmptyError = ref(false)
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
  if (showtimeSeat.showSeatStatus === false) return
  const index = receipt.value.tickets.findIndex((seat) => seat === showtimeSeat)
  if (index !== -1) {
    receipt.value.tickets.splice(index, 1)
  } else {
    receipt.value.tickets.push(showtimeSeat)
  }
}

const deleteRecFood = (index: number) => {
  if (index !== -1) {
    receipt.value.receiptFoods.splice(index, 1)
  }
}

const selectFood = (food: Food) => {
  const foodIndex = receipt.value.receiptFoods.findIndex((recFood) => recFood.food === food)

  if (foodIndex !== -1) {
    receipt.value.receiptFoods[foodIndex].recFoodQty++
  } else {
    receipt.value.receiptFoods.push({
      food: food,
      recFoodQty: 1,
      recFoodPrice: food.foodPrice
    })
  }
}

const decreaseQty = (index: number) => {
  if (receipt.value.receiptFoods[index].recFoodQty > 1) {
    receipt.value.receiptFoods[index].recFoodQty--
  } else {
    receipt.value.receiptFoods.splice(index, 1)
  }
}

const increaseQty = (index: number) => {
  receipt.value.receiptFoods[index].recFoodQty++
}

const showtimesTheater = ref<Theater[]>([])

const formatShowDate = (dateTime: Date | undefined): string => {
  if (!dateTime) return ''
  const dateObject = new Date(dateTime)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = dateObject.toLocaleDateString('th-TH', options)

  return formattedDate
}

const toPaymentStep = () => {
  if (receipt.value.tickets.length === 0) {
    ticketsEmptyError.value = true
    return
  }
  if (!authStore.isLoggedIn()) {
    authStore.showLoginDialog = true
    return
  }
  step.value = 4
  startCountdown()
}

const countdown = ref(600) // 10 minutes countdown in seconds

const timeout = ref(false)
const paymentTimeOut = () => {
  timeout.value = true
}

const startCountdown = () => {
  const timer = setInterval(() => {
    countdown.value--

    if (countdown.value === 0) {
      clearInterval(timer)
      // Trigger whatever action you want when the countdown reaches zero
      paymentTimeOut()
    }
  }, 1000)
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${padZero(minutes)}:${padZero(remainingSeconds)}`
}

onMounted(async () => {
  movie.value = await movieStore.getMovie(movieId)
  console.log(movie.value)
  showtimesTheater.value = await movieStore.getShowtimesTheater(movieId)
  console.log(showtimesTheater.value)
})
watch(receipt.value.tickets, (newValue) => {
  receipt.value.recTotalPrice = newValue.reduce((total, ticket) => total + ticket.seat.seatPrice, 0)
})

watch(receipt.value.receiptFoods, () => {
  receipt.value.receiptFoods.forEach(
    (recFood) => (recFood.recFoodPrice = recFood.food.foodPrice * recFood.recFoodQty)
  )
  receipt.value.recTotalPrice =
    receipt.value.tickets.reduce((total, ticket) => total + ticket.seat.seatPrice, 0) +
    receipt.value.receiptFoods.reduce((total, recFood) => total + recFood.recFoodPrice, 0)
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
  } else if (step.value === 3) {
    foods.value = await foodStore.getFoods()
  } else if (step.value === 4) {
    const currentCus = await authStore.getCurrentUser()
    customer.value = await customerStore.getCustomer(currentCus!.cusId)
    if (customer.value!.cards.length > 0) {
      await prepareCard()
    }
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
})

const prepareCard = () => {
  customer.value!.cards = customer.value!.cards.map((card) => ({
    ...card,
    cardMaskNumber: maskCardNumber(card.cardNumber)
  }))
  receipt.value.cardId = customer.value?.cards[0].cardId
}

const maskCardNumber = (cardNumber: string) => {
  const visibleDigits = 4
  const maskedPart = '*'.repeat(cardNumber.length - 8)
  const firstFourDigits = cardNumber.slice(0, visibleDigits)
  const lastFourDigits = cardNumber.slice(-visibleDigits)

  // Insert space after every four characters
  const formattedNumber = firstFourDigits + maskedPart + lastFourDigits
  const formattedWithSpaces = formattedNumber.replace(/(.{4})/g, '$1 ')

  return formattedWithSpaces.trim() // Trim to remove leading/trailing spaces
}
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

const selectedPaymentMethod = ref(false)
const addCard = ref(false)
const form = ref(VForm)
const cardHolderName = ref('')
const cardNumber = ref('')
const cardExp = ref('')
const cardCVV = ref('')

const recTotalTicket = computed(() => {
  return receipt.value.tickets.reduce((total, ticket) => total + ticket.seat.seatPrice, 0)
})

const validateForm = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    const currentCus = await authStore.getCurrentUser()
    const data = {
      cardHolderName: cardHolderName.value,
      cardNumber: cardNumber.value,
      cardExpiredDate: cardExp.value,
      cardCvv: cardCVV.value,
      cusId: currentCus?.cusId || 0
    }
    await customerStore.addCard(data)
    customer.value = await customerStore.getCustomer(currentCus!.cusId)
    await prepareCard()
    addCard.value = false
    clearCardForm()
  }
}

const clearCardForm = () => {
  cardHolderName.value = ''
  cardNumber.value = ''
  cardExp.value = ''
  cardCVV.value = ''
}
const goToStep = (targetStep: number) => {
  if (step.value > 1) {
    step.value = targetStep
  }
}
</script>
<template>
  <v-container fluid>
    <v-stepper
      alt-labels
      v-model="step"
      :height="1850"
      width="100vw"
      style="margin-left: -17px; margin-top: -20px"
      ><v-stepper-header
        ><v-stepper-item title="เลือกรอบฉาย" :value="1" color="red" @click="goToStep(1)">
        </v-stepper-item
        ><v-divider></v-divider>
        <v-stepper-item title="เลือกที่นั่ง" :value="2" color="red"></v-stepper-item
        ><v-divider></v-divider
        ><v-stepper-item title="เลือกอาหาร / เครื่องดื่ม" :value="3" color="red"></v-stepper-item
        ><v-divider></v-divider
        ><v-stepper-item title="การชำระเงิน" :value="4" color="red"></v-stepper-item
        ><v-divider></v-divider
        ><v-stepper-item title="สิ้นสุด" :value="5" color="red"></v-stepper-item
      ></v-stepper-header>
      <v-card
        :style="{
          'background-image': `url(${movie?.movieBackground})`,
          'background-size': 'cover',
          'border-radius': '0em',
          width: '100vw',
          'margin-left': '-15px',
          'margin-bottom': '20px'
        }"
      >
        <v-img
          v-if="step <= 3 || receipt?.receiptFoods.length == 0"
          class="mt-10"
          :height="375"
          :width="270"
          :src="`${movie?.movieImage}`"
          style="
            position: absolute;
            z-index: 1;
            top: 40%;
            left: 30%;
            transform: translate(2%, -50%);
            border-radius: 1em;
          "
        ></v-img>
        <v-img
          v-if="step == 4 && receipt?.receiptFoods.length > 0"
          class="mt-10"
          :height="375"
          :width="270"
          :src="`${movie?.movieImage}`"
          style="
            position: absolute;
            z-index: 1;
            top: 26%;
            left: 30%;
            transform: translate(2%, -50%);
            border-radius: 1em;
          "
        ></v-img>
        <v-card
          v-if="step <= 4"
          :width="800"
          :height="300"
          class="mx-auto mt-16 mb-13"
          style="opacity: 0.9"
        >
          <v-row>
            <v-col cols="5"></v-col>
            <v-col cols="6" class="d-flex flex-column mt-10" style="font-weight: bold">
              <h2 class="mb-5">{{ movie?.movieName }}</h2>
              <p v-if="step == 1">
                หมวดหมู่ :
                {{ movie?.categories.map((category) => category.movieCatName).join('/') }}
              </p>
              <p class="mt-3 mr-2" v-if="step == 1">
                <v-icon>{{ mdiClockOutline }}</v-icon
                >{{ movie?.movieLength }} นาที
              </p>
              <p v-if="step > 1" style="color: #b91c1c; font-weight: bold">
                {{ formatShowDate(showtime?.showStart) }} |
                {{
                  showtime && showtime.showStart
                    ? getFormattedTime(new Date(showtime.showStart)) + ' น.'
                    : ''
                }}
              </p>
              <p class="mt-3" v-if="step > 1" style="color: #b91c1c; font-weight: bold">
                <v-icon>{{ mdiMapMarker }}</v-icon
                >สกาลา บางแสน
              </p>
              <p class="mt-3" v-if="step > 1" style="font-weight: bold">
                {{ showtime?.theater.theaterName }} | <v-icon>{{ mdiVolumeHigh }}</v-icon> ENG/TH 2D
              </p>
              <p class="mt-3" v-if="step > 3" style="font-weight: bold; font-size: medium">
                ทั้งนั่ง :
                <span style="color: #b91c1c">{{
                  receipt.tickets.map((showtimeSeat) => showtimeSeat.seat.seatNumber).join(',') ||
                  '-'
                }}</span>
              </p>
              <p class="mt-3" v-if="step > 3" style="font-weight: bold; font-size: medium">
                ราคารวม : <span style="color: #b91c1c">{{ recTotalTicket + ' ฿ ' }}</span>
              </p>

              <v-btn
                v-if="step == 1"
                rounded="xl"
                :width="250"
                :height="40"
                class="mt-5"
                @click="router.push({ name: 'movie' })"
                style="
                  background: linear-gradient(to right, #b91c1c, #fa5830);
                  color: white;
                  font-weight: bold;
                  opacity: 1;
                "
                >รายละเอียดภาพยนตร์</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
        <v-card
          v-if="step == 4 && receipt?.receiptFoods.length > 0"
          :width="800"
          :height="220"
          class="mx-auto mb-3 ;"
          style="opacity: 0.9"
        >
          <p align="center" style="font-size: large; font-weight: bold" class="mt-2">
            อาหารและเครื่องดื่ม
          </p>
          <v-row v-for="(recFood, index) in receipt.receiptFoods" :key="index">
            <v-col cols="6">
              <p class="ml-5" style="font-weight: bold; font-size: medium; color: #b91c1c">
                {{ recFood?.food.foodName }}
              </p></v-col
            >
            <v-col cols="3" class="d-flex flex-column">
              <p v-if="step > 3" style="font-weight: bold; font-size: medium">
                <span style="color: #b91c1c">{{ ' x ' + recFood?.recFoodQty }}</span>
              </p>
            </v-col>
            <v-col cols="3" class="d-flex flex-column">
              <p v-if="step > 3" style="font-weight: bold; font-size: medium">
                <span style="color: #b91c1c">{{ recFood?.recFoodPrice + ' ฿ ' }}</span>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-card>

      <v-stepper-window
        ><v-stepper-window-item :value="1">
          <v-card>
            <v-slide-group
              v-model="model"
              selected-class="bg-red-darken-4"
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
                  style="background-color: #f1f5f9; border-radius: 1rem"
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
                          @click="toPaymentStep()"
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
                      <v-btn
                        v-for="food in foods"
                        :key="food.foodId"
                        :height="300"
                        :width="230"
                        style="border-radius: 1rem"
                        class="mt-5 mr-8 ml-1"
                      >
                        <v-card
                          class="card"
                          variant="flat"
                          :height="300"
                          :width="230"
                          style="
                            font-size: 13px;
                            font-weight: bold;
                            text-align: center;
                            border-radius: 1rem;
                          "
                          @click="selectFood(food)"
                        >
                          <v-card
                            class="mt-5"
                            variant="flat"
                            :height="166"
                            :width="200"
                            style="
                              font-size: 13px;
                              font-weight: bold;
                              text-align: center;
                              border-radius: 1rem;
                            "
                          >
                            <v-img style="height: 100%; width: 30vw" :src="`${food.foodImage}`">
                            </v-img>
                          </v-card>
                          <p
                            style="font-size: 17px; text-align: center; color: #b91c1c"
                            class="mt-5"
                          >
                            {{ food.foodName }}
                          </p>
                          <p style="font-size: 20px; text-align: center" class="mt-3">
                            {{ food.foodPrice }}฿
                          </p>
                        </v-card></v-btn
                      ></v-col
                    >
                  </v-row>
                </v-card>
              </v-col>
              <v-col
                ><v-card
                  :height="680"
                  :width="570"
                  class="mt-5 ml-5 pa-5"
                  style="background-color: #f1f5f9; border-radius: 1rem"
                  elevation="0"
                  ><v-row class="mb-2">
                    <v-col style="font-size: 22px; font-weight: bold; text-align: center"
                      >รายการ</v-col
                    >
                  </v-row>
                  <v-card :height="250" variant="flat" style="background-color: #f1f5f9">
                    <v-row v-for="(recFood, index) in receipt.receiptFoods" :key="index">
                      <v-col class="ml-9" style="font-size: 17px" cols="4">{{
                        recFood.food.foodName
                      }}</v-col>
                      <v-col style="font-size: 18px" cols="3">
                        <v-btn
                          style="
                            background-color: #f1f5f9;
                            font-size: 17px;
                            font-weight: bold;
                            color: #b91c1c;
                          "
                          density="compact"
                          icon=""
                          @click="decreaseQty(index)"
                          variant="plain"
                          >-</v-btn
                        >
                        {{ recFood.recFoodQty }}
                        <v-btn
                          style="
                            background-color: #f1f5f9;
                            font-size: 17px;
                            font-weight: bold;
                            color: darkcyan;
                          "
                          density="compact"
                          icon=""
                          variant="plain"
                          @click="increaseQty(index)"
                          >+</v-btn
                        ></v-col
                      >
                      <v-col style="font-size: 18px" cols="2">{{ recFood.recFoodPrice }}</v-col>
                      <v-col style="font-size: 18px" cols="2"
                        ><v-btn
                          variant="plain"
                          style="background-color: #f1f5f9"
                          density="compact"
                          @click="deleteRecFood(index)"
                          icon=""
                          ><v-icon size="22px" color="red">{{ mdiTrashCan }}</v-icon></v-btn
                        ></v-col
                      >
                    </v-row>
                  </v-card>

                  <v-row class="mt-2">
                    <v-col align="center"
                      ><v-card
                        :width="360"
                        :height="300"
                        class="d-flex flex-column pa-5"
                        elevation="0"
                      >
                        <h3 class="mt-4">ราคารวม</h3>
                        <h3 class="mt-4" style="color: #f84802">{{ receipt.recTotalPrice }}</h3>
                        <v-spacer></v-spacer>

                        <v-btn
                          rounded="lg"
                          elevation="0"
                          size="large"
                          style="
                            background: linear-gradient(to right, #b91c1c, #fa5830);
                            color: white;
                          "
                          @click="toPaymentStep()"
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
        <v-stepper-window-item :value="4">
          <v-card
            style="
              margin-inline: 50vh;
              border-color: #b91c1c;
              border-width: 3px;
              display: flex;
              flex-direction: column;
            "
            rounded="lg"
            variant="outlined"
            class="pa-10"
            ><v-card-title
              style="text-align: center; font-size: 28px; font-weight: bold"
              class="mb-4"
              >ยืนยันการซื้อตั๋วรับชมภาพยนตร์</v-card-title
            >
            <!-- <v-row class="mt-3"
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
                  โรงภาพยนตร์ :
                  {{ showtime?.theater.theaterName }}
                </p>
                <p class="mt-3">
                  ทั้งนั่ง :
                  <span style="color: #b91c1c">{{
                    receipt.tickets.map((showtimeSeat) => showtimeSeat.seat.seatNumber).join(',') ||
                    '-'
                  }}</span>
                </p>


                <p class="mt-3">
                  อาหาร / เครื่องดื่ม : {{ receipt.receiptFoods.length > 0 ? '' : '-' }}
                </p>
                <p v-for="(recFood, index) in receipt.receiptFoods" :key="index" class="mt-3">
                  {{ recFood.food.foodName + ' x ' + recFood.recFoodQty }}
                </p>
                
                </v-col
              ></v-row
            > -->
            <v-sheet
              style="
                text-align: center;
                background: linear-gradient(to right, #b91c1c, #fa5830);
                height: 8vh;
                color: white;
                border-radius: 8px;
              "
              class="mt-10 px-3"
              ><v-row
                ><v-col cols="3"></v-col
                ><v-col cols="6"
                  ><p class="mt-5" style="font-size: 24px">
                    ราคารวมสุทธิ : {{ receipt.recTotalPrice + ' บาท' }}
                  </p></v-col
                ><v-col cols="3"
                  ><v-card class="d-flex flex-column mt-3" variant="outlined"
                    ><p>เวลาชำระเงิน</p>
                    <p>{{ formatTime(countdown) }}</p></v-card
                  ></v-col
                ></v-row
              ></v-sheet
            >
            <v-card v-if="timeout === true" :height="300" flat
              ><v-row>
                <v-col align="center" class="mt-5">
                  <v-icon size="150" color="#fa5830">{{ mdiCancel }}</v-icon>
                  <p style="font-size: 40px">หมดเวลาชำระเงิน</p>
                  <v-btn
                    to="/"
                    class="mt-3"
                    :width="300"
                    :height="50"
                    style="
                      background: linear-gradient(to right, #b91c1c, #fa5830);
                      color: white;
                      font-size: 18px;
                    "
                    >กลับหน้าหลัก</v-btn
                  >
                </v-col>
              </v-row></v-card
            >
            <v-card flat v-if="timeout === false">
              <v-card-title style="text-align: center" class="mt-3"
                >เลือกวิธีการชำระเงิน</v-card-title
              ><v-row class="mt-3"
                ><v-col
                  ><v-btn
                    style="width: 100%; border-width: 2px"
                    :height="200"
                    stacked
                    variant="outlined"
                    @click="
                      (receipt.recPaymentMethod = 'credit card'), (selectedPaymentMethod = true)
                    "
                    :style="{
                      borderColor: receipt.recPaymentMethod === 'credit card' ? 'red' : 'black'
                    }"
                    ><v-icon
                      size="100"
                      :color="receipt.recPaymentMethod === 'credit card' ? 'red' : 'black'"
                      >{{ mdiCreditCardOutline }}</v-icon
                    >
                    <h3
                      class="mt-3"
                      :style="{
                        color: receipt.recPaymentMethod === 'credit card' ? 'red' : 'black'
                      }"
                    >
                      บัตรเครดิต / บัตรเดบิต
                    </h3></v-btn
                  ></v-col
                ><v-col>
                  <v-btn
                    style="width: 100%; border-width: 2px"
                    :height="200"
                    stacked
                    variant="outlined"
                    @click="
                      (receipt.recPaymentMethod = 'qr-payment'), (selectedPaymentMethod = true)
                    "
                    :style="{
                      borderColor: receipt.recPaymentMethod === 'qr-payment' ? 'red' : 'black'
                    }"
                    ><v-icon
                      size="100"
                      :color="receipt.recPaymentMethod === 'qr-payment' ? 'red' : 'black'"
                      >{{ mdiQrcodeScan }}</v-icon
                    >
                    <h3
                      class="mt-3"
                      :style="{
                        color: receipt.recPaymentMethod === 'qr-payment' ? 'red' : 'black'
                      }"
                    >
                      QR-Payment
                    </h3></v-btn
                  >
                </v-col></v-row
              >
              <!-- <v-btn
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
                @click="selectedPaymentMethod = true"
                >ยืนยัน</v-btn
              > -->
            </v-card>
            <v-card v-if="timeout === false && selectedPaymentMethod === true" flat
              ><div v-if="receipt.recPaymentMethod === 'qr-payment'">
                <v-img
                  src="https://cdn.discordapp.com/attachments/1179393306707361792/1213117442860253184/13JwIlFw0mHB-xFjUCvLpbQ.png?ex=65f44ea9&is=65e1d9a9&hm=8e9c70b015f607ce250c37b7aacdb3cafe8f3391fe06756bd8bc3a5c5f97cf67&"
                  :width="280"
                  class="mx-auto mt-5"
                ></v-img
                ><v-img
                  class="mx-auto"
                  :width="300"
                  :src="`https://promptpay.io/0959389589/${receipt.recTotalPrice}`"
                ></v-img>
              </div>
              <div v-if="receipt.recPaymentMethod === 'credit card'">
                <v-card flat v-if="addCard === false"
                  ><v-card-title class="text-center mt-5">บัตรของฉัน</v-card-title>
                  <div class="d-flex mt-5" style="padding-inline: 13vw">
                    <v-select
                      variant="outlined"
                      v-model="receipt.cardId"
                      style="width: 60%"
                      class="mx-auto"
                      :items="customer?.cards"
                      item-title="cardMaskNumber"
                      item-value="cardId"
                      hide-details
                    ></v-select
                    ><v-btn
                      class="ml-5"
                      :icon="mdiCreditCardPlusOutline"
                      style="border-radius: 4px"
                      :height="55"
                      size="large"
                      variant="outlined"
                      @click="addCard = true"
                    ></v-btn></div
                ></v-card>
                <v-card flat v-else
                  ><v-card-title class="text-center mt-5">เพิ่มบัตร</v-card-title>
                  <v-row class="mt-2"
                    ><v-col
                      ><v-form ref="form" @submit.prevent="validateForm()"
                        ><v-text-field
                          v-model="cardHolderName"
                          label="ชื่อผู้ถือบัตร"
                          variant="outlined"
                          style="margin-inline: 10vw"
                          :rules="[(v) => !!v || 'กรุณาใส่ชื่อผู้ถือบัตร']"
                        ></v-text-field
                        ><v-text-field
                          v-model="cardNumber"
                          label="หมายเลขบัตร"
                          variant="outlined"
                          style="margin-inline: 10vw"
                          class="mt-3"
                          :rules="[
                            (v) => !!v || 'กรุณาใส่หมายเลขบัตร',
                            (v) => v.length <= 16 || 'กรุณาใส่ชื่อผู้ถือบัตรไม่เกิน 16 ตัวอักษร'
                          ]"
                        ></v-text-field>
                        <div class="d-flex mt-3" style="margin-inline: 10vw">
                          <v-text-field
                            v-model="cardExp"
                            label="ดด/ปป"
                            variant="outlined"
                            :rules="[(v) => !!v || 'กรุณาใส่วันหมดอายุบัตร']"
                          ></v-text-field
                          ><v-text-field
                            v-model="cardCVV"
                            label="cvv"
                            variant="outlined"
                            class="ml-3"
                            :rules="[(v) => !!v || 'กรุณาใส่รหัสความปลอดภัย']"
                          ></v-text-field>
                        </div>
                        <div style="margin-inline: 10vw" class="d-flex mt-5 mb-5 justify-center">
                          <v-btn
                            class="mr-3"
                            type="submit"
                            style="width: 150px; background-color: darkcyan; color: #f1f5f9"
                            >บันทึก</v-btn
                          ><v-btn
                            @click="(addCard = false), clearCardForm()"
                            style="width: 150px; background-color: #b91c1c; color: #f1f5f9"
                            >ยกลิก</v-btn
                          >
                        </div></v-form
                      ></v-col
                    ></v-row
                  ></v-card
                >
              </div>
              <v-btn
                v-if="addCard === false"
                rounded="lg"
                elevation="0"
                class="mt-6"
                style="
                  background: linear-gradient(to right, #b91c1c, #fa5830);
                  color: white;
                  width: 100%;
                  height: 5vh;
                  font-size: 18px;
                "
                @click="saveReceipt()"
                >ยืนยัน</v-btn
              ></v-card
            ></v-card
          ></v-stepper-window-item
        ><v-stepper-window-item :value="5"
          ><v-card color="#fa5830" :height="300"
            ><v-row>
              <v-col align="center" class="mt-10">
                <v-icon size="150">{{ mdiCheckCircle }}</v-icon>
                <p style="font-size: 40px">ชำระเงินสำเร็จ</p>
              </v-col>
            </v-row></v-card
          ></v-stepper-window-item
        >
      </v-stepper-window>
    </v-stepper>
  </v-container>

  <v-snackbar v-model="ticketsEmptyError">
    กรุณาเลือกที่นั่ง
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="ticketsEmptyError = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<style scoped>
.card {
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 120ms;
  display: grid;
  align-items: center;
  justify-content: center;
  background: #ffffff;

  padding-bottom: 4em;
}

.card::after {
  content: 'เพิ่มรายการ';
  padding-top: 0.7em;
  padding-left: 0.1em;
  position: absolute;

  bottom: -70px;
  background: #b91c1c;
  color: #fff;
  height: 5vh;
  width: 100%;
  transition: all 80ms;
  font-weight: 600;
  text-transform: uppercase;
}

.card .price {
  font-family: sans-serif;
  font-size: 1em;
  position: absolute;

  bottom: 0.1em;
}

.card:hover::after {
  bottom: 0;
}

.card:active {
  transform: scale(0.98);
}

.card:active::after {
  content: 'เพิ่ม !';
  height: 3.125em;
}

.text {
  max-width: 55px;
}
</style>
