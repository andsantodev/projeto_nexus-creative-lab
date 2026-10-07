<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { METRICS } from '@/data/metrics.js'

const sectionRef = ref(null)
const started = ref(false)
const current = ref(METRICS.map(() => 0))
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer = null
let frame = null

function animate() {
  const duration = 1100
  const startTime = performance.now()

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    METRICS.forEach((metric, i) => {
      current.value[i] = Math.round(eased * metric.value)
    })
    if (progress < 1) {
      frame = requestAnimationFrame(tick)
    }
  }

  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (reduced) {
    started.value = true
    METRICS.forEach((metric, i) => {
      current.value[i] = metric.value
    })
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !started.value) {
        started.value = true
        animate()
        observer.disconnect()
      }
    },
    { threshold: 0.4 },
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <section ref="sectionRef" class="metrics" aria-labelledby="metrics-title">
    <div class="container">
      <div class="metrics-head">
        <h2 id="metrics-title" class="metrics-title">Números da operação.</h2>
        <p class="metrics-note">Valores ilustrativos — projeto fictício.</p>
      </div>

      <ul class="metrics-strip" role="list">
        <li v-for="(metric, i) in METRICS" :key="metric.id" class="metric">
          <strong class="metric-value" :aria-label="`${metric.label}: ${current[i]}`">
            {{ metric.prefix }}{{ current[i] }}{{ metric.suffix }}
          </strong>
          <span class="metric-label">{{ metric.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.metrics {
  padding-block: clamp(4rem, 9vh, 6rem);
  border-top: 1px solid var(--color-border-subtle);
}

.metrics-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: clamp(2.5rem, 5vh, 3.5rem);
}

.metrics-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.metrics-note {
  font-size: var(--text-sm);
  color: var(--color-text-faint);
}

.metrics-strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 1.5rem;
}

.metric {
  padding-block: 0.25rem;
  border-left: 1px solid var(--color-border-strong);
  padding-left: 1.25rem;
}

.metric-value {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 6vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--color-accent-vibrant);
  font-variant-numeric: tabular-nums;
}

.metric-label {
  display: block;
  margin-top: 0.625rem;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

@media (min-width: 900px) {
  .metrics-strip {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
</style>