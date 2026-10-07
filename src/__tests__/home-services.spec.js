import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import HomeServices from '@/components/HomeServices.vue'
import HomeServicesRaw from '@/components/HomeServices.vue?raw'
import { SERVICES } from '@/data/services.js'

const EXPECTED_TITLES = [
  'Brand Strategy',
  'Growth Marketing',
  'UI/UX & Web Development',
  'Data Analytics',
]

describe('F005 — Home: Services grid', () => {
  it('renderiza os 4 cards de serviço com os títulos do PRD', () => {
    const wrapper = mount(HomeServices)
    const names = wrapper.findAll('.service-name').map((n) => n.text())
    expect(names.length).toBe(4)
    for (const title of EXPECTED_TITLES) {
      expect(names).toContain(title)
    }
  })

  it('cada card tem descrição curta e lista de entregáveis', () => {
    const wrapper = mount(HomeServices)
    const cards = wrapper.findAll('.service-card')
    expect(cards.length).toBe(4)
    for (const card of cards) {
      expect(card.find('.service-desc').text().trim().length).toBeGreaterThan(0)
      const deliverables = card.findAll('.service-deliverable')
      expect(deliverables.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('a data compartilhada tem os 4 serviços com entregáveis (retomada pela F010)', () => {
    expect(SERVICES.length).toBe(4)
    for (const s of SERVICES) {
      expect(s.title).toBeTruthy()
      expect(s.short).toBeTruthy()
      expect(s.deliverables.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('declara o efeito hover de borda/brilho nos cards', () => {
    expect(HomeServicesRaw).toContain('.service-card:hover')
    expect(HomeServicesRaw).toContain('border-color: var(--color-accent)')
    expect(HomeServicesRaw).toContain('box-shadow')
  })

  it('a Home compõe a seção de serviços', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent(HomeServices).exists()).toBe(true)
  })
})