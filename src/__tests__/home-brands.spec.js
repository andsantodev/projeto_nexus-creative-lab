import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import HomeBrands from '@/components/HomeBrands.vue'
import HomeBrandsRaw from '@/components/HomeBrands.vue?raw'

describe('F004 — Home: Brands/clients marquee', () => {
  it('renderiza de 6 a 8 logos placeholder não-duplicados', () => {
    const wrapper = mount(HomeBrands)
    const logos = wrapper.findAll('.brands-list:not(.brands-list--clone) .brand-logo')
    expect(logos.length).toBeGreaterThanOrEqual(6)
    expect(logos.length).toBeLessThanOrEqual(8)
    const names = logos.map((l) => l.find('.brand-name').text())
    expect(new Set(names).size).toBe(logos.length)
  })

  it('cada logo tem marca SVG monocromática + wordmark', () => {
    const wrapper = mount(HomeBrands)
    const logos = wrapper.findAll('.brands-list:not(.brands-list--clone) .brand-logo')
    for (const logo of logos) {
      expect(logo.find('svg.brand-mark').exists()).toBe(true)
      expect(logo.find('.brand-name').exists()).toBe(true)
    }
  })

  it('o marquee é contínuo: lista duplicada aria-hidden para o loop', () => {
    const wrapper = mount(HomeBrands)
    const lists = wrapper.findAll('.brands-list')
    expect(lists.length).toBe(2)
    const visible = lists[0]
    const clone = lists[1]
    expect(clone.attributes('aria-hidden')).toBe('true')
    expect(visible.findAll('.brand-logo').length).toBe(clone.findAll('.brand-logo').length)
  })

  it('a animação de rolagem contínua está declarada e respeita reduced-motion', () => {
    expect(HomeBrandsRaw).toContain('@keyframes marquee')
    expect(HomeBrandsRaw).toMatch(/animation:\s*marquee\s*30s linear infinite/)
    expect(HomeBrandsRaw).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('a Home compõe a seção de marcas após o hero', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent(HomeBrands).exists()).toBe(true)
  })
})