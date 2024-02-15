import type Seat from './seat'
import type Showtime from './showtime'

export default interface ShowtimeSeat {
  showSeatId: number
  showSeatStatus: boolean
  showtime: Showtime
  seat: Seat
}
