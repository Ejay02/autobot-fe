<template>
  <div class="container mx-auto px-4 py-8" v-if="comments?.length">
    <router-link to="/autobot/2092" class="mt-4 inline-block text-gray-500">
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
      <h2 class="text-xl font-semibold mb-2 text-right">
        {{ autobot }}
        Comments for {{ autobot?.name }} ({{ autobot?.username }})
      </h2>
    </div>
    <div class="bg-white shadow-2xl rounded-lg p-6">
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl duration-300 hover:bg-gray-400 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 border cursor-pointer"
        >
          <div class="flex flex-col items-center justify-center h-full">
            <span class="text-lg font-medium text-gray-900">{{ comment.name }}</span>
            <span class="text-xs font-normal text-gray-900">{{ comment.body }}</span>
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
import { useNotifications } from '@/composable/globalAlert.js'

const { notify } = useNotifications()

import { useRouter } from 'vue-router'

const props = defineProps({
  postId: {
    type: String,
    required: true
  }
})

const postId = parseInt(props.postId)

const comments = ref([])

const fetchComments = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/api/posts/${postId}/comments`)
    comments.value = res.data
  } catch (error) {
    notify('Something went wrong, working on it. ⚙️', 'error')
  }
}

onMounted(() => {
  fetchComments()
})
</script>
