import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createAppRouter } from '@/router'
import AboutView from '@/views/AboutView.vue'
import { MANIFESTO, VALUES, TEAM, TIMELINE } from '@/data/about.js'

async function mountAbout() {
  const router = createAppRouter()
  router.push('/sobre')
  await router.isReady()
  return mount(AboutView, { global: { plugins: [router] } })
}

describe('F012 — About page', () => {
  it('hero da página com manifesto em 2-3 parágrafos', async () => {
    const wrapper = await mountAbout()
    expect(wrapper.find('h1').text()).toContain('Feita por quem entende')
    const paragraphs = wrapper.findAll('.manifesto-text')
    expect(paragraphs.length).toBeGreaterThanOrEqual(2)
    expect(paragraphs.length).toBeLessThanOrEqual(3)
    expect(paragraphs.length).toBe(MANIFESTO.length)
  })

  it('seção de valores com 3-4 princípios', async () => {
    const wrapper = await mountAbout()
    const items = wrapper.findAll('.value-item')
    expect(items.length).toBeGreaterThanOrEqual(3)
    expect(items.length).toBeLessThanOrEqual(4)
    expect(items.length).toBe(VALUES.length)
    for (const item of items) {
      expect(item.find('.value-heading').text().length).toBeGreaterThan(0)
      expect(item.find('.value-text').text().length).toBeGreaterThan(10)
    }
  })

  it('time com 5-6 membros (nome, cargo, bio)', async () => {
    const wrapper = await mountAbout()
    const cards = wrapper.findAll('.team-card')
    expect(cards.length).toBeGreaterThanOrEqual(5)
    expect(cards.length).toBeLessThanOrEqual(6)
    expect(cards.length).toBe(TEAM.length)

    for (const card of cards) {
      expect(card.find('.team-photo').attributes('src')).toContain('randomuser.me')
      expect(card.find('.team-name').text().trim().length).toBeGreaterThan(0)
      expect(card.find('.team-role').text().trim().length).toBeGreaterThan(0)
      expect(card.find('.team-bio').text().trim().length).toBeGreaterThan(10)
    }
  })

  it('linha do tempo com 3-4 marcos', async () => {
    const wrapper = await mountAbout()
    const items = wrapper.findAll('.timeline-item')
    expect(items.length).toBeGreaterThanOrEqual(3)
    expect(items.length).toBeLessThanOrEqual(4)
    expect(items.length).toBe(TIMELINE.length)
    for (const item of items) {
      expect(item.find('.timeline-year').text().length).toBeGreaterThan(0)
      expect(item.find('.timeline-heading').text().length).toBeGreaterThan(0)
      expect(item.find('.timeline-text').text().length).toBeGreaterThan(10)
    }
  })

  it('CTA final "Iniciar Projeto" leva à página de contato', async () => {
    const wrapper = await mountAbout()
    const cta = wrapper.find('.btn-primary')
    expect(cta.text()).toBe('Iniciar Projeto')
    expect(cta.attributes('href')).toBe('/contato')
  })
})