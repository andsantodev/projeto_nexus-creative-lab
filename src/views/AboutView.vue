<script setup>
import PageHero from '@/components/PageHero.vue'
import { MANIFESTO, VALUES, TEAM, TIMELINE } from '@/data/about.js'
</script>

<template>
  <div class="about-page">
    <PageHero
      kicker="a agência"
      title="Feita por quem entende de crescimento."
      subtitle="Uma agência de branding, marketing e produto que coloca dados antes de opinião — e design como estratégia, não decoração."
    />

    <section class="manifesto" aria-labelledby="manifesto-title">
      <div class="container manifesto-inner">
        <h2 id="manifesto-title" class="manifesto-title">O manifesto</h2>
        <div class="manifesto-cols">
          <p v-for="(paragraph, i) in MANIFESTO" :key="i" class="manifesto-text">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>

    <section class="values" aria-labelledby="values-title">
      <div class="container">
        <h2 id="values-title" class="values-title">Como a gente trabalha</h2>
        <ul class="values-grid" role="list">
          <li v-for="value in VALUES" :key="value.num" class="value-item">
            <span class="value-num" aria-hidden="true">{{ value.num }}</span>
            <h3 class="value-heading">{{ value.title }}</h3>
            <p class="value-text">{{ value.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="team" aria-labelledby="team-title">
      <div class="container">
        <h2 id="team-title" class="team-title">O time</h2>
        <ul class="team-grid" role="list">
          <li v-for="member in TEAM" :key="member.id" class="team-card">
            <img
              :src="member.photo"
              :alt="`Foto de ${member.name}`"
              class="team-photo"
              width="240"
              height="240"
              loading="lazy"
            />
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
            <p class="team-bio">{{ member.bio }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="timeline" aria-labelledby="timeline-title">
      <div class="container">
        <h2 id="timeline-title" class="timeline-title">Marcos da agência</h2>
        <ol class="timeline-list" role="list">
          <li v-for="milestone in TIMELINE" :key="milestone.year" class="timeline-item">
            <span class="timeline-year">{{ milestone.year }}</span>
            <div class="timeline-content">
              <h3 class="timeline-heading">{{ milestone.title }}</h3>
              <p class="timeline-text">{{ milestone.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="final-cta" aria-labelledby="about-final-title">
      <div class="container final-cta-inner">
        <h2 id="about-final-title" class="final-cta-title">
          Quer crescer com quem mede antes de opinar?
        </h2>
        <p class="final-cta-sub">Primeiro diagnóstico, depois proposta. Resposta em até 24h.</p>
        <RouterLink to="/contato" class="btn-primary">Iniciar Projeto</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
}

.manifesto {
  padding-block: clamp(3.5rem, 8vh, 5.5rem);
}

.manifesto-inner {
  display: grid;
  gap: 1.5rem;
}

.manifesto-title,
.values-title,
.team-title,
.timeline-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.manifesto-cols {
  display: grid;
  gap: 1.25rem;
  max-width: 72ch;
}

.manifesto-text {
  font-size: clamp(var(--text-lg), 2vw, 1.375rem);
  line-height: 1.6;
  color: var(--color-text-muted);
}

.values {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(3.5rem, 8vh, 5.5rem);
}

.values-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.value-item {
  padding: 1.75rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  background: linear-gradient(165deg, rgba(31, 40, 51, 0.6), rgba(31, 40, 51, 0.3));
  transition: border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.value-item:hover {
  border-color: var(--color-accent);
  transform: translateY(-3px);
}

.value-num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  color: var(--color-accent-vibrant);
}

.value-heading {
  margin-top: 1.25rem;
  font-size: 1.375rem;
  font-weight: 800;
}

.value-text {
  margin-top: 0.5rem;
  color: var(--color-text-muted);
}

.team {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(3.5rem, 8vh, 5.5rem);
}

.team-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.team-card {
  padding: 1.5rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  background: rgba(31, 40, 51, 0.35);
}

.team-photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius-md);
  object-fit: cover;
  border: 1px solid var(--color-border-subtle);
}

.team-name {
  margin-top: 1.25rem;
  font-size: 1.25rem;
  font-weight: 800;
}

.team-role {
  margin-top: 0.125rem;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-accent);
}

.team-bio {
  margin-top: 0.625rem;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.timeline {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(3.5rem, 8vh, 5.5rem);
}

.timeline-list {
  margin-top: 2.5rem;
  display: grid;
  gap: 0;
}

.timeline-item {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  padding-block: 1.5rem;
  border-top: 1px solid var(--color-border-subtle);
}

.timeline-item:first-child {
  border-top: 0;
}

.timeline-year {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1rem;
  color: var(--color-accent-vibrant);
}

.timeline-heading {
  font-size: 1.25rem;
  font-weight: 800;
}

.timeline-text {
  margin-top: 0.25rem;
  color: var(--color-text-muted);
}

.final-cta {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(4rem, 9vh, 6rem);
}

.final-cta-inner {
  display: grid;
  justify-items: start;
  gap: 1.25rem;
}

.final-cta-title {
  max-width: 24ch;
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
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }
}

@media (min-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>