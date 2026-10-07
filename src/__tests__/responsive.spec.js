import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createAppRouter } from '@/router'
import App from '@/App.vue'

const ROUTES = [
  { name: 'Home', path: '/' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Cases', path: '/cases' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Contato', path: '/contato' },
  { name: 'Case detail', path: '/cases/ottava' },
]

const VIEWPORTS = [
  { label: 'mobile', width: 375 },
  { label: 'tablet', width: 768 },
  { label: 'desktop', width: 1280 },
  { label: 'ultrawide', width: 2560 },
]

async function mountAt(path) {
  const router = createAppRouter()
  router.push(path)
  await router.isReady()
  const wrapper = mount(App, { global: { plugins: [router] }, attachTo: document.body })
  await wrapper.vm.$nextTick()
  return { wrapper, router }
}

describe('F014 — Cross-device responsiveness pass', () => {
  it('nenhum link morto interno em todas as rotas e em todas as larguras', async () => {
    for (const route of ROUTES) {
      for (const viewport of VIEWPORTS) {
        window.innerWidth = viewport.width
        window.dispatchEvent(new Event('resize'))

        const { wrapper, router } = await mountAt(route.path)
        const links = wrapper.findAll('a[href]')

        for (const link of links) {
          const href = link.attributes('href')
          // ignora externos, âncoras da página e mailto
          if (!href || /^https?:/.test(href) || href.startsWith('#') || href.startsWith('mailto:')) {
            continue
          }
          const resolved = router.resolve(href)
          expect(
            resolved.matched.length,
            `link morto "${href}" em ${route.name} @ ${viewport.label}`,
          ).toBeGreaterThan(0)
        }

        wrapper.unmount()
        document.body.innerHTML = ''
      }
    }
  })

  it('todas as rotas renderizam conteúdo em todas as larguras (sem erro)', async () => {
    for (const route of ROUTES) {
      for (const viewport of VIEWPORTS) {
        window.innerWidth = viewport.width
        window.dispatchEvent(new Event('resize'))

        const { wrapper } = await mountAt(route.path)
        const main = wrapper.find('main')
        expect(main.exists(), `${route.name} @ ${viewport.label} sem <main>`).toBe(true)
        expect(
          main.exists() && main.text().length > 0,
          `${route.name} @ ${viewport.label} sem conteúdo`,
        ).toBe(true)
        wrapper.unmount()
        document.body.innerHTML = ''
      }
    }
  })

  it('header/footer presentes em todas as rotas e larguras (navegação consistente)', async () => {
    for (const route of ROUTES) {
      for (const viewport of VIEWPORTS) {
        window.innerWidth = viewport.width
        window.dispatchEvent(new Event('resize'))

        const { wrapper } = await mountAt(route.path)
        expect(wrapper.find('.site-header').exists()).toBe(true)
        expect(wrapper.find('.site-footer').exists()).toBe(true)

        const nav = wrapper.find('.nav-desktop, .nav-mobile')
        expect(nav.exists()).toBe(true)
        wrapper.unmount()
        document.body.innerHTML = ''
      }
    }
  })
})