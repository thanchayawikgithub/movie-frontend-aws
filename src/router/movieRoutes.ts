const movieRoutes = [
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/movie/MoviesView.vue')
  },
  {
    path: '/movies/:id',
    name: 'movie',
    component: () => import('../views/movie/MovieView.vue')
  }
]

export default movieRoutes
