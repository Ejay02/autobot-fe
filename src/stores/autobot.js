import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import axios from 'axios'
import { useNotifications } from '@/composable/globalAlert.js'

const { notify } = useNotifications()

export const useAutobotStore = defineStore('autobot', {
  state: () => ({
    autobotCount: 0,
    postCount: 0,
    commentCount: 0,
    autobots: [],
    posts: [],
    comments: [],
    currentPage: 1,
    itemsPerPage: 10,
    socket: null,
    loading: false,
    rateLimited: false,
    newlyCreatedAutobots: []
  }),

  actions: {
    initSocket() {
      this.socket = io(`${import.meta.env.VITE_BE_URL}`)

      this.socket.on('connect', () => {
        console.log('Connected to server')
      })

      this.socket.on('newAutobot', (data) => {
        this.autobotCount++
        // this.autobots.push(data)
        this.newlyCreatedAutobots.push(data)
      })

      this.socket.on('newPost', (data) => {
        this.postCount++
        this.posts.push(data)
      })

      this.socket.on('newComment', (data) => {
        this.commentCount++
        this.comments.push(data)
      })

      this.socket.on('autobotCount', (data) => {
        this.autobotCount += data.count
      })

      this.socket.on('postCount', (data) => {
        this.postCount += data.count
      })

      this.socket.on('commentCount', (data) => {
        this.commentCount += data.count
      })

      this.socket.on('processCompleted', (data) => {
        this.autobotCount = data.autobotCount
        this.postCount = data.postCount
        this.commentCount = data.commentCount

        notify('Autobot creation process complete, may it serve you well.', 'success')
      })

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server')
      })
    },

    removeFromNewlyCreated(autobotId) {
      const index = this.newlyCreatedAutobots.findIndex((bot) => bot.id === autobotId)
      if (index !== -1) {
        this.newlyCreatedAutobots.splice(index, 1)
      }
    },

    async fetchAutobots() {
      this.loading = true
      this.rateLimited = false
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE_URL}/api/autobots`, {
          params: {
            limit: this.itemsPerPage,
            offset: (this.currentPage - 1) * this.itemsPerPage
          }
        })

        this.autobots = response.data.autobots
        this.autobotCount = response.data.totalCount
        this.loading = false
      } catch (error) {
        if (error.response && error.response.status === 429) {
          this.rateLimited = true

          this.loading = true

          notify(
            "Whoa, you're really testing our limits! Take a deep breath and try again later... or just take a nap, we won't judge.",
            'warning'
          )
          setTimeout(() => {
            this.fetchAutobots()
            this.loading = false
          }, 60000)
        } else {
          notify(error.message, 'error')
        }
      }
    },

    setPage(page) {
      this.currentPage = page
      this.fetchAutobots() // Fetch Autobots when the page changes
    }
  },
  getters: {
    totalPages: (state) => Math.ceil(state.autobotCount / state.itemsPerPage) || 1,
    isPaginationDisabled: (state) => state.loading || state.rateLimited
  }
})
