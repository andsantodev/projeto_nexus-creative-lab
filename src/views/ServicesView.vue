<script setup>
import { SERVICES } from '@/data/services.js'
import PageHero from '@/components/PageHero.vue'

const FAQS = [
  {
    q: 'Quanto tempo leva um projeto de branding?',
    a: 'Em média de 4 a 8 semanas, dependendo do escopo. No diagnóstico inicial fechamos o cronograma real antes do kickoff.',
  },
  {
    q: 'Qual o investimento para começar?',
    a: 'Varia por serviço. Sinalizamos a faixa na proposta, com escopo claro — sem surpresa no meio do caminho.',
  },
  {
    q: 'Como funciona o processo de contratação?',
    a: 'Briefing → diagnóstico → proposta → kickoff. Você sabe o que será feito, por quem e em quanto tempo.',
  },
  {
    q: 'Os resultados são mensuráveis?',
    a: 'Sim. Definimos KPIs antes de começar e você acompanha os números em relatórios ao longo de todo o projeto.',
  },
  {
    q: 'Atendem fora da região de vocês?',
    a: 'Sim. O processo é 100% remoto e atende clientes em todo o Brasil e no exterior.',
  },
]
</script>

<template>
  <div class="services-page">
    <PageHero
      title="Soluções que escalam junto com sua marca."
      subtitle="Quatro pilares — Brand Strategy, Growth Marketing, UI/UX &amp; Web Development e Data Analytics — combinados para entregar resultado mensurável."
    />

    <section class="service-blocks" aria-label="Detalhamento dos serviços">
      <div class="container">
        <article
          v-for="(service, index) in SERVICES"
          :key="service.id"
          class="service-block"
        >
          <div class="service-block-index" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </div>

          <div class="service-block-main">
            <h2 class="service-block-title">{{ service.title }}</h2>
            <p class="service-block-long">{{ service.long }}</p>

            <div class="service-block-cols">
              <div>
                <h3 class="service-block-subhead">Como trabalhamos</h3>
                <ol class="process-list" role="list">
                  <li v-for="(step, i) in service.process" :key="step.title" class="process-step">
                    <span class="process-step-num" aria-hidden="true">{{ i + 1 }}</span>
                    <div>
                      <p class="process-step-title">{{ step.title }}</p>
                      <p class="process-step-desc">{{ step.desc }}</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div>
                <h3 class="service-block-subhead">Entregáveis</h3>
                <ul class="deliverables-list" role="list">
                  <li v-for="item in service.deliverables" :key="item" class="deliverable">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <RouterLink
              class="mini-cta"
              :to="{ path: '/contato', query: { servico: service.id } }"
            >
              Falar sobre este serviço
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <section class="faq-section" aria-labelledby="faq-title">
      <div class="container faq-inner">
        <h2 id="faq-title" class="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <details v-for="(faq, i) in FAQS" :key="faq.q" class="faq-item" :open="i === 0">
            <summary class="faq-question">{{ faq.q }}</summary>
            <p class="faq-answer">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <section class="final-cta" aria-labelledby="final-cta-title">
      <div class="container final-cta-inner">
        <h2 id="final-cta-title" class="final-cta-title">
          Pronto para colocar o método no seu crescimento?
        </h2>
        <p class="final-cta-sub">Primeiro diagnóstico, depois proposta. Resposta em até 24h.</p>
        <RouterLink to="/contato" class="btn-primary">Iniciar Projeto</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-page {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* --- blocos de serviço (linhas editoriais com hairline) --- */
.service-blocks {
  padding-block: clamp(3rem, 7vh, 4.5rem) clamp(4rem, 8vh, 5.5rem);
}

.service-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding-block: clamp(2.5rem, 5vh, 3.5rem);
  border-top: 1px solid var(--color-border-subtle);
}

.service-block:first-child {
  border-top: 0;
}

.service-block-index {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--color-accent-vibrant);
}

.service-block-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.service-block-long {
  margin-top: 1rem;
  max-width: 60ch;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
}

.service-block-cols {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.service-block-subhead {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 1.25rem;
}

.process-list {
  display: grid;
  gap: 1.25rem;
}

.process-step {
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 1rem;
}

.process-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid var(--color-border-accent-soft);
  border-radius: 50%;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-accent-vibrant);
}

.process-step-title {
  font-weight: 600;
}

.process-step-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  max-width: 48ch;
}

.deliverables-list {
  display: grid;
  gap: 0.625rem;
}

.deliverable {
  position: relative;
  padding-left: 1.25rem;
  color: var(--color-text);
}

.deliverable::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.5rem;
  height: 2px;
  border-radius: 2px;
  background: var(--color-accent);
}

.mini-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-accent-vibrant);
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.25rem;
  transition: color var(--duration-fast) var(--ease-out);
}

.mini-cta:hover {
  color: var(--color-text);
}

/* --- FAQ (accordion nativo) --- */
.faq-section {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(3.5rem, 8vh, 5.5rem);
}

.faq-inner {
  max-width: 56rem;
}

.faq-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}

.faq-list {
  border-top: 1px solid var(--color-border-subtle);
}

.faq-item {
  border-bottom: 1px solid var(--color-border-subtle);
}

.faq-question {
  cursor: pointer;
  list-style: none;
  padding: 1.25rem 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question::after {
  content: '';
  width: 0.625rem;
  height: 0.625rem;
  border-right: 2px solid var(--color-accent-vibrant);
  border-bottom: 2px solid var(--color-accent-vibrant);
  transform: rotate(45deg);
  transition: transform var(--duration-base) var(--ease-out);
  flex: none;
}

.faq-item[open] .faq-question::after {
  transform: rotate(-135deg);
}

.faq-answer {
  padding-bottom: 1.5rem;
  color: var(--color-text-muted);
  max-width: 60ch;
}

/* --- CTA final --- */
.final-cta {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(4rem, 9vh, 6.5rem);
}

.final-cta-inner {
  display: grid;
  justify-items: start;
  gap: 1.25rem;
}

.final-cta-title {
  max-width: 22ch;
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

@media (min-width: 720px) {
  .service-block {
    grid-template-columns: max-content 1fr;
    gap: clamp(2rem, 5vw, 4rem);
  }

  .service-block-index {
    line-height: 1.15;
  }

  .service-block-cols {
    grid-template-columns: 1.25fr 1fr;
    gap: 3rem;
  }
}
</style>