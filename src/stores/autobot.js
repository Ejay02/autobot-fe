import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useNotifications } from '@/composable/globalAlert.js'

const { notify } = useNotifications()

export const useAutobotStore = defineStore('autobot', {
  state: () => ({
    autobotCount: 0,
    autobots: [],
    currentPage: 1,
    itemsPerPage: 10,
    socket: null,
    loading: false
  }),

  actions: {
    initSocket() {
      this.socket = io(`${import.meta.env.VITE_BE_URL}`)

      this.socket.on('connect', () => {})
      // console.log('Connected to server')

      this.socket.on('newAutobot', (data) => {
        this.autobotCount++
        this.autobots.push(data)
      })

      this.socket.on('disconnect', () => {})
      // console.log('Disconnected from server')
    },
    async fetchAutobots() {
      this.loading = true
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE_URL}/api/autobots`, {
          params: {
            limit: this.itemsPerPage,
            offset: (this.currentPage - 1) * this.itemsPerPage
          }
        })

        this.autobots = response.data.autobots
        this.autobotCount = response.data.totalCount
      } catch (error) {
        if (error.response && error.response.status === 429) {
          notify(
            "Whoa, you're really testing our limits! Take a deep breath and try again later... or just take a nap, we won't judge.",
            'error'
          )
        } else {
          notify(error.message, 'error')
        }
      } finally {
        this.loading = false
      }
    },
    setPage(page) {
      this.currentPage = page
      this.fetchAutobots() // Fetch Autobots when the page changes
    }
  },
  getters: {
    totalPages: (state) => Math.ceil(state.autobotCount / state.itemsPerPage) || 1 // Use total count for pages
  }
})
