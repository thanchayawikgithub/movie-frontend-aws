import axios from './axios'
const getMovies = () => {
  return axios.get('movies')
}

const getMovie = (movieId: number) => {
  return axios.get(`movies/${movieId}`)
}

const getShowtime = (showtimeId: number) => {
  return axios.get(`movies/showtime/${showtimeId}`)
}
const getShowtimesTheater = (movieId: number) => {
  return axios.get(`theaters/showtimes/movie/${movieId}`)
}

export default { getMovies, getMovie, getShowtime, getShowtimesTheater }
