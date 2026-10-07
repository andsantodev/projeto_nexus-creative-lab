<script setup>
import { CASE_CATEGORIES } from '@/data/cases.js'

defineProps({
  active: { type: String, required: true },
})

const emit = defineEmits(['change'])

function select(id) {
  emit('change', id)
}
</script>

<template>
  <div class="cases-filter" role="group" aria-label="Filtrar cases por categoria">
    <button
      v-for="category in CASE_CATEGORIES"
      :key="category.id"
      type="button"
      class="filter-btn"
      :class="{ 'is-active': active === category.id }"
      :aria-pressed="active === category.id"
      @click="select(category.id)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

<style scoped>
.cases-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: clamp(2rem, 4vh, 3rem);
}

.filter-btn {
  padding: 0.5rem 1.125rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-pill);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.filter-btn:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

.filter-btn.is-active {
  color: var(--color-cta-ink);
  background: var(--color-accent-vibrant);
  border-color: var(--color-accent-vibrant);
}
</style>