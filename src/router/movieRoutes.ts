const movieRoutes = [
  {
    path: '/movie/:movieId',
    name: 'movie',
    component: () => import('../views/MovieDetail.vue')
  },
  {
    path: '/booking/:movieId',
    name: 'booking',
    component: () => import('../views/BookingView.vue')
  },
  {
    path: '/review/:ticketNumber',
    name: 'review',
    component: () => import('../views/ReviewView.vue')
  },
  {
    path: '/checkTicket',
    name: 'checkTicket',
    component: () => import('../views/CheckTicketView.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue')
  }
]

export default movieRoutes
