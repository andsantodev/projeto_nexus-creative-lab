<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from '@/components/BrandMark.vue'

const NAV_LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Cases', to: '/cases' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/contato' },
]

const route = useRoute()
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" aria-label="NEXUS Creative Lab — página inicial">
        <BrandMark :size="30" />
        <span class="brand-word">
          <span class="brand-name">NEXUS</span>
          <span class="brand-tagline">creative lab</span>
        </span>
      </RouterLink>

      <nav class="nav-desktop" aria-label="Navegação principal">
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="{ 'is-active': route.path === link.to }"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/contato" class="nav-cta">Iniciar Projeto</RouterLink>
      </nav>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Abrir menu de navegação"
        @click="toggleMenu"
      >
        <span class="menu-toggle-box" :class="{ 'is-open': menuOpen }">
          <span class="menu-toggle-bar"></span>
          <span class="menu-toggle-bar"></span>
        </span>
      </button>
    </div>

    <Transition name="menu">
      <nav
        v-if="menuOpen"
        id="mobile-menu"
        class="nav-mobile"
        aria-label="Menu de navegação móvel"
      >
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.to"
          :to="link.to"
          class="nav-mobile-link"
          :class="{ 'is-active': route.path === link.to }"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/contato" class="nav-mobile-cta" @click="closeMenu">
          Iniciar Projeto
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header, 40);
  height: var(--header-h);
  border-bottom: 1px solid var(--color-border-subtle);
  background: rgba(11, 12, 16, 0.72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--color-text);
}

.brand:hover {
  color: var(--color-text);
}

.brand-word {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.0625rem;
  letter-spacing: 0.08em;
}

.brand-tagline {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.nav-desktop {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  position: relative;
  padding: 0.4375rem 0.875rem;
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-overlay-soft);
}

.nav-link.is-active {
  color: var(--color-text);
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  left: 0.875rem;
  right: 0.875rem;
  bottom: 0.125rem;
  height: 2px;
  border-radius: 2px;
  background: var(--color-accent-vibrant);
}

.nav-cta {
  margin-left: 0.5rem;
  padding: 0.5625rem 1.125rem;
  border-radius: var(--radius-sm);
  background: var(--color-accent-vibrant);
  color: var(--color-cta-ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9375rem;
  transition: transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out), filter var(--duration-base) var(--ease-out);
}

.nav-cta:hover {
  color: var(--color-cta-ink);
  transform: translateY(-1px);
  box-shadow: var(--shadow-cta);
}

.nav-cta:active {
  transform: translateY(0) scale(0.98);
}

.menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
}

.menu-toggle-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-toggle-bar {
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-text);
  transition: transform var(--duration-base) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
}

.menu-toggle-box.is-open .menu-toggle-bar:nth-child(1) {
  transform: translateY(3.5px) rotate(45deg);
}

.menu-toggle-box.is-open .menu-toggle-bar:nth-child(2) {
  transform: translateY(-3.5px) rotate(-45deg);
}

.nav-mobile {
  padding: 0.5rem clamp(1.25rem, 4vw, 2.5rem) 1.25rem;
  border-bottom: 1px solid var(--color-border-subtle);
  background: rgba(11, 12, 16, 0.96);
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.nav-mobile-link {
  padding: 0.75rem 0.5rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.nav-mobile-link:hover,
.nav-mobile-link.is-active {
  color: var(--color-text);
  background: var(--color-overlay-soft);
}

.nav-mobile-cta {
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--color-accent-vibrant);
  color: var(--color-cta-ink);
  font-family: var(--font-display);
  font-weight: 700;
  text-align: center;
  transition: transform var(--duration-base) var(--ease-out);
}

.nav-mobile-cta:hover {
  color: var(--color-cta-ink);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (min-width: 864px) {
  .nav-desktop {
    display: flex;
  }

  .menu-toggle {
    display: none;
  }
}
</style>