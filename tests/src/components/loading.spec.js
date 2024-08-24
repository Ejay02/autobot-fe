import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingComponent from '@/components/loadingScreen.vue'

describe('LoadingComponent', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(LoadingComponent)

    // Check if the main container exists and has correct classes
    const mainContainer = wrapper.find('div')
    expect(mainContainer.exists()).toBe(true)
    expect(mainContainer.classes()).toContain('fixed')
    expect(mainContainer.classes()).toContain('top-0')
    expect(mainContainer.classes()).toContain('left-0')
    expect(mainContainer.classes()).toContain('w-full')
    expect(mainContainer.classes()).toContain('h-full')
    expect(mainContainer.classes()).toContain('bg-white')
    expect(mainContainer.classes()).toContain('bg-opacity-80')
    expect(mainContainer.classes()).toContain('z-50')
    expect(mainContainer.classes()).toContain('flex')
    expect(mainContainer.classes()).toContain('justify-center')
    expect(mainContainer.classes()).toContain('items-center')
    expect(mainContainer.classes()).toContain('transition-opacity')
    expect(mainContainer.classes()).toContain('duration-300')

    // Check if the spinner exists and has correct classes
    const spinner = wrapper.find('.spinner-border')
    expect(spinner.exists()).toBe(true)
    expect(spinner.classes()).toContain('text-primary')
    expect(spinner.attributes('role')).toBe('status')

    // Check if the sr-only span exists
    expect(wrapper.find('.sr-only').exists()).toBe(true)

    // Check if the loading text exists and has correct content and classes
    const loadingText = wrapper.find('h2')
    expect(loadingText.exists()).toBe(true)
    expect(loadingText.text()).toBe('Loading, stand by...')
    expect(loadingText.classes()).toContain('text-lg')
    expect(loadingText.classes()).toContain('font-mono')
    expect(loadingText.classes()).toContain('text-blue-600')
    expect(loadingText.classes()).toContain('ml-4')
    expect(loadingText.classes()).toContain('animate-pulse')
  })
})
