import type Movie from './movie'

export default interface MovieCategory {
  movieCatId: number

  movieCatName: string

  creatDate: Date

  deleteDate: Date

  updateDate: Date

  movies: Movie[]
}
