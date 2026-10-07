<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/PageHero.vue'
import CaseFilter from '@/components/CaseFilter.vue'
import CaseCard from '@/components/CaseCard.vue'
import { CASES } from '@/data/cases.js'

const activeFilter = ref('all')

const visibleCases = computed(() => {
  if (activeFilter.value === 'all') return CASES
  return CASES.filter((c) => c.category === activeFilter.value)
})

function setFilter(id) {
  activeFilter.value = id
}
</script>

<template>
  <div class="cases-page">
    <PageHero
      kicker="portfolio"
      title="Resultados que falam por si."
      subtitle="Cases de branding, web e growth com métricas de impacto — do diagnóstico ao resultado. Métricas ilustrativas de projeto fictício."
    />

    <section class="cases-grid-section" aria-label="Todos os cases">
      <div class="container">
        <CaseFilter :active="activeFilter" @change="setFilter" />

        <TransitionGroup name="case" tag="ul" class="cases-grid" role="list">
          <li v-for="(item, index) in visibleCases" :key="item.id" class="cases-grid-item">
            <CaseCard
              :item="item"
              :to="`/cases/${item.id}`"
              :class="{ 'is-hero': index === 0 }"
            />
          </li>
        </TransitionGroup>
      </div>
    </section>

    <section class="final-cta" aria-labelledby="cases-final-title">
      <div class="container final-cta-inner">
        <h2 id="cases-final-title" class="final-cta-title">
          Seu case pode ser o próximo resultado medido.
        </h2>
        <p class="final-cta-sub">Primeiro diagnóstico, depois proposta. Resposta em até 24h.</p>
        <RouterLink to="/contato" class="btn-primary">Iniciar Projeto</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cases-page {
  display: flex;
  flex-direction: column;
}

.cases-grid-section {
  padding-block: clamp(2.5rem, 5vh, 3.5rem) clamp(4rem, 8vh, 5.5rem);
}

.cases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.cases-grid-item {
  margin: 0;
}

.case-enter-active,
.case-leave-active,
.case-move {
  transition: opacity 0.28s var(--ease-out), transform 0.28s var(--ease-out);
}

.case-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.case-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.case-leave-active {
  position: absolute;
  width: 1px;
}

.final-cta {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(4rem, 9vh, 6rem);
}

.final-cta-inner {
  display: grid;
  justify-items: start;
  gap: 1.25rem;
}

.final-cta-title {
  max-width: 24ch;
  font-size: clamp(1.875rem, 4.5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.final-cta-sub {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
}

.btn-primary {
  margin-top: 0.75rem;
  padding: 0.8125rem 1.5rem;
  border-radius: var(--radius-sm);
  background: var(--color-accent-vibrant);
  color: var(--color-cta-ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  transition: transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.btn-primary:hover {
  color: var(--color-cta-ink);
  transform: translateY(-2px);
  box-shadow: var(--shadow-cta);
}

@media (min-width: 900px) {
  .cases-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 1.75rem;
  }

  .cases-grid-item:nth-child(odd) {
    grid-column: span 7;
  }

  .cases-grid-item:nth-child(even) {
    grid-column: span 5;
  }

  .cases-grid .is-hero {
    grid-column: 1 / -1;
  }

  .cases-grid .is-hero :deep(.case-link) {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    align-items: stretch;
  }

  .cases-grid .is-hero :deep(.case-cover) {
    aspect-ratio: auto;
    height: 100%;
    min-height: 360px;
  }
}
</style>