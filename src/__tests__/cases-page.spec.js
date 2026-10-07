import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createAppRouter } from '@/router'
import CasesView from '@/views/CasesView.vue'
import CaseDetailView from '@/views/CaseDetailView.vue'
import CaseFilter from '@/components/CaseFilter.vue'
import { CASES, caseCategoryLabel } from '@/data/cases.js'

async function mountWithRouter(component, path) {
  const router = createAppRouter()
  router.push(path)
  await router.isReady()
  return mount(component, { global: { plugins: [router] } })
}

describe('F011 — Cases page', () => {
  it('renderiza de 6 a 8 cards de case', async () => {
    const wrapper = await mountWithRouter(CasesView, '/cases')
    const cards = wrapper.findAllComponents({ name: 'CaseCard' })
    expect(cards.length).toBeGreaterThanOrEqual(6)
    expect(cards.length).toBeLessThanOrEqual(8)
    expect(cards.length).toBe(CASES.length)
  })

  it('cada case tem capa, tag de categoria, cliente e métrica', async () => {
    const wrapper = await mountWithRouter(CasesView, '/cases')
    const cards = wrapper.findAll('.case-card')
    expect(cards.length).toBeGreaterThanOrEqual(6)

    for (let i = 0; i < cards.length; i++) {
      const fact = CASES[i]
      expect(cards[i].find('.case-cover img').attributes('src')).toBe(fact.cover)
      expect(cards[i].find('.case-tag').text()).toBe(caseCategoryLabel(fact.category))
      expect(cards[i].find('.case-client').text()).toBe(fact.client)
      expect(cards[i].find('.case-metric strong').text()).toBe(fact.metric.value)
    }
  })

  it('o filtro (mesmo componente da Home) esconde/mostra por categoria', async () => {
    const wrapper = await mountWithRouter(CasesView, '/cases')
    const filter = wrapper.findComponent(CaseFilter)
    expect(filter.exists()).toBe(true)
    const labels = filter.findAll('.filter-btn').map((b) => b.text())
    expect(labels).toEqual(['Todos', 'Branding', 'Web', 'Growth'])

    for (const category of ['branding', 'web', 'growth']) {
      const idx = ['all', 'branding', 'web', 'growth'].indexOf(category)
      await filter.findAll('.filter-btn').at(idx).trigger('click')
      const visible = wrapper.findAll('.case-card')
      expect(visible.length).toBe(CASES.filter((c) => c.category === category).length)
    }

    await filter.findAll('.filter-btn').at(0).trigger('click')
    expect(wrapper.findAll('.case-card').length).toBe(CASES.length)
  })

  it('o CTA final "Iniciar Projeto" leva à página de contato', async () => {
    const wrapper = await mountWithRouter(CasesView, '/cases')
    const cta = wrapper.find('.btn-primary')
    expect(cta.text()).toBe('Iniciar Projeto')
    expect(cta.attributes('href')).toBe('/contato')
  })
})

describe('F011 — Case study (Desafio → Solução → Resultado)', () => {
  it('a rota /cases/:id mostra Desafio/Solução/Resultado e a métrica', async () => {
    for (const item of CASES) {
      const wrapper = await mountWithRouter(CaseDetailView, `/cases/${item.id}`)
      expect(wrapper.find('h1').text()).toBe(item.client)
      expect(wrapper.find('.case-metric strong').text()).toBe(item.metric.value)
      expect(wrapper.find('.case-section').find('h2').text()).toBe('Desafio')
      const titles = wrapper.findAll('.case-section-title').map((s) => s.text())
      expect(titles).toEqual(['Desafio', 'Solução', 'Resultado'])
      const texts = wrapper.findAll('.case-section-text').map((s) => s.text())
      expect(texts[0]).toBe(item.challenge)
      expect(texts[1]).toBe(item.solution)
      expect(texts[2]).toBe(item.result)
    }
  })

  it('case inexistente mostra estado "não encontrado"', async () => {
    const wrapper = await mountWithRouter(CaseDetailView, '/cases/nao-existe')
    expect(wrapper.find('.case-not-found').exists()).toBe(true)
    expect(wrapper.find('.not-found-title').text()).toContain('Case não encontrado')
  })
})