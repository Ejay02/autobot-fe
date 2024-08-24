import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyStateComponent from '@/components/empty.vue'

describe('EmptyStateComponent', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(EmptyStateComponent)

    // Check if the main container exists
    expect(wrapper.find('.flex.justify-center.items-center').exists()).toBe(true)

    // Check if the inner container exists
    expect(wrapper.find('.text-center').exists()).toBe(true)

    // Check if the white background container exists
    expect(wrapper.find('.bg-white.p-28.rounded-lg.shadow-lg.mt-20').exists()).toBe(true)

    // Check if the bouncing circle exists
    expect(wrapper.find('.mx-auto.mb-4.w-24.h-24.rounded-full.bg-gray-100').exists()).toBe(true)

    // Check if the bouncing circle has the correct animation classes
    const bouncingCircle = wrapper.find('.mx-auto.mb-4.w-24.h-24.rounded-full.bg-gray-100')
    expect(bouncingCircle.classes()).toContain('animate-bounce')
    expect(bouncingCircle.classes()).toContain('animate-duration-3000')
    expect(bouncingCircle.classes()).toContain('animate-iteration-count-infinite')

    // Check if the heading text is correct
    expect(wrapper.find('h2').text()).toBe('Nothing here yet')

    // Check if the heading has the correct classes
    expect(wrapper.find('h2').classes()).toContain('text-lg')
    expect(wrapper.find('h2').classes()).toContain('font-bold')
    expect(wrapper.find('h2').classes()).toContain('text-gray-700')

    // Check if the paragraph text is correct
    expect(wrapper.find('p').text()).toBe('Come back in an hour :).')

    // Check if the paragraph has the correct classes
    expect(wrapper.find('p').classes()).toContain('text-gray-500')
    expect(wrapper.find('p').classes()).toContain('text-xs')
  })
})