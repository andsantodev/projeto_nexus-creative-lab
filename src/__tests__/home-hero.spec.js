import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeHero from '@/components/HomeHero.vue'

function mountHero() {
  return mount(HomeHero)
}

describe('F003 — Home Hero', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('renderiza H1, subtítulo e os dois CTAs (PRD §6 item 1)', () => {
    const wrapper = mountHero()
    expect(wrapper.find('h1.hero-title').text()).toContain('Dados, design e tecnologia')
    expect(wrapper.find('.hero-subtitle').text().trim().length).toBeGreaterThan(0)

    const actions = wrapper.findAll('.hero-actions .btn')
    expect(actions.map((a) => a.text())).toEqual(['Iniciar Projeto', 'Ver Cases'])
  })

  it('CTA primário "Iniciar Projeto" rola até a seção de contato', async () => {
    const target = document.createElement('section')
    target.id = 'contato'
    document.body.appendChild(target)
    const scrollSpy = vi.spyOn(target, 'scrollIntoView')

    const wrapper = mountHero()
    const primary = wrapper.findAll('.hero-actions .btn')[0]

    expect(primary.attributes('href')).toBe('#contato')
    await primary.trigger('click')
    expect(scrollSpy).toHaveBeenCalledTimes(1)
  })

  it('CTA secundário "Ver Cases" rola até a seção de cases', async () => {
    const target = document.createElement('section')
    target.id = 'cases'
    document.body.appendChild(target)
    const scrollSpy = vi.spyOn(target, 'scrollIntoView')

    const wrapper = mountHero()
    const secondary = wrapper.findAll('.hero-actions .btn')[1]

    expect(secondary.attributes('href')).toBe('#cases')
    await secondary.trigger('click')
    expect(scrollSpy).toHaveBeenCalledTimes(1)
  })

  it('traz o efeito visual de fundo em grid dinâmico (PRD item 1)', () => {
    const wrapper = mountHero()
    const visual = wrapper.find('.hero-visual')
    expect(visual.exists()).toBe(true)
    const nodes = wrapper.findAll('.hero-node')
    expect(nodes.length).toBeGreaterThanOrEqual(12)
  })
})