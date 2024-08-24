<template>
  <LoadingScreen v-if="loading" />

  <div class="container mx-auto px-4 py-8" v-if="comments?.length">
    <router-link :to="`/autobot/${autobotId}`" class="mt-4 inline-block text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
    </router-link>
    <div class="bg-white shadow-2xl rounded-lg p-6 mb-6 border">
      <h2 class="text-xl font-semibold mb-0 text-right">Welcome {{ autobotDetails?.name }}</h2>

      <h2 class="text-sm font-semibold mb-2 text-right text-gray-400">
        What the bots are saying ...
      </h2>
    </div>
    <div class="bg-white shadow-2xl rounded-lg p-6">
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl duration-300 hover:bg-gray-200 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 border cursor-pointer group text-gray-400"
        >
          <div class="flex flex-col items-center justify-center h-full">
            <span class="text-lg font-medium text-gray-900">{{ comment?.name }}</span>
            <span class="text-xs font-normal group-hover:text-gray-700">{{ comment?.body }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Empty v-else />
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Empty from '@/components/empty.vue'
import LoadingScreen from '@/components/loadingScreen.vue'
import { useNotifications } from '@/composable/globalAlert.js'

const { notify } = useNotifications()

const route = useRoute()

const postId = parseInt(route.params.postId)

const autobotId = parseInt(route.params.autobotId)

const comments = ref([])
const autobotDetails = ref(null)

const loading = ref(false)

const fetchComments = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/api/posts/${postId}/comments`)
    comments.value = res.data
  } catch (error) {
    if (error.response && error.response.status === 429) {

      loading.value = true

      notify(
        "Whoa, you're really testing our limits! Take a deep breath and try again later... or just take a nap, we won't judge.",
        'warning'
      )

      setTimeout(async () => {
        await fetchComments()
        await fetchAutobotDetails()
        loading.value = false
      }, 60000)
    } else {
      // notify(error.message, 'error')
      notify('Something went wrong, working on it. ⚙️', 'error')
    }
  }
}

const fetchAutobotDetails = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/api/autobots/${autobotId}`)
    autobotDetails.value = res.data
  } catch (error) {
    if (error.response && error.response.status === 429) {
      loading.value = true

      notify(
        "Whoa, you're really testing our limits! Take a deep breath and try again later... or just take a nap, we won't judge.",
        'warning'
      )

      setTimeout(async () => {
        await fetchComments()
        await fetchAutobotDetails()
        loading.value = false
      }, 60000)
    } else {
      notify('Something went wrong, working on it. ⚙️', 'error')
    }
  }
}

onMounted(() => {
  fetchComments()
  fetchAutobotDetails()
})
</script>
