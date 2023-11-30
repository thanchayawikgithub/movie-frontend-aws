import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type Movie from '@/types/movie'

export const useMovieStore = defineStore('movie', () => {
  const nowShowingMovie = ref<Movie[]>([
    {
      id: 1,
      title: 'อวตาร วิถีแห่งสายน้ำ',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['แอคชั่น', 'ผจญภัย'],
      length: '3 ชม. 12 นาที',
      rating: '13+',
      poster:
        'https://cdn.discordapp.com/attachments/874174814598856806/1179433664610840646/4k.png?ex=6579c432&is=65674f32&hm=3acb78c2fac8e20ec103e7bcb337de9d3e95c4ddb1aed92e711a40b83b04f1c4&'
    },
    {
      id: 1,
      title: 'ธี่หยด',
      description:
        'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na vi race to protect their home.',
      tag: ['สยองขวัญ'],
      length: '3h 12m',
      rating: '13+',
      poster:
        'https://cdn.discordapp.com/attachments/874174814598856806/1179426872430432266/d4c64193efd9f5a3.png?ex=6579bddf&is=656748df&hm=a02e92fdc564d46c4ab026bff64dd3c727466deda93a2e423df64560cee823e5&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179433321827151882/the_marvel.png?ex=6579c3e0&is=65674ee0&hm=06f7d60cfb8e4f621e2452f05b668593f79665708272fbb9d84adc77eac3e523&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179433919544823838/wish.png?ex=6579c46f&is=65674f6f&hm=d089a337d5662ca9a5a7613446eb1efe0eb5290fed86048e7e24137df03a3b41&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179435376654422026/59731ae3832c4ac2.png?ex=6579c5ca&is=656750ca&hm=f20914ca0a9ba452dc340b398bae6fbcbb594e46855f4da2f6ed9ddad2be2844&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179435376654422026/59731ae3832c4ac2.png?ex=6579c5ca&is=656750ca&hm=f20914ca0a9ba452dc340b398bae6fbcbb594e46855f4da2f6ed9ddad2be2844&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179435376654422026/59731ae3832c4ac2.png?ex=6579c5ca&is=656750ca&hm=f20914ca0a9ba452dc340b398bae6fbcbb594e46855f4da2f6ed9ddad2be2844&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179435376654422026/59731ae3832c4ac2.png?ex=6579c5ca&is=656750ca&hm=f20914ca0a9ba452dc340b398bae6fbcbb594e46855f4da2f6ed9ddad2be2844&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179435376654422026/59731ae3832c4ac2.png?ex=6579c5ca&is=656750ca&hm=f20914ca0a9ba452dc340b398bae6fbcbb594e46855f4da2f6ed9ddad2be2844&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179435376654422026/59731ae3832c4ac2.png?ex=6579c5ca&is=656750ca&hm=f20914ca0a9ba452dc340b398bae6fbcbb594e46855f4da2f6ed9ddad2be2844&'
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
        'https://cdn.discordapp.com/attachments/874174814598856806/1179435376654422026/59731ae3832c4ac2.png?ex=6579c5ca&is=656750ca&hm=f20914ca0a9ba452dc340b398bae6fbcbb594e46855f4da2f6ed9ddad2be2844&'
    }
  ])

  return { nowShowingMovie }
})
