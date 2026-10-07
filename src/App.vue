<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
  <AppHeader />
  <main id="main" class="site-main">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>

<style scoped>
.site-main {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.skip-link {
    position: fixed;
    top: -100%;
    left: 1rem;
    z-index: var(--z-skip);
    padding: 0.625rem 1rem;
    border-radius: var(--radius-sm);
    background: var(--color-surface);
    color: var(--color-text);
    font-size: var(--text-sm);
    transition: top var(--duration-fast) var(--ease-out);
  }

.skip-link:focus-visible {
  top: 0.75rem;
}
</style>