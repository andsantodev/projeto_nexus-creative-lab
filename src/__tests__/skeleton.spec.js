import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { ROUTES, createAppRouter } from '@/router'
import App from '@/App.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const SITEMAP_PATHS = ['/', '/servicos', '/cases', '/sobre', '/contato']

const HOME_TITLES = {
  home: 'Dados, design e tecnologia',
  services: 'Soluções que escalam',
  cases: 'Resultados que falam por si',
  about: 'Feita por quem entende de crescimento',
  contact: 'Vamos começar seu próximo projeto',
}

async function mountAppAt(path) {
  const router = createAppRouter()
  router.push(path)
  await router.isReady()
  const wrapper = mount(App, {
    global: { plugins: [router] },
    attachTo: document.body,
  })
  return { wrapper, router }
}

describe('F001 — App skeleton: routing + navigation', () => {
  describe('router definition', () => {
    it('define as 5 rotas do sitemap começando por "/"', () => {
      const paths = ROUTES.map((r) => r.path)
      for (const p of SITEMAP_PATHS) {
        expect(paths).toContain(p)
      }
      expect(paths[0]).toBe('/')
    })

    it('tem rota catch-all para páginas desconhecidas', () => {
      expect(ROUTES.some((r) => r.path.includes(':pathMatch'))).toBe(true)
    })

    it('todas as views resolvem como componentes Vue válidos', async () => {
      for (const route of ROUTES) {
        const mod = await route.component()
        expect(mod.default).toBeDefined()
        expect(mod.default.render || mod.default.setup).toBeTruthy()
      }
    }, 20000)
  })

  describe('App renderiza as 5 rotas sem erro', () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    for (const [name, path] of [
      ['home', '/'],
      ['services', '/servicos'],
      ['cases', '/cases'],
      ['about', '/sobre'],
      ['contact', '/contato'],
    ]) {
      it(`${name} (${path}) renderiza sem tela em branco`, async () => {
        const { wrapper } = await mountAppAt(path)
        await wrapper.vm.$nextTick()
        const h1 = wrapper.find('main h1')
        expect(h1.exists()).toBe(true)
        expect(h1.text()).toContain(HOME_TITLES[name])
        expect(h1.text().trim().length).toBeGreaterThan(0)
      })
    }

    it('rota desconhecida cai no 404 sem erro', async () => {
      const { wrapper } = await mountAppAt('/nao-existe')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('main h1').text()).toContain('Página não encontrada')
    })
  })

  describe('layout compartilhado', () => {
    it('AppHeader renderiza links para as 5 rotas', async () => {
      const { wrapper } = await mountAppAt('/')
      const header = wrapper.findComponent(AppHeader)
      const links = header.findAll('.nav-link')
      const hrefs = links.map((l) => l.attributes('href'))
      for (const p of SITEMAP_PATHS) {
        expect(hrefs).toContain(p)
      }
    })

    it('AppFooter está presente em todas as rotas', async () => {
      const { wrapper } = await mountAppAt('/')
      expect(wrapper.findComponent(AppFooter).exists()).toBe(true)
      const { wrapper: servicesWrapper } = await mountAppAt('/servicos')
      expect(servicesWrapper.findComponent(AppFooter).exists()).toBe(true)
    })

    it('header destaca a rota ativa', async () => {
      const { wrapper } = await mountAppAt('/cases')
      const header = wrapper.findComponent(AppHeader)
      const active = header.findAll('.nav-link.is-active')
      expect(active.length).toBe(1)
      expect(active.at(0).attributes('href')).toBe('/cases')
    })
  })
})

describe('AppHeader unit — menu mobile', () => {
  it('abre e fecha o menu mobile', async () => {
    const { wrapper } = await mountAppAt('/')
    const header = wrapper.findComponent(AppHeader)
    const toggle = header.find('.menu-toggle')
    expect(toggle.exists()).toBe(true)
    await toggle.trigger('click')
    expect(header.find('#mobile-menu').exists()).toBe(true)
    await toggle.trigger('click')
    expect(header.find('#mobile-menu').exists()).toBe(false)
  })
})