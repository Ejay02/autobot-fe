import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyStateComponent from '@/components/empty.vue'

describe('EmptyStateComponent', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(EmptyStateComponent)

    expect(wrapper.find('.flex.justify-center.items-center').exists()).toBe(true)

    expect(wrapper.find('.text-center').exists()).toBe(true)

    expect(wrapper.find('.bg-white.p-28.rounded-lg.shadow-lg.mt-20').exists()).toBe(true)

    expect(wrapper.find('.mx-auto.mb-4.w-24.h-24.rounded-full.bg-gray-100').exists()).toBe(true)

    const bouncingCircle = wrapper.find('.mx-auto.mb-4.w-24.h-24.rounded-full.bg-gray-100')
    expect(bouncingCircle.classes()).toContain('animate-bounce')
    expect(bouncingCircle.classes()).toContain('animate-duration-3000')
    expect(bouncingCircle.classes()).toContain('animate-iteration-count-infinite')

    expect(wrapper.find('h2').text()).toBe('Nothing here yet')

    expect(wrapper.find('h2').classes()).toContain('text-lg')
    expect(wrapper.find('h2').classes()).toContain('font-bold')
    expect(wrapper.find('h2').classes()).toContain('text-gray-700')

    expect(wrapper.find('p').text()).toBe('Come back in an hour :).')

    expect(wrapper.find('p').classes()).toContain('text-gray-500')
    expect(wrapper.find('p').classes()).toContain('text-xs')
  })
})
