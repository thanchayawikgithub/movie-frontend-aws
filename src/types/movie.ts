import type Showtime from './showtime'

export default interface Movie {
  movieId: number

  movieName: string

  movieDesc: string

  movieLength: number

  movieImage: string

  movieTrailer: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  showtimes: Showtime[]

  // categories: MovieCategory[];

  // reviews: Review[];
}
