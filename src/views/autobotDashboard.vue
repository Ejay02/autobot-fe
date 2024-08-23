<template>
  <LoadingScreen v-if="autobotStore?.loading" />
  <div class="container mx-auto px-4 py-8" v-if="autobotStore?.autobots?.length">
    <div class="bg-white shadow-2xl rounded-lg p-6 mb-6 border">
      <h2 class="text-xl font-semibold mb-2 text-right">Total 🤖s</h2>
      <p class="text-4xl font-bold text-blue-600 text-right">{{ autobotStore.autobotCount }}</p>
    </div>
    <div class="bg-white shadow-2xl rounded-lg p-6">
      <!-- <h2 class="text-xl font-semibold mb-4">Autobot List</h2> -->
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        <div
          v-for="(autobot, index) in autobotStore?.autobots"
          :key="autobot.id"
          class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl duration-300 hover:bg-gray-400 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 border"
        >
          <router-link
            :to="`/autobot/${autobot.id}`"
            class="flex flex-col items-center justify-center h-full"
          >
            <img
              :src="`https://picsum.photos/200/300?image=${index + 1}`"
              :alt="autobot.name"
              class="w-20 h-20 rounded-full mb-2"
            />
            <span class="text-lg font-medium text-gray-900">{{ autobot.name }}</span>
            <span class="text-xs font-normal text-gray-900">{{ autobot.email }}</span>
          </router-link>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="prevPage"
          :disabled="autobotStore.currentPage === 1"
          class="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ autobotStore.currentPage }} of {{ autobotStore.totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="autobotStore.currentPage === autobotStore.totalPages"
          class="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  <Empty v-else />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAutobotStore } from '../stores/autobot'
import Empty from '@/components/empty.vue'
import LoadingScreen from '@/components/loadingScreen.vue'

const autobotStore = useAutobotStore()

onMounted(() => {
  autobotStore.initSocket()
  autobotStore.fetchAutobots()
})

const prevPage = () => {
  if (autobotStore.currentPage > 1) {
    autobotStore.setPage(autobotStore.currentPage - 1)
  }
}

const nextPage = () => {
  if (autobotStore.currentPage < autobotStore.totalPages) {
    autobotStore.setPage(autobotStore.currentPage + 1)
  }
}
</script>
