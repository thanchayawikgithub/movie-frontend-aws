import type Theater from './theater'
import type ShowtimeSeat from './showtime_seat'

export default interface Seat {
  seatId: number

  seatNumber: string

  seatType: string

  seatPrice: number

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  // ticket: Ticket

  theater: Theater

  showtimeseats: ShowtimeSeat[]
}
