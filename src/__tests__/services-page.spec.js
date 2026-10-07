import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createAppRouter } from '@/router'
import ServicesView from '@/views/ServicesView.vue'
import { SERVICES } from '@/data/services.js'

async function mountServices() {
  const router = createAppRouter()
  router.push('/servicos')
  await router.isReady()
  return mount(ServicesView, { global: { plugins: [router] } })
}

describe('F010 — Services page', () => {
  it('renderiza o hero da página com título e subtítulo', async () => {
    const wrapper = await mountServices()
    expect(wrapper.find('h1').text()).toContain('Soluções que escalam')
    expect(wrapper.find('.page-hero-subtitle').text().toLowerCase()).toContain(
      'quatro pilares',
    )
  })

  it('apresenta os 4 serviços com processo, entregáveis e mini-CTA', async () => {
    const wrapper = await mountServices()
    const blocks = wrapper.findAll('.service-block')
    expect(blocks.length).toBe(4)

    for (let i = 0; i < blocks.length; i++) {
      const service = SERVICES[i]
      const block = blocks[i]

      expect(block.find('.service-block-title').text()).toBe(service.title)
      expect(block.find('.service-block-long').text().length).toBeGreaterThan(50)

      const steps = block.findAll('.process-step')
      expect(steps.length).toBeGreaterThanOrEqual(3)

      const deliverables = block.findAll('.deliverable')
      expect(deliverables.length).toBeGreaterThanOrEqual(3)

      const miniCta = block.find('.mini-cta')
      expect(miniCta.text()).toBe('Falar sobre este serviço')
      expect(miniCta.attributes('href')).toContain('/contato')
    }
  })

  it('seção FAQ mostra de 4 a 5 perguntas com respostas', async () => {
    const wrapper = await mountServices()
    const items = wrapper.findAll('.faq-item')
    expect(items.length).toBeGreaterThanOrEqual(4)
    expect(items.length).toBeLessThanOrEqual(5)

    for (const item of items) {
      expect(item.find('.faq-question').text().length).toBeGreaterThan(5)
      expect(item.find('.faq-answer').text().length).toBeGreaterThan(10)
    }
  })

  it('CTA final "Iniciar Projeto" leva à página de contato', async () => {
    const wrapper = await mountServices()
    const cta = wrapper.find('.btn-primary')
    expect(cta.text()).toBe('Iniciar Projeto')
    expect(cta.attributes('href')).toBe('/contato')
  })
})