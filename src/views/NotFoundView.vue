<template>
  <section class="page-hero">
    <div class="container">
      <p class="page-hero-kicker">Erro 404</p>
      <h1 class="page-hero-title">Página não encontrada.</h1>
      <p class="page-hero-subtitle">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <RouterLink to="/" class="back-link">Voltar para a página inicial</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  flex: 1;
  display: flex;
  align-items: center;
}

.page-hero .container {
  padding-block: clamp(4.5rem, 12vh, 8rem);
}

.page-hero-kicker {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-vibrant);
}

.page-hero-title {
  margin-top: 1rem;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.page-hero-subtitle {
  margin-top: 1rem;
  max-width: 48ch;
  color: var(--color-text-muted);
}

.back-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.6875rem 1.25rem;
  border-radius: var(--radius-sm);
  background: var(--color-accent-vibrant);
  color: var(--color-cta-ink);
  font-family: var(--font-display);
  font-weight: 700;
  transition: transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.back-link:hover {
  color: var(--color-cta-ink);
  transform: translateY(-1px);
  box-shadow: var(--shadow-cta);
}
</style>