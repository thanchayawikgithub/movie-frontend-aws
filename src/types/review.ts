import type Customer from './customer'
import type Movie from './movie'
import type Ticket from './ticket'

export default interface Review {
  reviewId: number

  reviewRating: number

  reviewComment: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  movie: Movie

  ticket: Ticket

  customer: Customer
}
