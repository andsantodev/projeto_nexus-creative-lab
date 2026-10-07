# PRD — Website NEXUS Creative Lab

## 1. Resumo executivo
Website institucional em modo single-page (Home completa, com as demais páginas do
sitemap estruturadas mas priorizadas depois) para a NEXUS Creative Lab, agência
fictícia de branding, marketing digital e desenvolvimento de produtos digitais. O site
existe para comunicar posicionamento de alta performance, exibir cases e serviços, e
gerar leads qualificados via formulário de contato.

## 2. Problema e motivação
A agência precisa de uma vitrine digital que traduza visualmente sua proposta de valor
("conectar dados, design de alta performance e tecnologia") e capture leads. Sem o
site, não há canal próprio de apresentação de cases, prova social e captação de
contatos — a agência depende de canais externos.

## 3. Objetivos (Goals)
1. Apresentar a proposta de valor da NEXUS de forma direta e sofisticada na Home.
2. Exibir prova social (clientes, métricas, depoimentos) para gerar credibilidade.
3. Apresentar os 4 serviços principais de forma clara e escaneável.
4. Exibir cases de sucesso com métricas de impacto, com filtro por categoria.
5. Capturar leads via formulário de contato estruturado.
6. Garantir navegação 100% funcional em desktop e mobile (critério de sucesso do
   projeto).

## 4. Não-objetivos (Non-goals)
- Backend/persistência de dados: o formulário de contato **não terá funcionalidade
  real de envio** nesta fase (MVP visual/navegável, sem integração de e-mail, banco de
  dados ou CRM).
- Autenticação, área logada, CMS ou painel administrativo.
- Integrações obrigatórias de terceiros (analytics, agendamento, pagamento) — nenhuma
  foi definida para esta fase.
- Conteúdo real de cliente (logos, cases, depoimentos): usar placeholders/mock data
  fiéis à estrutura descrita, já que o projeto é fictício.

## 5. Usuários e personas
- **Visitante/lead potencial**: tomador de decisão (marketing, fundador, C-level) de
  marcas que buscam agência de branding/growth/dev — navega para avaliar
  credibilidade, cases e serviços antes de preencher o formulário de contato.

## 6. Requisitos funcionais
1. Seção Hero com H1, subtítulo, CTA primário ("Iniciar Projeto" — rola até o
   formulário) e CTA secundário ("Ver Cases" — rola até a seção de cases), com grid
   dinâmico/efeito visual de fundo.
2. Seção de marcas/clientes com efeito marquee (rolagem horizontal contínua),
   exibindo 6 a 8 logos placeholder monocromáticos.
3. Seção de Serviços em grid interativo com 4 cards (Brand Strategy, Growth
   Marketing, UI/UX & Web Development, Data Analytics), cada um com descrição curta
   e lista de entregáveis, com efeito hover (borda/brilho).
4. Seção de Cases em grid assimétrico com 3 projetos em destaque, componente de
   filtro (Todos | Branding | Web | Growth), e cards com imagem de capa, tag de
   categoria, título do cliente e métrica de impacto.
5. Seção de métricas da agência com 4 contadores (projetos entregues, receita
   gerada, taxa de retenção, prêmios).
6. Seção de depoimentos em carrossel com 3 cards (citação, foto, nome, cargo).
7. Seção de formulário de contato com campos: nome completo, e-mail corporativo,
   faixa de orçamento (select), detalhes do projeto (textarea) e botão de envio —
   sem lógica de envio real (ver Não-objetivos).
8. Estrutura de rotas/navegação para as demais páginas do sitemap (Cases, Serviços,
   Sobre Nós, Contato) — conteúdo e layout definidos abaixo, na seção 6.1
   (conteúdo fictício criado para preencher o MVP, já que a marca não é real).
9. Navegação principal (header) e rodapé consistentes em todas as páginas.

### 6.1 Conteúdo das páginas internas (criado para este MVP)

Conteúdo fictício, no mesmo tom de voz da marca (direto, sofisticado, técnico,
focado em resultados), mantendo a identidade visual já definida (seção 8).

**Página Serviços**
- Hero da página: título "Soluções que escalam junto com sua marca" + subtítulo
  reforçando os 4 pilares.
- Expansão dos 4 serviços do Grid da Home, cada um em seção própria com: descrição
  longa, "Como trabalhamos" (3-4 etapas do processo, ex. para Brand Strategy:
  Diagnóstico → Posicionamento → Identidade → Manual de marca), lista de
  entregáveis (já existente no briefing) e um mini-CTA ("Falar sobre este
  serviço" → rola até o formulário de contato).
- Seção de FAQ (4-5 perguntas frequentes sobre prazo, investimento, processo de
  contratação).
- CTA final igual ao da Home ("Iniciar Projeto").

**Página Cases**
- Hero da página: título "Resultados que falam por si" + subtítulo.
- Grid completo de cases (expandindo os 3 da Home para 6-8), mantendo o mesmo
  componente de filtro (Todos | Branding | Web | Growth).
- Ao clicar em um case (ou em página de detalhe, se o roteamento permitir):
  estrutura de case study com Desafio → Solução → Resultado, métrica de impacto
  em destaque, e categoria(s).
- CTA final ("Iniciar Projeto").

**Página Sobre Nós**
- Hero da página: título "Feita por quem entende de crescimento" + texto de
  manifesto/posicionamento da agência (2-3 parágrafos, tom técnico e direto).
- Seção de valores/cultura (3-4 princípios, ex. "Dados antes de opinião", "Design
  é estratégia, não decoração", "Entrega rápida sem atalho na qualidade").
- Seção de time: grid com 5-6 membros fictícios (nome, cargo, foto placeholder,
  uma frase de bio), cobrindo as áreas dos 4 serviços.
- Linha do tempo/marcos da agência (3-4 eventos fictícios, ex. fundação, marco de
  clientes, prêmio, expansão).

**Página Contato**
- Reaproveita o formulário de contato já especificado na Home (seção 7 do
  briefing), como página dedicada.
- Informações complementares: e-mail de contato, tempo médio de resposta,
  presença/atendimento (ex. "atendimento remoto para todo o Brasil").
- FAQ curto sobre processo inicial de contato (ex. "o que acontece depois que eu
  envio o formulário").

## 7. Requisitos não-funcionais
- **Responsividade**: layout adaptável para mobile, tablet e desktop ultrawide
  (requisito explícito do briefing).
- **Performance**: carregamento leve, já que é site institucional/vitrine —
  otimização de imagens e animações sem impacto perceptível no tempo de carga.
  `[a definir: metas numéricas específicas]`
- **Acessibilidade**: contraste adequado no dark mode, navegação por teclado nos
  elementos interativos (filtro, carrossel, formulário). `[a definir: nível WCAG
  alvo]`
- **Compatibilidade de navegadores**: `[a definir]`

## 8. Referências de design
O briefing já contém uma especificação visual completa, equivalente a um
`DESIGN.md`:
- Paleta: fundo `#0B0C10`, superfície de cards `#1F2833`, texto primário `#FFFFFF`,
  texto secundário `#C5C6C7`, acento `#45A29E`, acento vibrante/CTA `#66FCF1`.
- Tipografia: títulos em Plus Jakarta Sans ou Syne (Bold/ExtraBold); corpo em Inter
  ou SF Pro Display (Regular/Medium).
- Tema dark mode com contraste elevado, glassmorphism (blur de fundo),
  microinterações em botões e transições suaves.

Esta referência será registrada como `docs/DESIGN.md` no pacote Harness (conteúdo
extraído deste PRD; a criação do arquivo em si é feita manualmente por você).

Adicionalmente, você indicou que vai usar a skill **design-taste-frontend**
(github.com/Leonxlnx/taste-skill) em todo o projeto — isso será registrado no AGENTS.md
como convenção de projeto para guiar decisões de UI durante a implementação.

## 9. Métricas de sucesso
- Critério definido por você: o site pode ser navegado 100% em desktop e mobile,
  cobrindo todas as seções/páginas do sitemap sem quebras de layout ou links mortos.

## 10. Riscos e premissas
- **Premissa**: como o formulário não terá backend, presume-se que a submissão pode
  ser um "envio simulado" (ex.: mensagem de sucesso no front, sem persistência real).
  Isso deve ficar explícito na UI para não confundir um usuário real do MVP.
- **Risco**: seções ricas em efeitos (marquee, glassmorphism, animações 3D no Hero,
  carrossel) podem impactar performance/responsividade se não forem otimizadas desde
  o walking skeleton.
- **Premissa**: todo o conteúdo textual (Home e páginas internas: cases,
  depoimentos, bios do time, FAQs, logos) é placeholder/fictício, criado para
  este MVP, já que a marca não é real.

## 11. Perguntas em aberto
- Metas numéricas de performance e nível de acessibilidade (WCAG).
- Compatibilidade mínima de navegadores.
- Hospedagem (ainda não definida).

## 12. Fases / Milestones
1. **Fase 1 (walking skeleton)**: estrutura de rotas/navegação entre as 5 páginas do
   sitemap, sem conteúdo final.
2. **Fase 2**: Home completa com todas as 7 seções do briefing.
3. **Fase 3**: páginas internas (Cases, Serviços, Sobre Nós, Contato), com o
   conteúdo definido na seção 6.1.

---

## Stack técnica (sugestão)

Você pediu para eu sugerir a stack. Dado o perfil do projeto — MVP, sem backend,
foco em interface visual rica e responsiva, você já trabalha com Vue no dia a dia, e
vai usar OpenCode como agente de codificação:

- **Frontend**: Vue 3 + Vite (SPA), com Vue Router para as 5 páginas do sitemap.
- **Estilo**: CSS puro com variáveis CSS para a paleta de cores definida, ou
  Tailwind CSS (mais rápido para os efeitos de hover/glassmorphism descritos) — a
  decisão final fica com você.
- **Build/deploy**: build estático (`vite build`), compatível com qualquer
  hospedagem estática (Vercel, Netlify, etc. — hospedagem ainda `[a definir]`).
- **Backend**: nenhum (conforme Não-objetivos).

Isso será refletido no `AGENTS.md` e no `feature_list.json` da Etapa 3.
