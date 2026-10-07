<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  note: { type: String, default: '' },
})
</script>

<template>
  <section class="page-hero">
    <div class="container page-hero-inner">
      <p class="page-hero-chip">MVP · etapa 1</p>
      <h1 class="page-hero-title">{{ title }}</h1>
      <p class="page-hero-subtitle">{{ subtitle }}</p>
      <p v-if="note" class="page-hero-note">{{ note }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  flex: 1;
  display: flex;
  align-items: center;
}

.page-hero-inner {
  padding-block: clamp(4.5rem, 12vh, 8rem) clamp(4rem, 10vh, 7rem);
}

.page-hero-chip {
  width: fit-content;
  padding: 0.3125rem 0.75rem;
  border: 1px solid var(--color-border-accent-soft);
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-vibrant);
}

.page-hero-title {
  margin-top: 1.5rem;
  font-size: clamp(2.25rem, 5.5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  max-width: 14ch;
}

.page-hero-subtitle {
  margin-top: 1.25rem;
  font-size: clamp(1rem, 2vw, 1.1875rem);
  color: var(--color-text-muted);
  max-width: 52ch;
}

.page-hero-note {
  margin-top: 2rem;
  font-size: var(--text-sm);
  color: var(--color-text-faint);
}
</style>