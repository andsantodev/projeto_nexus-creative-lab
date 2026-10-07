<script setup>
import { ref } from 'vue'
import { PhCheckCircle, PhArrowRight } from '@phosphor-icons/vue'

defineProps({
  initialService: { type: String, default: '' },
})

const BUDGET_OPTIONS = [
  { value: '', label: 'Selecione uma faixa' },
  { value: 'ate-20k', label: 'Até R$ 20 mil' },
  { value: '20-50k', label: 'R$ 20 mil a R$ 50 mil' },
  { value: '50-100k', label: 'R$ 50 mil a R$ 100 mil' },
  { value: 'mais-100k', label: 'Acima de R$ 100 mil' },
]

const name = ref('')
const email = ref('')
const budget = ref('')
const details = ref('')

const errors = ref({})
const submitted = ref(false)

function validate() {
  const next = {}
  if (!name.value.trim()) next.name = 'Informe seu nome completo.'
  if (!email.value.trim()) {
    next.email = 'Informe seu e-mail corporativo.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    next.email = 'Informe um e-mail válido (ex.: nome@empresa.com).'
  }
  if (!details.value.trim()) next.details = 'Conte um pouco sobre o projeto.'
  errors.value = next
  return Object.keys(next).length === 0
}

function onSubmit() {
  if (!validate()) return
  submitted.value = true
  name.value = ''
  email.value = ''
  budget.value = ''
  details.value = ''
}

function reset() {
  submitted.value = false
  errors.value = {}
}
</script>

<template>
  <div class="contact-form-wrap">
    <p v-if="initialService" class="service-note">
      Serviço de interesse: <strong>{{ initialService }}</strong>
    </p>
    <form v-if="!submitted" class="contact-form" novalidate @submit.prevent="onSubmit">
      <div class="field">
        <label for="nf-name" class="field-label">Nome completo</label>
        <input
          id="nf-name"
          v-model="name"
          name="name"
          type="text"
          autocomplete="name"
          placeholder="Seu nome"
          :aria-invalid="!!errors.name"
          :aria-describedby="errors.name ? 'nf-name-error' : undefined"
        />
        <p v-if="errors.name" id="nf-name-error" class="field-error">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label for="nf-email" class="field-label">E-mail corporativo</label>
        <input
          id="nf-email"
          v-model="email"
          name="email"
          type="email"
          autocomplete="email"
          placeholder="nome@empresa.com"
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'nf-email-error' : undefined"
        />
        <p v-if="errors.email" id="nf-email-error" class="field-error">{{ errors.email }}</p>
      </div>

      <div class="field">
        <label for="nf-budget" class="field-label">Faixa de orçamento</label>
        <select id="nf-budget" v-model="budget" name="budget">
          <option v-for="option in BUDGET_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="field">
        <label for="nf-details" class="field-label">Detalhes do projeto</label>
        <textarea
          id="nf-details"
          v-model="details"
          name="details"
          rows="4"
          placeholder="Objetivo, prazos, entregáveis esperados…"
          :aria-invalid="!!errors.details"
          :aria-describedby="errors.details ? 'nf-details-error' : undefined"
        ></textarea>
        <p v-if="errors.details" id="nf-details-error" class="field-error">
          {{ errors.details }}
        </p>
      </div>

      <button type="submit" class="submit-btn">
        Iniciar Projeto
        <PhArrowRight :size="18" weight="bold" aria-hidden="true" />
      </button>
      <p class="form-note">
        Demonstração de MVP: o envio é simulado — nenhum dado é armazenado ou
        enviado pela rede.
      </p>
    </form>

    <div v-else class="contact-success" role="status">
      <PhCheckCircle :size="44" weight="bold" class="success-icon" aria-hidden="true" />
      <h3 class="success-title">Projeto recebido.</h3>
      <p class="success-text">
        Esta é uma mensagem simulada: em um site real, a NEXUS responderia aqui em
        até 24h com os próximos passos.
      </p>
      <button type="button" class="success-reset" @click="reset">Enviar outro</button>
    </div>
  </div>
</template>

<style scoped>
.service-note {
  margin-bottom: 1.25rem;
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-accent-soft);
  background: rgba(69, 162, 158, 0.08);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.service-note strong {
  color: var(--color-text);
}

.contact-form {
  display: grid;
  gap: 1.25rem;
}

.field {
  display: grid;
  gap: 0.5rem;
}

.field-label {
  font-size: var(--text-sm);
  font-weight: 600;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  transition: border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--color-text-faint);
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--color-accent-vibrant);
  box-shadow: 0 0 0 3px rgba(102, 252, 241, 0.18);
}

.field textarea {
  resize: vertical;
  min-height: 7.5rem;
}

.field [aria-invalid='true'] {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 3px rgba(255, 133, 144, 0.15);
}

.field-error {
  font-size: var(--text-sm);
  color: var(--color-danger);
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.8125rem 1.5rem;
  border-radius: var(--radius-sm);
  background: var(--color-accent-vibrant);
  color: var(--color-cta-ink);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  transition: transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-cta);
}

.submit-btn:active {
  transform: scale(0.98);
}

.form-note {
  font-size: var(--text-sm);
  color: var(--color-text-faint);
}

.contact-success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid var(--color-border-accent-soft);
  border-radius: var(--radius-lg);
  background: linear-gradient(165deg, rgba(31, 40, 51, 0.7), rgba(31, 40, 51, 0.35));
}

.success-icon {
  color: var(--color-accent-vibrant);
}

.success-title {
  font-size: 1.375rem;
  font-weight: 800;
}

.success-text {
  color: var(--color-text-muted);
}

.success-reset {
  margin-top: 0.75rem;
  padding: 0.5625rem 1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  font-weight: 600;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.success-reset:hover {
  border-color: var(--color-accent);
}
</style>