<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/PageHero.vue'
import ContactForm from '@/components/ContactForm.vue'
import { PhEnvelopeSimple, PhClock, PhGlobe } from '@phosphor-icons/vue'

const route = useRoute()
const selectedService = ref(route.query.servico || '')

const CONTACT_FAQ = [
  {
    q: 'O que acontece depois que eu envio o formulário?',
    a: 'Nosso time lê cada pedido e responde em até 24h úteis com um convite para um primeiro diagnóstico — sem compromisso.',
  },
  {
    q: 'O envio é mesmo processado?',
    a: 'Em um site real, seus dados iriam direto para a equipe. Nesta demonstração de MVP, o envio é simulado e nada é armazenado.',
  },
  {
    q: 'Preciso de um briefing pronto para falar com vocês?',
    a: 'Não. O problema que você descreve no formulário já é suficiente para começarmos. O briefing detalhado acontece junto, no diagnóstico.',
  },
  {
    q: 'Como é o atendimento?',
    a: '100% remoto, para todo o Brasil e exterior. Você tem um ponto de contato único e relatórios claros ao longo do projeto.',
  },
]
</script>

<template>
  <div class="contact-page">
    <PageHero
      kicker="contato"
      title="Vamos começar seu próximo projeto."
      subtitle="Conte o que você quer escalar. Respondemos em até 24h úteis com um caminho claro — primeiro diagnóstico, depois proposta."
    />

    <section class="contact-main" aria-labelledby="contact-form-title">
      <div class="container contact-grid">
        <div class="contact-intro">
          <h2 id="contact-form-title" class="contact-intro-title">
            Envie seu pedido
          </h2>
          <p class="contact-intro-text">
            Quanto mais contexto você der, mais rápido o diagnóstico chega no
            ponto certo. Campos marcados com a lista de orçamento ajudam a
            dimensionar o caminho.
          </p>

          <ul class="contact-info" role="list">
            <li class="contact-info-item">
              <PhEnvelopeSimple :size="20" aria-hidden="true" />
              <span>contato@nexuscreative.lab</span>
            </li>
            <li class="contact-info-item">
              <PhClock :size="20" aria-hidden="true" />
              <span>Resposta média em 24h úteis</span>
            </li>
            <li class="contact-info-item">
              <PhGlobe :size="20" aria-hidden="true" />
              <span>Atendimento remoto para todo o Brasil</span>
            </li>
          </ul>
        </div>

        <div class="contact-panel">
          <ContactForm :initial-service="selectedService" />
        </div>
      </div>
    </section>

    <section class="faq-section" aria-labelledby="contact-faq-title">
      <div class="container faq-inner">
        <h2 id="contact-faq-title" class="faq-title">Antes de escrever</h2>
        <div class="faq-list">
          <details v-for="(faq, i) in CONTACT_FAQ" :key="faq.q" class="faq-item" :open="i === 0">
            <summary class="faq-question">{{ faq.q }}</summary>
            <p class="faq-answer">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  display: flex;
  flex-direction: column;
}

.contact-main {
  padding-block: clamp(3rem, 7vh, 4.5rem);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.contact-intro-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.contact-intro-text {
  margin-top: 0.875rem;
  color: var(--color-text-muted);
  max-width: 46ch;
}

.contact-info {
  margin-top: 2.5rem;
  display: grid;
  gap: 1rem;
}

.contact-info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
  font-size: 0.9375rem;
}

.contact-info-item svg {
  color: var(--color-accent);
  flex: none;
}

.contact-panel {
  padding: clamp(1.5rem, 3.5vw, 2.5rem);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  background: linear-gradient(170deg, rgba(31, 40, 51, 0.6), rgba(31, 40, 51, 0.28));
}

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

@media (min-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr 1.15fr;
    align-items: start;
  }
}
</style>