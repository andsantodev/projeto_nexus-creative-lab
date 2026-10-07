import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import HomeContact from '@/components/HomeContact.vue'
import ContactForm from '@/components/ContactForm.vue'

function setValue(wrapper, input, value) {
  input.setValue(value)
}

describe('F009 — Home: Contact form (UI only)', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('a seção tem id "contato" (alvo do CTA do hero) e renderiza o formulário', () => {
    const wrapper = mount(HomeContact)
    expect(wrapper.find('section#contato').exists()).toBe(true)
    expect(wrapper.findComponent(ContactForm).exists()).toBe(true)
  })

  it('renderiza os 4 campos (nome, email, orçamento select, detalhes) + botão', () => {
    const wrapper = mount(HomeContact)
    const form = wrapper.find('form')
    expect(form.find('input[name="name"]').exists()).toBe(true)
    expect(form.find('input[name="email"]').exists()).toBe(true)

    const select = form.find('select[name="budget"]')
    expect(select.exists()).toBe(true)
    expect(select.findAll('option').length).toBeGreaterThanOrEqual(5)

    expect(form.find('textarea[name="details"]').exists()).toBe(true)
    expect(form.find('button[type="submit"]').text()).toContain('Iniciar Projeto')
  })

  it('envio vazio mostra erros inline e não mostra sucesso', async () => {
    const wrapper = mount(HomeContact)
    await wrapper.find('form').trigger('submit')
    const errors = wrapper.findAll('.field-error')
    expect(errors.length).toBe(3)
    expect(wrapper.find('.contact-success').exists()).toBe(false)
    expect(wrapper.find('input[name="email"]').attributes('aria-invalid')).toBe('true')
  })

  it('e-mail inválido é rejeitado com mensagem própria', async () => {
    const wrapper = mount(HomeContact)
    const form = wrapper.find('form')
    setValue(wrapper, form.find('input[name="name"]'), 'Ana Souza')
    setValue(wrapper, form.find('input[name="email"]'), 'email-invalido')
    setValue(wrapper, form.find('textarea[name="details"]'), 'Quero escalar a marca.')
    await form.trigger('submit')

    const error = wrapper.findAll('.field-error').find((e) => e.text().includes('e-mail válido'))
    expect(error).toBeTruthy()
    expect(wrapper.find('.contact-success').exists()).toBe(false)
  })

  it('envio válido mostra estado de sucesso simulado, sem chamada de rede', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true })

    const wrapper = mount(HomeContact)
    const form = wrapper.find('form')
    setValue(wrapper, form.find('input[name="name"]'), 'Ana Souza')
    setValue(wrapper, form.find('input[name="email"]'), 'ana@empresa.com')
    setValue(wrapper, form.find('select[name="budget"]'), '50-100k')
    setValue(wrapper, form.find('textarea[name="details"]'), 'Rebrand e novo site.')

    await form.trigger('submit')

    expect(wrapper.find('.contact-success').exists()).toBe(true)
    expect(wrapper.find('.contact-success').text()).toContain('simulada')
    expect(wrapper.find('.contact-success').text()).toContain('24h')
    expect(fetchSpy).not.toHaveBeenCalled()

    fetchSpy.mockRestore()
  })

  it('a Home compõe a seção de contato ao final', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.findComponent(HomeContact).exists()).toBe(true)
  })

  it('a nota de simulação do MVP está visível no formulário', () => {
    const wrapper = mount(HomeContact)
    expect(wrapper.find('.form-note').text()).toContain('simulado')
    expect(wrapper.find('.form-note').text()).toContain('nenhum dado')
  })
})