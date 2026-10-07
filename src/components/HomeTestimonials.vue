<script setup>
import { ref, computed } from 'vue'
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

const TESTIMONIALS = [
  {
    id: 'marina',
    quote:
      'O rebrand saiu do papel para a operação em oito semanas, e o time comprou a direção sem fricção. Método e pragmatismo que faltavam.',
    name: 'Marina Duarte',
    role: 'Diretora de Marketing, Ottava',
    photo: 'https://picsum.photos/seed/nexus-marina/96/96',
  },
  {
    id: 'rafael',
    quote:
      'Entraram como fornecedores de growth e viraram o braço de estratégia. CAC caindo todos os meses, com relatório em que a gente confia.',
    name: 'Rafael Nunes',
    role: 'Cofundador, Nordka',
    photo: 'https://picsum.photos/seed/nexus-rafael/96/96',
  },
  {
    id: 'camila',
    quote:
      'Reconstruíram o produto com pesquisa e design de verdade. A ativação subiu antes mesmo do relançamento completo.',
    name: 'Camila Torres',
    role: 'Head de Produto, Kite',
    photo: 'https://picsum.photos/seed/nexus-camila/96/96',
  },
]

const index = ref(0)
const total = TESTIMONIALS.length

const slideIndex = computed(() => index.value)
const current = computed(() => TESTIMONIALS[slideIndex.value])

function next() {
  index.value = (index.value + 1) % total
}

function prev() {
  index.value = (index.value - 1 + total) % total
}

function goTo(i) {
  index.value = i
}
</script>

<template>
  <section class="testimonials" aria-labelledby="testimonials-title">
    <div class="container">
      <header class="testimonials-head">
        <h2 id="testimonials-title" class="testimonials-title">
          Quem já trabalhou, recomenda o método.
        </h2>

        <div class="testimonials-arrows">
          <button
            type="button"
            class="carousel-btn"
            aria-label="Depoimento anterior"
            @click="prev"
          >
            <PhCaretLeft :size="20" weight="bold" />
          </button>
          <button
            type="button"
            class="carousel-btn"
            aria-label="Próximo depoimento"
            @click="next"
          >
            <PhCaretRight :size="20" weight="bold" />
          </button>
        </div>
      </header>

      <div
        class="carousel"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos de clientes"
      >
        <ul class="carousel-track" :style="{ transform: `translateX(-${slideIndex * 100}%)` }">
          <li v-for="item in TESTIMONIALS" :key="item.id" class="slide" aria-hidden="false">
            <blockquote class="slide-quote">"{{ item.quote }}"</blockquote>
            <div class="slide-author">
              <img
                class="slide-photo"
                :src="item.photo"
                :alt="`Foto de ${item.name}`"
                width="96"
                height="96"
                loading="lazy"
              />
              <div>
                <p class="slide-name">{{ item.name }}</p>
                <p class="slide-role">{{ item.role }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="carousel-dots" role="tablist" aria-label="Ir para depoimento">
        <button
          v-for="(item, i) in TESTIMONIALS"
          :key="`dot-${item.id}`"
          type="button"
          class="carousel-dot"
          :class="{ 'is-active': i === slideIndex }"
          :aria-label="`Ir para o depoimento ${i + 1}`"
          :aria-pressed="i === slideIndex"
          @click="goTo(i)"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  padding-block: clamp(4rem, 9vh, 6.5rem);
  border-top: 1px solid var(--color-border-subtle);
  overflow: hidden;
}

.testimonials-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: clamp(2rem, 5vh, 3rem);
}

.testimonials-title {
  font-size: clamp(1.75rem, 4.2vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  max-width: 20ch;
}

.testimonials-arrows {
  display: flex;
  gap: 0.75rem;
}

.carousel-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 50%;
  color: var(--color-text);
  transition: border-color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.carousel-btn:hover {
  border-color: var(--color-accent);
  background: var(--color-overlay-soft);
}

.carousel-btn:active {
  transform: scale(0.96);
}

.carousel {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  width: 100%;
  transition: transform 0.45s var(--ease-out);
  will-change: transform;
}

.slide {
  flex: 0 0 100%;
  max-width: 56rem;
  padding-bottom: 0.5rem;
}

.slide-quote {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--color-text);
  max-width: none;
}

.slide-author {
  margin-top: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slide-photo {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: 2px solid var(--color-border-strong);
  object-fit: cover;
}

.slide-name {
  font-weight: 600;
}

.slide-role {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.carousel-dots {
  margin-top: clamp(2rem, 4vh, 2.75rem);
  display: flex;
  gap: 0.5rem;
}

.carousel-dot {
  width: 2.25rem;
  height: 3px;
  border-radius: 999px;
  background: var(--color-border-strong);
  transition: background-color var(--duration-fast) var(--ease-out);
}

.carousel-dot:hover {
  background: var(--color-text-muted);
}

.carousel-dot.is-active {
  background: var(--color-accent-vibrant);
}
</style>