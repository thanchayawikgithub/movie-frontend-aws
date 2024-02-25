import type Receipt from './receipt'
import type Review from './review'
import type Seat from './seat'
import type Showtime from './showtime'

export default interface Ticket {
  ticketId: number

  ticketPrice: number

  ticketReviewUrl: string

  ticketNumber: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  review: Review

  showtime: Showtime

  seat: Seat

  receipt: Receipt
}
