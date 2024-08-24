import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import NotificationComponent from '@/components/alert.vue'

describe('NotificationComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders the component with default props', async () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        message: 'Test message'
      }
    })

    await nextTick()

    expect(wrapper.text()).toContain('Test message')
    expect(wrapper.find('.notification').classes()).toContain('info')
    expect(wrapper.find('i').classes()).toContain('bi-exclamation-circle')
  })

  it('applies correct class and icon based on type prop', async () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        message: 'Success message',
        type: 'success'
      }
    })

    await nextTick()

    expect(wrapper.find('.notification').classes()).toContain('success')
    expect(wrapper.find('i').classes()).toContain('fa-circle-check')
  })

  it('hides the notification after the specified duration', async () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        message: 'Quick message',
        duration: 1000
      }
    })

    await nextTick()

    expect(wrapper.find('.notification').exists()).toBe(true)

    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(wrapper.find('.notification').exists()).toBe(false)
  })

  it('uses custom duration', async () => {
    const wrapper = mount(NotificationComponent, {
      props: {
        message: 'Long message',
        duration: 5000
      }
    })

    await nextTick()

    expect(wrapper.find('.notification').exists()).toBe(true)

    vi.advanceTimersByTime(3000)
    await nextTick()

    expect(wrapper.find('.notification').exists()).toBe(true)

    vi.advanceTimersByTime(2000)
    await nextTick()

    expect(wrapper.find('.notification').exists()).toBe(false)
  })

  it('applies correct icon class for different types', async () => {
    const types = ['success', 'error', 'warning', 'info', 'default']
    const expectedIcons = [
      'fa-circle-check',
      'fa-circle-xmark',
      'bi-exclamation-triangle-fill',
      'bi-exclamation-circle',
      'fa-circle-info'
    ]

    for (let i = 0; i < types.length; i++) {
      const wrapper = mount(NotificationComponent, {
        props: {
          message: `${types[i]} message`,
          type: types[i]
        }
      })

      await nextTick()

      expect(wrapper.find('i').classes()).toContain(expectedIcons[i])
    }
  })
})
