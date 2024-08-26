<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white shadow-2xl rounded-lg p-6 border mb-5">
      <h2 class="text-xl font-semibold mb-2 text-right">Total 🤖s</h2>
      <p class="text-4xl font-bold text-blue-600 text-right">{{ autobotStore.autobotCount }}</p>
    </div>

    <LoadingScreen v-if="autobotStore.loading" />
    <div class="bg-white shadow-2xl rounded-lg p-6 border" v-if="displayedAutobots.length">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
        <TransitionGroup name="autobot-list">
          <div
            v-for="(autobot, index) in displayedAutobots"
            :key="autobot.id"
            class="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl duration-300 hover:bg-gray-200 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 border"
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
              <span class="text-lg font-medium text-gray-900 text-ellipsis truncate">{{
                autobot.name
              }}</span>
              <span class="text-xs font-normal text-gray-400">{{ autobot.email }}</span>
            </router-link>
          </div>
        </TransitionGroup>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="prevPage"
          :disabled="autobotStore.currentPage === 1 || autobotStore.isPaginationDisabled"
          class="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ autobotStore.currentPage }} of {{ autobotStore.totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="
            autobotStore.currentPage === autobotStore.totalPages ||
            autobotStore.isPaginationDisabled
          "
          class="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    <Empty v-else />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Empty from '@/components/empty.vue'
import { useAutobotStore } from '../stores/autobot'
import LoadingScreen from '@/components/loadingScreen.vue'

const autobotStore = useAutobotStore()

const displayedAutobots = ref([])

const updateDisplayedAutobots = () => {
  const newBots = autobotStore.newlyCreatedAutobots.slice(
    0,
    autobotStore.itemsPerPage - displayedAutobots.value.length
  )
  displayedAutobots.value = [...displayedAutobots.value, ...newBots]
  newBots.forEach((bot) => autobotStore.removeFromNewlyCreated(bot.id))
}

onMounted(() => {
  autobotStore.initSocket()
  autobotStore.fetchAutobots().then(() => {
    displayedAutobots.value = autobotStore.autobots
  })
})

autobotStore.initSocket()
autobotStore.fetchAutobots()
autobotStore.fetchAutobots().then(() => {
  displayedAutobots.value = autobotStore.autobots
})

watch(
  () => autobotStore.newlyCreatedAutobots,
  () => {
    if (displayedAutobots.value.length < autobotStore.itemsPerPage) {
      updateDisplayedAutobots()
    }
  },
  { deep: true }
)

watch(
  () => autobotStore.autobots,
  (newAutobots) => {
    displayedAutobots.value = newAutobots
  }
)

const prevPage = () => {
  if (autobotStore.currentPage > 1 && !autobotStore.isPaginationDisabled) {
    autobotStore.setPage(autobotStore.currentPage - 1)
  }
}

const nextPage = () => {
  if (autobotStore.currentPage < autobotStore.totalPages && !autobotStore.isPaginationDisabled) {
    autobotStore.setPage(autobotStore.currentPage + 1)
  }
}
</script>

<style>
.autobot-list-enter-active,
.autobot-list-leave-active {
  transition: all 0.5s ease;
}
.autobot-list-enter-from,
.autobot-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
