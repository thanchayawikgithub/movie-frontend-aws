import axios from './axios'

const getTicketByNumber = (ticketNumber: string) => {
  return axios.get(`tickets/number/${ticketNumber}`)
}

export default { getTicketByNumber }
