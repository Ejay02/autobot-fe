import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAutobotStore } from '@/stores/autobot'
import { useNotifications } from '@/composable/globalAlert.js'
import axios from 'axios'

vi.mock('socket.io-client', () => ({
  io: vi.fn().mockReturnValue({
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn()
  })
}))

vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        autobots: [
          { id: 1, name: 'Autobot 1' },
          { id: 2, name: 'Autobot 2' }
        ],
        totalCount: 2
      }
    })
  }
}))

vi.mock('@/composable/globalAlert.js', () => ({
  useNotifications: vi.fn().mockReturnValue({
    notify: vi.fn()
  })
}))

describe('useAutobotStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize the socket connection', () => {
    const store = useAutobotStore()
    store.initSocket()
    expect(store.socket).not.toBeNull()
  })

  it('should fetch autobots', async () => {
    const store = useAutobotStore()
    await store.fetchAutobots()
    expect(store.autobots.length).toBe(2)
    expect(store.autobotCount).toBe(2)
  })

  it('should set the current page', () => {
    const store = useAutobotStore()
    store.setPage(2)
    expect(store.currentPage).toBe(2)
  })

  it('should calculate the total pages', () => {
    const store = useAutobotStore()
    store.autobotCount = 25
    store.itemsPerPage = 10
    expect(store.totalPages).toBe(3)
  })

  it('should disable pagination when loading or rate limited', () => {
    const store = useAutobotStore()
    store.loading = true
    expect(store.isPaginationDisabled).toBe(true)

    store.loading = false
    store.rateLimited = true
    expect(store.isPaginationDisabled).toBe(true)
  })
})
