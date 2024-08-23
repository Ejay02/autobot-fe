import { createRouter, createWebHistory } from 'vue-router'

import AutobotDashboard from '@/views/autobotDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AutobotDashboard
    },
    {
      path: '/autobot/:id',
      name: 'autobotDetails',
      component: () => import('@/views/autobotDetails.vue')
    },
    {
      path: '/post/:postId/comments/:autobotId',
      name: 'comments',
      component: () => import('@/views/autobotComments.vue')
    }
  ]
})

export default router
