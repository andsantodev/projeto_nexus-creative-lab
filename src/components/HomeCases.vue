<script setup>
import { ref, computed } from 'vue'
import { CASE_CATEGORIES, FEATURED_CASES } from '@/data/cases.js'
import CaseFilter from '@/components/CaseFilter.vue'

const activeFilter = ref('all')

const visibleCases = computed(() => {
  if (activeFilter.value === 'all') return FEATURED_CASES
  return FEATURED_CASES.filter((c) => c.category === activeFilter.value)
})

function setFilter(id) {
  activeFilter.value = id
}

const SPANS = ['7', '5', '12']

function spanFor(index) {
  return SPANS[index % SPANS.length]
}

function tagLabel(category) {
  return CASE_CATEGORIES.find((c) => c.id === category)?.label ?? category
}
</script>

<template>
  <section id="cases" class="cases" aria-labelledby="cases-title">
    <div class="container">
      <header class="cases-head">
        <h2 id="cases-title" class="cases-title">
          Resultados que falam por si.
        </h2>
        <p class="cases-lede">
          Três frentes de atuação, um recorte de impacto. Métricas ilustrativas de
          projeto fictício.
        </p>
      </header>

      <CaseFilter :active="activeFilter" @change="setFilter" />

      <TransitionGroup name="case" tag="ul" class="cases-grid" role="list">
        <li
          v-for="(item, index) in visibleCases"
          :key="item.id"
          class="case-card"
          :class="`is-${spanFor(index)}`"
        >
          <a
            href="#"
            class="case-link"
            :aria-label="`Ver case completo de ${item.client}`"
          >
            <div class="case-cover">
              <img
                :src="item.cover"
                :alt="`Case ${item.client}: ${item.title}`"
                :width="1400"
                :height="item.category === 'web' ? 900 : 760"
                loading="lazy"
              />
              <span class="case-tag">{{ tagLabel(item.category) }}</span>
              <span class="case-arrow" aria-hidden="true" />
            </div>
            <div class="case-body">
              <h3 class="case-client">{{ item.client }}</h3>
              <p class="case-title">{{ item.title }}</p>
              <p class="case-metric">
                <strong>{{ item.metric.value }}</strong>
                <span>{{ item.metric.label }}</span>
              </p>
            </div>
          </a>
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.cases {
  padding-block: clamp(4rem, 9vh, 6.5rem);
  border-top: 1px solid var(--color-border-subtle);
}

.cases-head {
  max-width: 46rem;
  margin-bottom: 1.75rem;
}

.cases-title {
  font-size: clamp(1.75rem, 4.2vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  max-width: 20ch;
}

.cases-lede {
  margin-top: 1rem;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
}

.cases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.case-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border-subtle);
  background: linear-gradient(170deg, rgba(31, 40, 51, 0.55), rgba(31, 40, 51, 0.25));
  transition: border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.case-card:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(6, 8, 12, 0.45);
}

.case-link {
  display: block;
  color: inherit;
}

.case-cover {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.case-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
}

.case-card:hover .case-cover img {
  transform: scale(1.03);
}

.case-cover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(11, 12, 16, 0.05) 30%,
    rgba(11, 12, 16, 0.55) 100%
  );
}

.case-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--color-border-accent-soft);
  border-radius: var(--radius-pill);
  background: rgba(11, 12, 16, 0.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-vibrant);
}

.case-arrow {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 1;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 50%;
  background: rgba(11, 12, 16, 0.4);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  transition: background-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.case-arrow::before,
.case-arrow::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  background: var(--color-text);
}

.case-arrow::before {
  width: 0.875rem;
  height: 1.5px;
  transform: translate(-50%, -50%);
}

.case-arrow::after {
  width: 0.4375rem;
  height: 0.4375rem;
  border-top: 1.5px solid var(--color-text);
  border-right: 1.5px solid var(--color-text);
  transform: translate(-40%, -50%) rotate(45deg);
}

.case-card:hover .case-arrow {
  background: var(--color-accent-vibrant);
  transform: translateX(2px);
}

.case-card:hover .case-arrow::before,
.case-card:hover .case-arrow::after {
  background: var(--color-cta-ink);
  border-color: var(--color-cta-ink);
}

.case-body {
  padding: 1.5rem clamp(1.25rem, 2.5vw, 2rem) 1.75rem;
}

.case-client {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.case-title {
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 700;
  line-height: 1.25;
  max-width: 34ch;
}

.case-metric {
  margin-top: 1.25rem;
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
  color: var(--color-text-muted);
}

.case-metric strong {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-accent-vibrant);
}

/* --- Filtro com transição --- */
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

@media (min-width: 1024px) {
  .cases-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 1.5rem;
  }

  .case-card.is-7 {
    grid-column: span 7;
  }

  .case-card.is-5 {
    grid-column: span 5;
  }

  .case-card.is-12 {
    grid-column: span 12;
    margin-top: 2.5rem;
  }

  .case-card.is-12 .case-cover {
    aspect-ratio: 21 / 8;
  }
}
</style>