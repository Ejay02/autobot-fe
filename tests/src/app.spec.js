import { mount } from '@vue/test-utils';
import App from '@/App.vue';

test('App component renders correctly', () => {
  const wrapper = mount(App);
  expect(wrapper.find('header').classes()).toContain('bg-slate-600');
  expect(wrapper.find('h1').text()).toBe('🤖 Autobot Management System');
  expect(wrapper.find('router-link').attributes().to).toBe('/');
});