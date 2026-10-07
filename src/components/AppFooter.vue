<script setup>
import BrandMark from '@/components/BrandMark.vue'

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Dribbble', href: '#' },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/" aria-label="NEXUS Creative Lab — página inicial">
          <BrandMark :size="32" />
          <span class="brand-word">
            <span class="brand-name">NEXUS</span>
            <span class="brand-tagline">creative lab</span>
          </span>
        </a>
        <p class="footer-blurb">
          Branding, growth e produto para marcas que medem resultados — dados antes
          de opinião, design como estratégia.
        </p>
      </div>

      <nav class="footer-col" aria-label="Páginas do site">
        <h3 class="footer-title">Páginas</h3>
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/servicos">Serviços</RouterLink>
        <RouterLink to="/cases">Cases</RouterLink>
        <RouterLink to="/sobre">Sobre</RouterLink>
        <RouterLink to="/contato">Contato</RouterLink>
      </nav>

      <div class="footer-col">
        <h3 class="footer-title">Serviços</h3>
        <RouterLink to="/servicos">Brand Strategy</RouterLink>
        <RouterLink to="/servicos">Growth Marketing</RouterLink>
        <RouterLink to="/servicos">UI/UX &amp; Web</RouterLink>
        <RouterLink to="/servicos">Data Analytics</RouterLink>
      </div>

      <div class="footer-col">
        <h3 class="footer-title">Contato</h3>
        <a href="mailto:contato@nexuscreative.lab">contato@nexuscreative.lab</a>
        <p class="footer-meta">Resposta média em até 24h</p>
        <div class="footer-social">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            class="footer-social-link"
            :aria-label="social.label"
          >
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>© {{ currentYear }} NEXUS Creative Lab. Todos os direitos reservados.</p>
        <p class="footer-disclaimer">
          Site demonstrativo (MVP) — conteúdo fictício, sem envio real de dados.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: auto;
  border-top: 1px solid var(--color-border-subtle);
  background: linear-gradient(
    180deg,
    rgba(31, 40, 51, 0.35),
    rgba(11, 12, 16, 0.6)
  );
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding-block: 3.5rem 2.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--color-text);
}

.brand-word {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.0625rem;
  letter-spacing: 0.08em;
}

.brand-tagline {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.footer-blurb {
  margin-top: 1rem;
  max-width: 30ch;
  font-size: 0.9375rem;
  color: var(--color-text-muted);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  font-size: 0.9375rem;
}

.footer-title {
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.footer-col a {
  width: fit-content;
  color: var(--color-text-muted);
  transition: color var(--duration-fast) var(--ease-out);
}

.footer-col a:hover {
  color: var(--color-accent-vibrant);
}

.footer-meta {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.footer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.25rem;
}

.footer-social-link {
  font-size: 0.875rem;
}

.footer-bottom {
  border-top: 1px solid var(--color-border-subtle);
  padding-block: 1.25rem;
}

.footer-bottom-inner {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: space-between;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.footer-disclaimer {
  color: var(--color-text-faint);
}

@media (min-width: 720px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr 1.25fr;
    gap: 3rem;
  }

  .footer-bottom-inner {
    flex-direction: row;
    align-items: center;
  }
}
</style>