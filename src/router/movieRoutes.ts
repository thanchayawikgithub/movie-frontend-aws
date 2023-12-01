const movieRoutes = [
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/movie/MoviesView.vue')
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../views/movie/MovieView.vue')
  }
]

export default movieRoutes
