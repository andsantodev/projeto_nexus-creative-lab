import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import HomeCases from '@/components/HomeCases.vue'
import { CASE_CATEGORIES, FEATURED_CASES } from '@/data/cases.js'

describe('F006 — Home: Cases gallery with filter', () => {
  it('renderiza 3 cards de case com imagem, tag, título do cliente e métrica', () => {
    const wrapper = mount(HomeCases)
    const cards = wrapper.findAll('.case-card')
    expect(cards.length).toBe(3)

    for (const [i, card] of cards.entries()) {
      const fact = FEATURED_CASES[i]
      const img = card.find('.case-cover img')
      expect(img.attributes('src')).toBe(fact.cover)
      expect(img.attributes('alt').length).toBeGreaterThan(0)

      const tag = card.find('.case-tag')
      expect(tag.text()).toBe(CASE_CATEGORIES.find((c) => c.id === fact.category).label)

      expect(card.find('.case-client').text()).toBe(fact.client)
      expect(card.find('.case-metric strong').text()).toBe(fact.metric.value)
      expect(card.find('.case-metric span').text()).toBe(fact.metric.label)
    }
  })

  it('a seção tem id "cases" (alvo do CTA do hero)', () => {
    const wrapper = mount(HomeCases)
    expect(wrapper.find('section#cases').exists()).toBe(true)
  })

  it('o filtro "Todos | Branding | Web | Growth" exibe as opções do PRD', () => {
    const wrapper = mount(HomeCases)
    const labels = wrapper.findAll('.filter-btn').map((b) => b.text())
    expect(labels).toEqual(['Todos', 'Branding', 'Web', 'Growth'])
  })

  it('filtra corretamente por categoria (Branding/Web/Growth) e volta para Todos', async () => {
    const wrapper = mount(HomeCases)
    const buttons = wrapper.findAll('.filter-btn')

    for (const category of ['branding', 'web', 'growth']) {
      const idx = CASE_CATEGORIES.findIndex((c) => c.id === category)
      await buttons[idx].trigger('click')
      const visible = wrapper.findAll('.case-card')
      expect(visible.length).toBe(
        FEATURED_CASES.filter((c) => c.category === category).length,
      )
      expect(buttons[idx].classes()).toContain('is-active')
      expect(buttons[idx].attributes('aria-pressed')).toBe('true')
    }

    await buttons[0].trigger('click')
    expect(wrapper.findAll('.case-card').length).toBe(3)
  })

  it('a Home compõe a seção de cases', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent(HomeCases).exists()).toBe(true)
  })
})