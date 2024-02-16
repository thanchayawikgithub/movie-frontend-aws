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
    path: '/movieDetail/:movieId',
    name: 'movieDetail',
    component: () => import('../views/MovieDetail.vue')
  }
]

export default movieRoutes
