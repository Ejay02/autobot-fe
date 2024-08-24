import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp, h } from 'vue'
import { mount, RouterLinkStub, RouterView } from '@vue/test-utils'
import AutobotDashboard from '@/views/autobotDashboard.vue'
import AutobotDetails from '@/views/autobotDetails.vue'
import AutobotComments from '@/views/autobotComments.vue'
import router from '@/router/index' 

describe('Router', () => {
  it('should navigate to home', async () => {
    const app = createApp({
      render: () => h(RouterView),
    })
    app.use(router)

    const wrapper = mount({
      render() {
        return h(RouterView)
      }
    }, {
      global: {
        plugins: [router]
      }
    })

    await router.push('/')
    await router.isReady()

    expect(wrapper.vm.$route.fullPath).toBe('/')
    expect(wrapper.vm.$route.name).toBe('home')
  })

  it('should navigate to AutobotDetails', async () => {
    const app = createApp({
      render: () => h(RouterView),
    })
    app.use(router)

    const wrapper = mount({
      render() {
        return h(RouterView)
      }
    }, {
      global: {
        plugins: [router]
      }
    })

    await router.push('/autobot/1')
    await router.isReady()

    expect(wrapper.vm.$route.fullPath).toBe('/autobot/1')
    expect(wrapper.vm.$route.name).toBe('autobotDetails')
  })

  it('should navigate to AutobotComments', async () => {
    const app = createApp({
      render: () => h(RouterView),
    })
    app.use(router)

    const wrapper = mount({
      render() {
        return h(RouterView)
      }
    }, {
      global: {
        plugins: [router]
      }
    })

    await router.push('/post/123/comments/456')
    await router.isReady()

    expect(wrapper.vm.$route.fullPath).toBe('/post/123/comments/456')
    expect(wrapper.vm.$route.name).toBe('comments')
  })
})
