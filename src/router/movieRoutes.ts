const movieRoutes = [
  {
    path: '/movie/:movieId',
    name: 'movie',
    component: () => import('../views/movie/MovieView.vue')
  },
  {
    path: '/booking/:movieId',
    name: 'booking',
    component: () => import('../views/BookingView.vue')
  },
  {
    path: '/bookingSeat/:movieId',
    name: 'bookingSeat',
    component: () => import('../views/BookingSeatView.vue')
  }
]

export default movieRoutes
