<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  kicker: { type: String, default: '' },
})
</script>

<template>
  <section class="page-hero">
    <div class="container page-hero-inner">
      <p v-if="kicker" class="page-hero-kicker">{{ kicker }}</p>
      <h1 class="page-hero-title">{{ title }}</h1>
      <p class="page-hero-subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  border-bottom: 1px solid var(--color-border-subtle);
  background: radial-gradient(
    46rem 26rem at 78% -10%,
    rgba(69, 162, 158, 0.12),
    transparent 65%
  );
}

.page-hero-inner {
  padding-block: clamp(3.5rem, 8vh, 5.5rem) clamp(2.5rem, 6vh, 4rem);
}

.page-hero-kicker {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-vibrant);
}

.page-hero-title {
  margin-top: 1rem;
  max-width: 22ch;
  font-size: clamp(2.25rem, 5.2vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.page-hero-subtitle {
  margin-top: 1.25rem;
  max-width: 56ch;
  font-size: clamp(var(--text-lg), 2vw, 1.25rem);
  color: var(--color-text-muted);
}
</style>