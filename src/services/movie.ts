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

export default { getMovies, getMovie, getShowtime }
