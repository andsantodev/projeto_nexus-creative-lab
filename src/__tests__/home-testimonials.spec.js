import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import HomeTestimonials from '@/components/HomeTestimonials.vue'

describe('F008 — Home: Testimonials carousel', () => {
  it('renderiza 3 cards com citação, foto, nome e cargo', () => {
    const wrapper = mount(HomeTestimonials)
    const slides = wrapper.findAll('.slide')
    expect(slides.length).toBe(3)

    for (const slide of slides) {
      expect(slide.find('.slide-quote').text().length).toBeGreaterThan(10)
      const photo = slide.find('.slide-photo')
      expect(photo.attributes('src')).toContain('picsum.photos')
      expect(photo.attributes('alt').length).toBeGreaterThan(0)
      expect(slide.find('.slide-name').text().trim().length).toBeGreaterThan(0)
      expect(slide.find('.slide-role').text().trim().length).toBeGreaterThan(0)
    }
  })

  it('controles de navegação funcionam (próximo, anterior e dots)', async () => {
    const wrapper = mount(HomeTestimonials)
    const buttons = wrapper.findAll('.carousel-btn')
    const dots = wrapper.findAll('.carousel-dot')
    expect(buttons.length).toBe(2)
    expect(dots.length).toBe(3)

    expect(dots.at(0).classes()).toContain('is-active')

    await buttons.at(1).trigger('click') // next -> 1
    expect(dots.at(1).classes()).toContain('is-active')
    expect(wrapper.find('.carousel-track').attributes('style')).toContain('translateX(-100%)')

    await buttons.at(1).trigger('click') // next -> 2
    expect(dots.at(2).classes()).toContain('is-active')
    expect(wrapper.find('.carousel-track').attributes('style')).toContain('translateX(-200%)')

    await buttons.at(0).trigger('click') // prev -> 1
    expect(dots.at(1).classes()).toContain('is-active')

    await buttons.at(0).trigger('click') // prev -> 0
    expect(dots.at(0).classes()).toContain('is-active')

    await buttons.at(0).trigger('click') // prev wraps -> 2
    expect(dots.at(2).classes()).toContain('is-active')

    await dots.at(1).trigger('click') // goTo
    expect(dots.at(1).classes()).toContain('is-active')
  })

  it('a Home compõe a seção de depoimentos', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent(HomeTestimonials).exists()).toBe(true)
  })
})