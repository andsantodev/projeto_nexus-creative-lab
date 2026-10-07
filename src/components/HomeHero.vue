<script setup>
const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

const NODES = [
  { x: 520, y: 90 }, { x: 640, y: 200 }, { x: 520, y: 330 },
  { x: 700, y: 340 }, { x: 620, y: 480 }, { x: 780, y: 520 },
  { x: 560, y: 560 }, { x: 820, y: 380 }, { x: 900, y: 240 },
  { x: 860, y: 90 }, { x: 940, y: 470 }, { x: 700, y: 100 },
  { x: 940, y: 620 }, { x: 780, y: 660 },
]

const nodeByLabel = {
  a: NODES[0], b: NODES[1], c: NODES[2], d: NODES[3], e: NODES[4],
  f: NODES[5], g: NODES[6], h: NODES[7], i: NODES[8], j: NODES[9],
  k: NODES[10], l: NODES[11], m: NODES[12], n: NODES[13],
}

const LINKS = [
  ['a', 'b'], ['b', 'l'], ['a', 'i'], ['i', 'j'],
  ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f'],
  ['d', 'h'], ['h', 'k'], ['h', 'i'], ['k', 'f'],
  ['f', 'm'], ['m', 'n'], ['e', 'g'], ['g', 'n'],
  ['c', 'g'],
]
</script>

<template>
  <section class="hero">
    <div class="hero-visual" aria-hidden="true">
      <div class="hero-blob hero-blob--1"></div>
      <div class="hero-blob hero-blob--2"></div>
      <svg
        class="hero-network"
        viewBox="0 0 1024 720"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="nx-line-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#66FCF1" stop-opacity="0.35" />
            <stop offset="1" stop-color="#45A29E" stop-opacity="0.12" />
          </linearGradient>
        </defs>
        <g v-for="link in LINKS" :key="`${link[0]}${link[1]}`">
          <line
            :x1="nodeByLabel[link[0]].x"
            :y1="nodeByLabel[link[0]].y"
            :x2="nodeByLabel[link[1]].x"
            :y2="nodeByLabel[link[1]].y"
            stroke="url(#nx-line-g)"
            stroke-width="1.5"
          />
        </g>
        <g v-for="(node, i) in NODES" :key="`n${i}`">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="3.5"
            class="hero-node"
            :class="i <= 2 ? 'is-core' : ''"
            :style="{ animationDelay: `${(i % 5) * 0.6}s` }"
            fill="#45A29E"
          />
        </g>
      </svg>
    </div>

    <div class="container hero-inner">
      <p class="hero-eyebrow">branding · growth · produto</p>
      <h1 class="hero-title">
        Dados, design e tecnologia que aceleram o <em>crescimento</em>.
      </h1>
      <p class="hero-subtitle">
        A NEXUS conecta estratégia de marca, marketing digital e produto para
        empresas que medem resultados antes de decidir.
      </p>
      <div class="hero-actions">
        <a
          href="#contato"
          class="btn btn--primary"
          @click.prevent="goTo('contato')"
        >
          Iniciar Projeto
        </a>
        <a
          href="#cases"
          class="btn btn--ghost"
          @click.prevent="goTo('cases')"
        >
          Ver Cases
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  min-height: 100dvh;
  overflow: hidden;
}

.hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: clamp(3rem, 8vh, 5.5rem) clamp(4rem, 10vh, 7rem);
}

.hero-eyebrow {
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent-vibrant);
}

.hero-title {
  margin-top: 1.5rem;
  max-width: 15ch;
  font-size: clamp(2.375rem, 5.6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.04;
}

.hero-title em {
  font-style: italic;
  font-weight: 800;
  color: var(--color-accent-vibrant);
}

.hero-subtitle {
  margin-top: 1.5rem;
  max-width: 46ch;
  font-size: clamp(var(--text-lg), 2vw, 1.25rem);
  color: var(--color-text-muted);
}

.hero-actions {
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.875rem;
  padding: 0.6875rem 1.5rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  transition: transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    background-color var(--duration-base) var(--ease-out);
}

.btn:active {
  transform: scale(0.98);
}

.btn--primary {
  background: var(--color-accent-vibrant);
  color: var(--color-cta-ink);
}

.btn--primary:hover {
  color: var(--color-cta-ink);
  transform: translateY(-2px);
  box-shadow: var(--shadow-cta);
}

.btn--ghost {
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.02);
}

.btn--ghost:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(6, 8, 12, 0.35);
}

/* --- Visual de fundo: rede de nós --- */
.hero-visual {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero-visual::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    var(--color-bg) 8%,
    rgba(11, 12, 16, 0.55) 45%,
    rgba(11, 12, 16, 0.12) 72%
  );
}

.hero-network {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.65;
  mask-image: linear-gradient(90deg, transparent 0%, #000 45%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 45%);
}

.hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.5;
}

.hero-blob--1 {
  width: 28rem;
  height: 28rem;
  right: -6rem;
  top: -4rem;
  background: rgba(69, 162, 158, 0.28);
}

.hero-blob--2 {
  width: 22rem;
  height: 22rem;
  right: 6rem;
  bottom: -6rem;
  background: rgba(102, 252, 241, 0.14);
}

.hero-node {
  transform-origin: center;
  animation: node-pulse 4.5s var(--ease-out) infinite;
}

.hero-node.is-core {
  fill: var(--color-accent-vibrant);
}

@keyframes node-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.55);
  }
}

@media (min-width: 1024px) {
  .hero {
    grid-template-columns: 1.1fr 0.9fr;
  }

  .hero-visual::after {
    background: linear-gradient(
      100deg,
      var(--color-bg) 18%,
      rgba(11, 12, 16, 0.28) 52%,
      rgba(11, 12, 16, 0.04) 78%
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-node {
    animation: none;
  }
}
</style>