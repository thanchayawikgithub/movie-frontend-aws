export default interface Card {
  cardId: number

  cardHolderName: string

  cardNumber: string

  cardExpiredDate: string

  cardCvv: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  customer: Customer

  receipts: Receipt[]
}
