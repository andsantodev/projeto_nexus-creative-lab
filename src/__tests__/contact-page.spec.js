import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createAppRouter } from '@/router'
import ContactView from '@/views/ContactView.vue'
import ContactForm from '@/components/ContactForm.vue'

async function mountContact(path = '/contato') {
  const router = createAppRouter()
  router.push(path)
  await router.isReady()
  return mount(ContactView, { global: { plugins: [router] } })
}

describe('F013 — Contact page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('reusa o formulário de contato (Componente ContactForm) da F009', async () => {
    const wrapper = await mountContact()
    expect(wrapper.findComponent(ContactForm).exists()).toBe(true)
    const form = wrapper.find('form')
    expect(form.find('input[name="name"]').exists()).toBe(true)
    expect(form.find('select[name="budget"]').exists()).toBe(true)
    expect(form.find('textarea[name="details"]').exists()).toBe(true)
  })

  it('informações complementares: e-mail, tempo de resposta, área de atendimento', async () => {
    const wrapper = await mountContact()
    const info = wrapper.findAll('.contact-info-item').map((i) => i.text())
    expect(info.some((t) => t.includes('contato@nexuscreative.lab'))).toBe(true)
    expect(info.some((t) => t.toLowerCase().includes('24h'))).toBe(true)
    expect(info.some((t) => t.toLowerCase().includes('remoto'))).toBe(true)
  })

  it('FAQ curto com 3-4 perguntas e respostas', async () => {
    const wrapper = await mountContact()
    const items = wrapper.findAll('.faq-item')
    expect(items.length).toBeGreaterThanOrEqual(3)
    expect(items.length).toBeLessThanOrEqual(4)
    for (const item of items) {
      expect(item.find('.faq-question').text().length).toBeGreaterThan(5)
      expect(item.find('.faq-answer').text().length).toBeGreaterThan(10)
    }
  })

  it('submissão simula sucesso (sem rede), igual à F009', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true })

    const wrapper = await mountContact()
    const form = wrapper.find('form')
    form.find('input[name="name"]').setValue('Ana Souza')
    form.find('input[name="email"]').setValue('ana@empresa.com')
    form.find('select[name="budget"]').setValue('50-100k')
    form.find('textarea[name="details"]').setValue('Rebrand e novo site.')

    await form.trigger('submit')
    expect(wrapper.find('.contact-success').exists()).toBe(true)
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('pré-seleciona o serviço vindo da query ?servico=', async () => {
    const wrapper = await mountContact('/contato?servico=brand-strategy')
    const note = wrapper.find('.service-note')
    expect(note.exists()).toBe(true)
    expect(note.text()).toContain('brand-strategy')
  })
})