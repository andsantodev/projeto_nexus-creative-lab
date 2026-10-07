# Session Handoff

**Estado atual:** ✅ **Roadmap completo (F001 a F014) + rodada de correções de layout/navegação aplicadas.**

Site institucional NEXUS Creative Lab (MVP) navegável: 5 páginas do sitemap + rota de case study (`/cases/:id`) + 404. Home com as 7 seções, páginas Serviços/Cases/Sobre/Contato ricas.

**Última rodada:** Revisão de bugs — navegação via `<Transition out-in>` (raiz única em `HomeView`/`CaseDetailView`), empilhamento dos cases da Home em mobile/tablet (`HomeCases` spans só em ≥1024px), cover de case detail em proporção natural (`height: auto`, sem 21:9/object-fit morto), e fotos reais do time em `src/data/about.js` (randomuser.me).

**Próxima feature sugerida:** nenhuma (todas `done`) — conferência manual visual dos ajustes em navegador real.

**Bloqueios conhecidos:** nenhum funcional.

**Pendências (não-bloqueantes, sugestões):**
- Conferência visual em navegador real (mobile/tablet) para validar o empilhamento dos cases e o aspect do case detail (jsdom não renderiza layout CSS).
- Configurar ESLint (`npm run lint` marcado `# confirm` até ser validado).
- Opcional: reduzir bundle de ícones Phosphor (imports por componente em vez do pacote inteiro).

**Comandos validados neste repositório:**
- `npm install` — OK
- `npm run test:unit` — OK (Vitest, **81/81**)
- `npm run build` — OK
- `npm run dev` — OK
- `npm run lint` — pendente (ESLint não configurado)