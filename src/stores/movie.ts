import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Movie from '@/types/movie'
import movieService from '@/services/movie'
export const useMovieStore = defineStore('movie', () => {
  const getMovies = async () => {
    try {
      const response = await movieService.getMovies()
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  const getMovie = async (movieId: number) => {
    try {
      const response = await movieService.getMovie(movieId)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  const getMovieReviews = async (movieId: number) => {
    try {
      const response = await movieService.getMovieReviews(movieId)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  const getShowtime = async (showId: number) => {
    try {
      const response = await movieService.getShowtime(showId)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  const getShowtimesTheater = async (movieId: number) => {
    try {
      const response = await movieService.getShowtimesTheater(movieId)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  const saveReview = async (data: {
    ticketId: number
    reviewRating: number
    reviewComment: string | null
    cusId: number
  }) => {
    try {
      await movieService.saveReview(data)
    } catch (e) {
      console.log(e)
    }
  }

  return { getMovies, getShowtime, getMovie, getShowtimesTheater, saveReview, getMovieReviews }
})
