import { createRouter, createWebHistory } from 'vue-router'

export const ROUTES = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'NEXUS Creative Lab' },
  },
  {
    path: '/servicos',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Serviços — NEXUS Creative Lab' },
  },
  {
    path: '/cases',
    name: 'cases',
    component: () => import('@/views/CasesView.vue'),
    meta: { title: 'Cases — NEXUS Creative Lab' },
  },
  {
    path: '/cases/:id',
    name: 'case-detail',
    component: () => import('@/views/CaseDetailView.vue'),
    meta: { title: 'Case — NEXUS Creative Lab' },
  },
  {
    path: '/sobre',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Sobre — NEXUS Creative Lab' },
  },
  {
    path: '/contato',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contato — NEXUS Creative Lab' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página não encontrada — NEXUS Creative Lab' },
  },
]

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: ROUTES,
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || { top: 0 }
    },
  })
}