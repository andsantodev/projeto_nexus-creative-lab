<script setup>
import { PhEnvelopeSimple, PhClock } from '@phosphor-icons/vue'
import ContactForm from '@/components/ContactForm.vue'
</script>

<template>
  <section id="contato" class="contact" aria-labelledby="contact-title">
    <div class="container contact-grid">
      <div class="contact-intro">
        <h2 id="contact-title" class="contact-title">
          Vamos começar seu próximo projeto.
        </h2>
        <p class="contact-lede">
          Conte o que você quer escalar. A NEXUS responde em até 24h com um
          caminho claro — primeiro diagnóstico, depois proposta.
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
        </ul>
      </div>

      <div class="contact-panel">
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-block: clamp(4rem, 9vh, 6.5rem);
  border-top: 1px solid var(--color-border-subtle);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.contact-title {
  font-size: clamp(1.75rem, 4.2vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  max-width: 18ch;
}

.contact-lede {
  margin-top: 1rem;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
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

@media (min-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr 1.15fr;
    align-items: start;
  }
}
</style>