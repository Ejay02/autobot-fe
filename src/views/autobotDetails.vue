<template>
  <LoadingScreen v-if="autobotStore?.loading" />
  <div class="container mx-auto px-4 py-8">
    <router-link to="/" class="mt-4 inline-block text-gray-500">
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

    <h1 class="text-3xl font-bold mb-4"></h1>
    <div class="bg-white shadow rounded-lg p-6 text-end border mb-8 flex justify-between">
      <div class="justify-center items-center">
        <img
          src="https://picsum.photos/500/600"
          alt="Autobot Avatar"
          class="w-20 h-20 rounded-full mr-4"
        />
      </div>
      <div class="">
        <h2 class="text-2xl font-semibold mb-4">{{ autobot?.name }}</h2>
        <p><strong>ID:</strong> {{ autobot?.id }}</p>
        <p><strong>Username:</strong> {{ autobot?.username }}</p>
        <p><strong>Email:</strong> {{ autobot?.email }}</p>
      </div>
    </div>

    <!-- body -->
    <h3 class="text-xl font-semibold mb-4"></h3>

    <div class="bg-white shadow-lg rounded-lg p-4">
      <div class="flex flex-col space-y-4">
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl duration-300 hover:bg-gray-200 transition ease-in-out delay-150 cursor-pointer"
        >
          <div class="flex justify-between">
            <div class="flex">
              <div @click="togglePost(index)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    :d="
                      openPost === index
                        ? 'm4.5 15.75 7.5-7.5 7.5 7.5'
                        : 'm19.5 8.25-7.5 7.5-7.5-7.5'
                    "
                  />
                </svg>
              </div>
              <div @click="togglePost(index)" class="text-lg font-medium text-gray-500 ml-2">
                <span>
                  {{ post?.title }}
                </span>
              </div>
            </div>

            <div class="" @click="goToComments(post.id, autobot.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </div>
          </div>
          <div v-if="openPost === index" class="text-xs font-normal text-gray-400 mt-2 ml-7">
            {{ post?.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAutobotStore } from '../stores/autobot'
import LoadingScreen from '@/components/loadingScreen.vue'
import { useNotifications } from '@/composable/globalAlert.js'

const { notify } = useNotifications()

const route = useRoute()
const autobotStore = useAutobotStore()
const autobot = ref(null)
const posts = ref([])
const autobotId = parseInt(route.params.id)

const openPost = ref(null)

const router = useRouter()

const goToComments = (postId, autobotId) => {
  router.push({ name: 'comments', params: { postId, autobotId } })
}

const togglePost = (index) => {
  if (openPost.value === index) {
    openPost.value = null
  } else {
    openPost.value = index
  }
}

const fetchPosts = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/api/autobots/${autobotId}/posts`)
    posts.value = res.data
  } catch (error) {
    notify('Something went wrong, working on it. ⚙️', 'error')
  }
}

onMounted(() => {
  fetchPosts()
})

onMounted(async () => {
  autobot.value = autobotStore.autobots.find((a) => a.id === autobotId)
})
</script>
