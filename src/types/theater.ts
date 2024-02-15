import type Showtime from './showtime'
import type Seat from './seat'

export default interface Theater {
  theaterId: number

  theaterName: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  showtimes: Showtime[]

  seats: Seat[]
}
