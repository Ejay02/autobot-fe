import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useNotifications } from '@/composable/globalAlert'
import * as vue from 'vue'

vi.mock('@/components/alert.vue', () => ({
  default: {
    render: () => vue.h('div', 'Mocked Notification')
  }
}))

describe('useNotifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.useFakeTimers()

    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('creates a notification and adds it to the DOM', () => {
    const { notify } = useNotifications()
    const appendChildSpy = vi.spyOn(document.body, 'appendChild')

    notify('Test message')

    expect(appendChildSpy).toHaveBeenCalledTimes(1)
    expect(document.body.children.length).toBe(1)
  })

  it('removes the notification after the specified duration', () => {
    const { notify } = useNotifications()

    notify('Test message', 'info', 1000)

    expect(document.body.children.length).toBe(1)

    vi.advanceTimersByTime(1000)

    expect(document.body.children.length).toBe(0)
  })
})
