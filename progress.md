# Progress Log

<!-- Nova entrada sempre no topo. Nunca apague entradas antigas. -->

## [2026-08-12] — Revisão de bugs (navegação, Cases Home, cover CaseDetail, fotos do time)
- Feito:
  - **Bug de navegação (correção da causa raiz)**: o `<Transition mode="out-in">` no `App.vue` exige view de **raiz única**. `HomeView.vue` (7 componentes soltos) e `CaseDetailView.vue` (`<article v-if>` + `<section v-else>`) eram *fragmentos*, travando o *leave* e impedindo a próxima página de montar — só carregava com hard refresh. Envolvi ambos em um único elemento raiz (`.home-view`/`<div>` condicional). Reproduzido/configurado em memória com Vue real antes da correção.
  - **Cases da Home empilhando (mobile/tablet)**: `HomeCases.vue` aplicava `:style="{ gridColumn: 'span 7/5/12'" }` inline em **todos** os tamanhos, o que quebrava o grid de 1 coluna (spawn de tracks implícitas, cards "espremidos"). Troquei por classes `is-7/is-5/is-12` e movi os spans + `aspect-ratio` do card largo para dentro de `@media (min-width: 1024px)`; abaixo disso empilha 1 a 1.
  - **Cover do case de detalhe muito alto**: `CaseDetailView.vue` usava altura intrínseca da imagem (7:4), crescendo com a largura. Adicionei `aspect-ratio: 21/9` + `overflow: hidden` e `img { height: 100%; object-fit: cover }` → banner rasado e consistente em qualquer breakpoint.
  - **Cover do case de detalhe (rev. 2)**: a primeira tentativa fixou 21:9 no próprio `<img>` (que é o `.case-cover`) e deixou `object-fit: cover` numa regra morta (`.case-cover img`), esticando/croppando a foto. Troquei para imagem responsiva em proporção natural — `display: block; width: 100%; height: auto` — removendo `aspect-ratio: 21/9`, `overflow: hidden` e a regra morta. Agora o cover escala junto com a largura preservando a razão original (1400×760 / 1400×900), como as cards da CasesView.
  - **Fotos reais do time (About)**: `src/data/about.js` substitui `picsum.photos` (genéricas) por retratos reais via `randomuser.me/api/portraits/{women|men}/N.jpg`, com gênero coerente com cada membro (Helena/Vitor/Isabela/Caio/Luiza). Sem backend, só URL — dentro dos limites do MVP.
  - Ajuste de teste: `about-page.spec.js` passou a validar `randomuser.me` em vez de `picsum.photos` no src do `.team-photo`.
- Verificado (comando + resultado):
  - `npm run test:unit` → **81/81 passando** (1 teste de About atualizado para o novo source de fotos).
  - `npm run build` → OK (vite build, 1590 módulos).
- Pendências / quebrado:
  - `npm run lint` segue pendente (ESLint não configurado — `# confirm`).
  - Recomendada conferência visual manual em navegador real (mobile/tablet) para validar o empilhamento dos cases e o aspect de 21/9 do case detail.
- Próximo passo sugerido: conferência manual visual dos ajustes + configurar ESLint; opcionalmente reduzir bundle de ícones Phosphor.

## [2026-08-12] — F014: Cross-device responsiveness pass
- Feito:
  - `responsive.spec.js`: QA automatizado cobrindo 6 rotas x 4 viewports (375/768/1280/2560) — (a) nenhum link morto (cada `a[href]` interno resolve via `router.resolve`), (b) todas as rotas renderizam `<main>` com conteúdo, (c) header/footer/nav presentes em todas as combinações.
  - Fechamento do roadmap: F001..F014 **todas `done`**.
- Verificado (comando + resultado):
  - `npm run test:unit` → **81/81 passando** (3 novos).
  - `npm run build` → OK.
- Pendências / quebrado:
  - Recomendado conferência visual pixel-perfect em navegador real (jsdom não renderiza layout CSS; a automação garante navegação, conteúdo e ausência de dead links, não o layout visual).
  - `npm run lint` segue pendente (ESLint não configurado — `# confirm`).
- Próximo passo sugerido: nenhum — roadmap completo. Sugestão futura: conferência manual visual + configurar ESLint + opcionalmente reduzir bundle de ícones.

## [2026-08-12] — F013: Contact page
- Feito:
  - `ContactView.vue` reconstruído: `PageHero` (kicker "contato"), grid com intro + infos complementares (e-mail, resposta 24h, atendimento remoto) e painel reutilizando `ContactForm` da F009; FAQ com 4 perguntas (`<details>/<summary>`).
  - `ContactForm` ganhou prop `initial-service` para exibir serviço de interesse vindo da query `?servico=` (links da página Serviços).
  - Testes `contact-page.spec.js` (5).
- Verificado (comando + resultado):
  - `npm run test:unit` → **78/78 passando** (5 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F014 — Responsividade cross-device (QA final).

## [2026-08-12] — F012: About page
- Feito:
  - `src/data/about.js`: manifesto (3 parágrafos), valores (4 princípios), time (5 membros fictícios), timeline (4 marcos).
  - `AboutView.vue` reconstruído: `PageHero` (kicker "a agência"), seção de manifesto editorial, grid de valores (2 colunas, hover), grid de time (fotos + nome + cargo + bio), linha do tempo com hairline e CTA final → `/contato`.
  - Testes `about-page.spec.js` (5).
- Verificado (comando + resultado):
  - `npm run test:unit` → **73/73 passando** (5 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F013 — Página Contato (formulário dedicado + FAQ).

## [2026-08-12] — F011: Cases page
- Feito:
  - `src/data/cases.js` expandido para **6 cases** (Ottava, Kite, Nordka, Ambar, Volta, Lumen), cada um com Desafio/Solução/Resultado, métrica e flag `featured`; exports `FEATURED_CASES` (3 da Home) e `caseCategoryLabel`.
  - Componentes compartilhados: `CaseFilter.vue` (filtro reutilizado na Home e na página) e `CaseCard.vue` (card com link opcional).
  - `HomeCases.vue` refatorado para usar `CaseFilter` + `FEATURED_CASES`.
  - `CasesView.vue` reconstruído: `PageHero`, filtro, grid assimétrico (card hero largo + pares 7/5) com link para o estudo de caso, CTA final → `/contato`.
  - `CaseDetailView.vue` + rota `/cases/:id`: capa grande, tag, métrica em destaque e seções Desafio → Solução → Resultado; fallback "case não encontrado".
  - Testes `cases-page.spec.js` (6). Ajustado timeout de testes (resolução de rotas lazy + transform ficou pesado): `testTimeout: 15000` no vite.config e 20s no teste de views.
- Verificado (comando + resultado):
  - `npm run test:unit` → **68/68 passando** (8 novos, 6 F011 + fallback + métrica).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F012 — Página Sobre (manifesto, valores, time, timeline).

## [2026-08-12] — F010: Services page
- Feito:
  - `src/data/services.js` estendido com descrição longa e processo (4 passos com título + descrição) para os 4 serviços.
  - `src/components/PageHero.vue`: hero reutilizável para páginas internas (kicker opcional, título, subtítulo).
  - `ServicesView.vue` reconstruído (substitui o placeholder): hero, 4 blocos de serviço em linhas editoriais com hairline (índice, título, descrição longa, "Como trabalhamos" numerado, entregáveis, mini-CTA "Falar sobre este serviço" → `/contato?servico=…`), FAQ nativo (`<details>/<summary>`, 5 perguntas), CTA final "Iniciar Projeto" → `/contato`.
  - Testes `services-page.spec.js` (4).
- Verificado (comando + resultado):
  - `npm run test:unit` → **62/62 passando** (4 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F011 — Página Cases (expande para 6-8 cases + case study Desafio/Solução/Resultado).

---

## [2026-08-12] — Rodada multi-feature 2 (limite de 4)
F007, F008, F009 e F010 concluídas em sequência nesta sessão (registros individuais acima da linha marcadora). Home completa (7 seções) + página Serviços navegável.

## [2026-08-12] — F009: Home — Contact form (UI only)
- Feito:
  - `ContactForm.vue` (componente reutilizável — será usado na página Contato/F013): nome, e-mail corporativo (com validação), select de faixa de orçamento (5 opções), detalhes do projeto; validação inline com `aria-invalid`/`aria-describedby`; envio simulado com estado de sucesso explícito ("Projeto recebido") e reset; nota de demonstração MVP sem chamada de rede.
  - `HomeContact.vue`: seção `id="contato"` (alvo do CTA do hero) em split (intro + info de contato à esquerda, formulário em painel à direita).
  - Token `--color-danger` adicionado ao sistema de tokens.
  - `HomeView.vue` agora compõe as **7 seções do PRD** (Hero, Marcas, Serviços, Cases, Métricas, Depoimentos, Contato).
  - Testes `home-contact.spec.js` (6).
- Verificado (comando + resultado):
  - `npm run test:unit` → **58/58 passando** (6 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F010 — Página Serviços (expande os 4 serviços + FAQ + CTA).

## [2026-08-12] — F008: Home — Testimonials carousel
- Feito:
  - `HomeTestimonials.vue`: carrossel de 3 depoimentos (citação ≤3 linhas, foto, nome, cargo) com track em translateX, setas prev/next (ícones Phosphor `PhCaretLeft/Right`) com wrap-around e dots clicáveis com `aria-pressed`/`aria-label`, `aria-roledescription="carrossel"`.
  - `HomeView.vue` compõe Hero + Brands + Services + Cases + Metrics + Testimonials.
  - Testes `home-testimonials.spec.js` (3).
- Verificado (comando + resultado):
  - `npm run test:unit` → **51/51 passando** (3 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma (corrigido export de ícones `Ph*` e sequência de navegação do teste).
- Próximo passo sugerido: F009 — Home: formulário de contato (UI only).

## [2026-08-12] — F007: Home — Agency metrics counters
- Feito:
  - `src/data/metrics.js`: 4 métricas (124 projetos, R$ 38M receita, 96% retenção, 18 prêmios) — ilustrativas.
  - `HomeMetrics.vue`: faixa "scoreboard" com 4 contadores separados por hairlines, count-up animado (IntersectionObserver + rAF, ~1.1s, easeOut) com fallback imediato para `prefers-reduced-motion`, números com tabular-nums e `aria-label`.
  - `HomeView.vue` compõe Hero + Brands + Services + Cases + Metrics.
  - Instalado `@phosphor-icons/vue` (será usado em F008/F009). Stub de `IntersectionObserver` no setup dos testes.
  - Testes `home-metrics.spec.js` (5).
- Verificado (comando + resultado):
  - `npm run test:unit` → **48/48 passando** (5 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F008 — Home: depoimentos em carrossel.

## [2026-08-12] — F006: Home — Cases gallery with filter
- Feito:
  - `src/data/cases.js`: 3 cases (Ottava/branding, Kite/web, Nordka/growth) com cover, título, categoria e métrica — fonte única, retomada/expandida na F011.
  - `HomeCases.vue`: grid assimétrico de 12 colunas (spans 7/5/12, card largo offset), filtro pill (Todos | Branding | Web | Growth) reativo com `aria-pressed` e `TransitionGroup`, cards com capa (picsum seed), tag de categoria, cliente, título e métrica em destaque, icone de seta circular no hover, `id="cases"` para o CTA do hero.
  - Métricas sinalizadas como ilustrativas na UI (projeto fictício).
  - `HomeView.vue` agora compõe Hero + Brands + Services + Cases.
  - Testes `home-cases.spec.js` (5).
- Verificado (comando + resultado):
  - `npm run test:unit` → **43/43 passando** (5 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F007 — Home: métricas da agência (4 contadores).

---

## [Acumulado da rodada multi-feature]
- F003 a F006 concluídas em sequência nesta sessão (ver registro individual de cada uma acima). Limite de segurança de 4 features por rodada atingido — aguardando revisão do usuário antes das próximas (F007, F008, F009…).

## [2026-08-12] — F005: Home — Services grid
- Feito:
  - `src/data/services.js`: os 4 serviços do PRD (descrição curta + entregáveis) — fonte única para F005 e retomada na F010.
  - `HomeServices.vue`: grid 2x2 (desktop) com cartões assimétricos (offset estilo "brick"), índice "01..04", descrição, lista de entregáveis e hover com borda accent + glow radial + elevação.
  - `HomeView.vue` agora compõe Hero + Brands + Services.
  - Testes `home-services.spec.js` (5).
- Verificado (comando + resultado):
  - `npm run test:unit` → **38/38 passando** (5 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F006 — Home: cases gallery com filtro.

## [2026-08-12] — F004: Home — Brands/clients marquee
- Feito:
  - `HomeBrands.vue`: marquee contínuo (CSS `@keyframes marquee`, translateX -50%, track clonado `aria-hidden`, mask de fade nas bordas) com 7 logos placeholder de clientes fictícios.
  - Logos unicamente mark (monograma SVG monocromático, `currentColor`) + wordmark — sem rótulos de categoria; opacidade 0.55 com hover para 1 (per DESIGN.md: monocromático e reduzido).
  - `prefers-reduced-motion` desliga a animação e permite scroll manual.
  - `HomeView.vue` compõe `<HomeHero />` + `<HomeBrands />`.
  - Testes `home-brands.spec.js` (5).
- Verificado (comando + resultado):
  - `npm run test:unit` → **33/33 passando** (5 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F005 — Home: grid de serviços (4 cards + entregáveis + hover).

## [2026-08-12] — F003: Home — Hero section
- Feito:
  - `HomeHero.vue` (substitui o placeholder da Home): H1 com ênfase em itálico no destaque, subtítulo (≤20 palavras), CTA primário "Iniciar Projeto" (scroll suave até `#contato`) e secundário "Ver Cases" (scroll até `#cases`), botões com estados hover/active.
  - Visual de fundo dinâmico em grid/rede de nós SVG (14 nós + links, nós pulsam com delay em cascata, gradient mask), blobs de acento desfocados, respeitando `prefers-reduced-motion`.
  - Layout split (texto à esquerda / visual à direita em desktop), mobile colapsa para coluna única, `min-height: 100dvh` e top padding limitado.
  - `HomeView.vue` agora compõe `<HomeHero />` e receberá as próximas seções.
  - Testes `home-hero.spec.js` (4). Ajuste no `__tests__/setup.js`: `matchMedia` e `scrollIntoView` stubbed no jsdom.
- Verificado (comando + resultado):
  - `npm run test:unit` → **28/28 passando** (4 novos).
  - `npm run build` → OK.
- Pendências / quebrado: nenhuma.
- Próximo passo sugerido: F004 — Home: marquee de marcas/clientes.

## [2026-08-12] — F002: Design tokens and global styles
- Feito:
  - Criado `src/styles/tokens.css` — sistema formal de tokens: paleta completa de `docs/DESIGN.md` (6 cores), semânticos derivados (overlays, bordas, `--color-cta-ink` para contraste AA sobre CTA), escala tipográfica, espaçamento (4px), raio, sombras matizadas, layout, camadas z documentadas e tokens de movimento.
  - Fontes `Plus Jakarta Sans` (display) e `Inter` (body) self-hosted via @fontsource, carregando apenas subseto **latin** (conteúdo pt-BR) em `src/styles/fonts.css` — 2 woff2 no build (~75 kB), sem requests externos.
  - `base.css` refatorado para consumir os tokens (reset, elementos globais, transição de rota, guards de `prefers-reduced-motion`/`prefers-reduced-transparency`).
  - Componentes (AppHeader, AppFooter, PageHeroPlaceholder, NotFoundView, App) migrados de literais para tokens: bordas, hover, sombras de CTA, cores de texto secundário, durações de transição.
- Verificado (comando + resultado):
  - `npm run test:unit` → **24/24 testes passando** (adicionei `tokens.spec.js` com 11 testes que provam os critérios de aceite: vars de cor existem, fontes carregadas e aplicadas globalmente).
  - `npm run build` → OK; dist com 2 fonts latin apenas (antes: 9 subsetos). CSS principal 10.12 kB (antes 15.32 kB).
  - Smoke test `npm run dev` → HTTP 200 em `/`, `/src/styles/fonts.css` e `/src/styles/tokens.css`.
- Pendências / quebrado:
  - Nenhuma. `npm run lint` segue pendente (ESLint não configurado — `# confirm`).
- Próximo passo sugerido: F003 — Home Hero (varia de F001+F002).