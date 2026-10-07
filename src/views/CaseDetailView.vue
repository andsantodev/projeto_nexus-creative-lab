<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { CASES, caseCategoryLabel } from '@/data/cases.js'

const route = useRoute()

const caseItem = computed(() => CASES.find((c) => c.id === route.params.id))

const SECTIONS = [
  { key: 'challenge', num: '01', title: 'Desafio' },
  { key: 'solution', num: '02', title: 'Solução' },
  { key: 'result', num: '03', title: 'Resultado' },
]
</script>

<template>
  <div v-if="caseItem" class="case-study">
    <div class="container case-study-head">
      <RouterLink to="/cases" class="back-link">← Voltar para todos os cases</RouterLink>
      <span class="case-tag">{{ caseCategoryLabel(caseItem.category) }}</span>
      <h1 class="case-title">{{ caseItem.client }}</h1>
      <p class="case-subtitle">{{ caseItem.title }}</p>
      <p class="case-metric">
        <strong>{{ caseItem.metric.value }}</strong>
        <span>{{ caseItem.metric.label }}</span>
      </p>
    </div>

    <div class="container case-cover-wrap">
      <img
        :src="caseItem.cover"
        :alt="`Capa do case ${caseItem.client}`"
        :width="1400"
        :height="800"
        class="case-cover"
      />
    </div>

    <section class="case-sections">
      <div class="container">
        <div v-for="section in SECTIONS" :key="section.key" class="case-section">
          <span class="case-section-num" aria-hidden="true">{{ section.num }}</span>
          <div class="case-section-content">
            <h2 class="case-section-title">{{ section.title }}</h2>
            <p class="case-section-text">{{ caseItem[section.key] }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="final-cta">
      <div class="container final-cta-inner">
        <h2 class="final-cta-title">Quer um resultado parecido para a sua marca?</h2>
        <p class="final-cta-sub">Primeiro diagnóstico, depois proposta. Resposta em até 24h.</p>
        <RouterLink to="/contato" class="btn-primary">Iniciar Projeto</RouterLink>
      </div>
    </section>
  </div>

  <div v-else class="case-not-found">
    <div class="container">
      <h1 class="not-found-title">Case não encontrado.</h1>
      <p class="not-found-sub">O projeto que você tentou abrir não existe ou foi movido.</p>
      <RouterLink to="/cases" class="btn-primary">Ver todos os cases</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.case-study-head {
  padding-block: clamp(3rem, 7vh, 4.5rem) clamp(2rem, 5vh, 3rem);
  display: grid;
  gap: 1rem;
  justify-items: start;
}

.back-link {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out);
}

.back-link:hover {
  color: var(--color-text);
}

.case-tag {
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--color-border-accent-soft);
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-vibrant);
}

.case-title {
  margin-top: 0.5rem;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.02;
}

.case-subtitle {
  max-width: 56ch;
  font-size: clamp(var(--text-lg), 2vw, 1.25rem);
  color: var(--color-text-muted);
}

.case-metric {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-top: 0.5rem;
  color: var(--color-text-muted);
}

.case-metric strong {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-accent-vibrant);
}

.case-cover-wrap {
  padding-bottom: clamp(2rem, 5vh, 3rem);
}

.case-cover {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-subtle);
}

.case-sections {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(2.5rem, 6vh, 4rem);
}

.case-section {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  padding-block: 1.75rem;
  border-top: 1px solid var(--color-border-subtle);
}

.case-section:first-child {
  border-top: 0;
}

.case-section-num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.9375rem;
  letter-spacing: 0.1em;
  color: var(--color-accent-vibrant);
}

.case-section-content {
  max-width: 62ch;
}

.case-section-title {
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  font-weight: 800;
  letter-spacing: -0.01em;
}

.case-section-text {
  margin-top: 0.5rem;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
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

.case-not-found {
  padding-block: clamp(4rem, 10vh, 7rem);
  display: grid;
}

.not-found-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
}

.not-found-sub {
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-muted);
}
</style>