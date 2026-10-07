<script setup>
import { SERVICES } from '@/data/services.js'
</script>

<template>
  <section class="services" aria-labelledby="services-title">
    <div class="container">
      <header class="services-head">
        <h2 id="services-title" class="services-title">
          Quatro especialidades, um só padrão: resultado mensurável.
        </h2>
        <p class="services-lede">
          Cada serviço entrega método e entregáveis claros — do diagnóstico à
          operação. Sem achismo, com escopo e evidência.
        </p>
      </header>

      <ul class="services-grid" role="list">
        <li v-for="(service, i) in SERVICES" :key="service.id" class="service-card">
          <span class="service-index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="service-name">{{ service.title }}</h3>
          <p class="service-desc">{{ service.short }}</p>
          <ul class="service-deliverables" role="list">
            <li v-for="item in service.deliverables" :key="item" class="service-deliverable">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding-block: clamp(4rem, 9vh, 6.5rem);
  border-top: 1px solid var(--color-border-subtle);
}

.services-head {
  max-width: 46rem;
  margin-bottom: clamp(2.5rem, 5vh, 3.5rem);
}

.services-title {
  font-size: clamp(1.75rem, 4.2vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  max-width: 26ch;
}

.services-lede {
  margin-top: 1rem;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  background: linear-gradient(165deg, rgba(31, 40, 51, 0.7), rgba(31, 40, 51, 0.35));
  overflow: hidden;
  transition: transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    22rem 12rem at 100% 0%,
    rgba(102, 252, 241, 0.08),
    transparent 70%
  );
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  pointer-events: none;
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: 0 18px 40px rgba(6, 8, 12, 0.5), 0 0 0 1px rgba(69, 162, 158, 0.25);
}

.service-card:hover::before {
  opacity: 1;
}

.service-index {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 2.25rem;
}

.service-name {
  font-size: clamp(1.375rem, 2.6vw, 1.625rem);
  font-weight: 800;
  letter-spacing: -0.01em;
}

.service-desc {
  margin-top: 0.875rem;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  max-width: 42ch;
}

.service-deliverables {
  margin-top: 1.5rem;
  display: grid;
  gap: 0.5rem;
}

.service-deliverable {
  position: relative;
  padding-left: 1.125rem;
  font-size: 0.9375rem;
  color: var(--color-text);
}

.service-deliverable::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.5rem;
  height: 2px;
  border-radius: 2px;
  background: var(--color-accent);
}

@media (min-width: 720px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .service-card:nth-child(odd) {
    transform: translateY(1.25rem);
  }

  .service-card:nth-child(odd):hover {
    transform: translateY(calc(1.25rem - 4px));
  }
}

@media (min-width: 1024px) {
  .services-grid {
    gap: 1.5rem;
  }
}
</style>