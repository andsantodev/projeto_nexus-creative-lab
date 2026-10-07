import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import HomeMetrics from '@/components/HomeMetrics.vue'
import { METRICS } from '@/data/metrics.js'

describe('F007 — Home: Agency metrics counters', () => {
  it('anima os contadores até os valores finais do dataset', async () => {
    vi.useFakeTimers()
    try {
      const wrapper = mount(HomeMetrics)
      await vi.advanceTimersByTimeAsync(3000)
      const values = wrapper.findAll('.metric-value')
      for (let i = 0; i < METRICS.length; i++) {
        const m = METRICS[i]
        expect(values.at(i).text()).toBe(`${m.prefix}${m.value}${m.suffix}`)
      }
    } finally {
      vi.useRealTimers()
    }
  })

  it('renderiza os 4 rótulos sem animação quando reduced-motion', async () => {
    window.matchMedia.mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    try {
      const wrapper = mount(HomeMetrics)
      const labels = wrapper.findAll('.metric-label').map((l) => l.text())
      expect(labels.length).toBe(4)
      for (const label of labels) {
        expect(label.trim().length).toBeGreaterThan(0)
      }
    } finally {
      window.matchMedia.mockReturnValue({
        matches: false,
        media: '',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })
    }
  })

  it('os 4 contadores cobrem os tópicos do PRD (projetos, receita, retenção, prêmios)', () => {
    const labels = METRICS.map((m) => m.label).join(' | ').toLowerCase()
    expect(labels).toContain('projetos')
    expect(labels).toContain('receita')
    expect(labels).toContain('retenção')
    expect(labels).toContain('prêmios')
  })

  it('sinaliza valores como ilustrativos na UI', () => {
    const wrapper = mount(HomeMetrics)
    expect(wrapper.find('.metrics-note').text()).toContain('ilustrativos')
    expect(wrapper.find('.metrics-note').text()).toContain('fictício')
  })

  it('a Home compõe a seção de métricas após as cases', () => {
    const wrapper = mount(HomeView)
    const components = wrapper.findAllComponents(HomeMetrics)
    expect(components.length).toBe(1)
  })
})