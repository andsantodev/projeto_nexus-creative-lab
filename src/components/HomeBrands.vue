<script setup>
const CLIENTS = [
  { name: 'Volata', letter: 'V', shape: 'hex' },
  { name: 'Âmbar', letter: 'A', shape: 'diamond' },
  { name: 'Nordka', letter: 'N', shape: 'triangle' },
  { name: 'Kite', letter: 'K', shape: 'ring' },
  { name: 'Lumena', letter: 'L', shape: 'pentagon' },
  { name: 'Otika', letter: 'O', shape: 'square' },
  { name: 'Trio', letter: 'T', shape: 'chevron' },
]

const SHAPES = {
  hex: '24,4 41.3,14 41.3,34 24,44 6.7,34 6.7,14',
  diamond: '24,3 44,24 24,45 4,24',
  triangle: '24,5 43,40 5,40',
  pentagon: '24,4 40,16.5 34,36 14,36 8,16.5',
  square: '14,4 34,4 42,24 34,44 14,44 6,24',
  chevron: '6,14 24,30 42,14 42,22 24,40 6,22',
}
</script>

<template>
  <section class="brands" aria-label="Marcas que já trabalharam com a NEXUS">
    <div class="container">
      <h2 class="brands-heading">
        Marcas que já navegam em parceria com a NEXUS
      </h2>
    </div>

    <div class="brands-marquee">
      <div class="brands-track">
        <ul class="brands-list">
          <li v-for="client in CLIENTS" :key="`a-${client.name}`" class="brand-logo">
            <svg
              class="brand-mark"
              viewBox="0 0 48 48"
              fill="none"
              role="img"
              :aria-label="`${client.name} (cliente fictício)`"
            >
              <polygon
                v-if="client.shape !== 'ring'"
                :points="SHAPES[client.shape]"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle v-else cx="24" cy="24" r="19" stroke="currentColor" stroke-width="2" />
              <text
                x="24"
                y="30.5"
                text-anchor="middle"
                font-size="16"
                font-weight="700"
                fill="currentColor"
                font-family="var(--font-display)"
              >
                {{ client.letter }}
              </text>
            </svg>
            <span class="brand-name">{{ client.name }}</span>
          </li>
        </ul>
        <ul class="brands-list brands-list--clone" aria-hidden="true">
          <li v-for="client in CLIENTS" :key="`b-${client.name}`" class="brand-logo">
            <svg
              class="brand-mark"
              viewBox="0 0 48 48"
              fill="none"
              focusable="false"
            >
              <polygon
                v-if="client.shape !== 'ring'"
                :points="SHAPES[client.shape]"
                stroke="currentColor"
                stroke-width="2"
              />
              <circle v-else cx="24" cy="24" r="19" stroke="currentColor" stroke-width="2" />
              <text
                x="24"
                y="30.5"
                text-anchor="middle"
                font-size="16"
                font-weight="700"
                fill="currentColor"
                font-family="var(--font-display)"
              >
                {{ client.letter }}
              </text>
            </svg>
            <span class="brand-name">{{ client.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brands {
  padding-block: clamp(2.5rem, 6vh, 4.5rem);
  border-top: 1px solid var(--color-border-subtle);
}

.brands-heading {
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  font-weight: 600;
  color: var(--color-text-muted);
  max-width: none;
  margin-bottom: 2.5rem;
}

.brands-marquee {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.brands-track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: marquee 30s linear infinite;
}

.brands-list {
  display: flex;
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);
  padding-right: clamp(2.5rem, 6vw, 5rem);
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-muted);
  opacity: 0.55;
  transition: opacity var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out);
  white-space: nowrap;
}

.brand-logo:hover {
  opacity: 1;
  color: var(--color-text);
}

.brand-mark {
  width: 2.5rem;
  height: 2.5rem;
  flex: none;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.0625rem;
  letter-spacing: 0.02em;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .brands-track {
    animation: none;
  }

  .brands-marquee {
    overflow-x: auto;
  }
}
</style>