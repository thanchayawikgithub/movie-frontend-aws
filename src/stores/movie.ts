import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Movie from '@/types/movie'

export const useMovieStore = defineStore('movie', () => {
  const nowShowingMovie = ref<Movie[]>([
    {
      id: 1,
      title: 'Avatar : The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น', 'ผจญภัย'],
      length: '3 ชม. 12 นาที',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    },
    {
      id: 1,
      title: 'Avatar: The Way of Water',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://lumiere-a.akamaihd.net/v1/images/avatar-wayofwater-th_b0dea4e1.jpeg?region=0%2C0%2C600%2C900'
    }
  ])

  return { nowShowingMovie }
})
