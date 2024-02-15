export default interface Customer {
  cusId: number

  cusFirstname: string

  cusLastname: string

  cusEmail: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  reviews: Review[]

  cards: Card[]

  receipts: Receipt[]

  ticket: Ticket
}
