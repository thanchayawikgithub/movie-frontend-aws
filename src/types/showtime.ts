import type Movie from './movie'
import type ShowtimeSeat from './showtime_seat'
import type Theater from './theater'

export default interface Showtime {
  showId: number

  showStart: Date

  showDate: Date

  showEnd: Date

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  movie: Movie

  // @OneToMany(() => Ticket, (ticket) => ticket.showtime)
  // tickets: Ticket[];

  theater: Theater

  showtimeseats: ShowtimeSeat[]
}
