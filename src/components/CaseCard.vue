<script setup>
import { caseCategoryLabel } from '@/data/cases.js'

defineProps({
  item: { type: Object, required: true },
  to: { type: [String, Object], default: null },
})
</script>

<template>
  <article class="case-card">
    <RouterLink v-if="to" :to="to" class="case-link" :aria-label="`Ver case completo de ${item.client}`">
      <div class="case-cover">
        <img
          :src="item.cover"
          :alt="`Case ${item.client}: ${item.title}`"
          :width="1400"
          :height="item.category === 'web' ? 900 : 760"
          loading="lazy"
        />
        <span class="case-tag">{{ caseCategoryLabel(item.category) }}</span>
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
    </RouterLink>

    <div v-else class="case-link">
      <div class="case-cover">
        <img
          :src="item.cover"
          :alt="`Case ${item.client}: ${item.title}`"
          :width="1400"
          :height="item.category === 'web' ? 900 : 760"
          loading="lazy"
        />
        <span class="case-tag">{{ caseCategoryLabel(item.category) }}</span>
      </div>
      <div class="case-body">
        <h3 class="case-client">{{ item.client }}</h3>
        <p class="case-title">{{ item.title }}</p>
        <p class="case-metric">
          <strong>{{ item.metric.value }}</strong>
          <span>{{ item.metric.label }}</span>
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
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
</style>