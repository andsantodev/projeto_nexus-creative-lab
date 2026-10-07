export const CASE_CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'branding', label: 'Branding' },
  { id: 'web', label: 'Web' },
  { id: 'growth', label: 'Growth' },
]

export const CASES = [
  {
    id: 'ottava',
    client: 'Ottava',
    category: 'branding',
    featured: true,
    title: 'Identidade e posicionamento que tiraram o banco da homogeneidade.',
    cover: 'https://picsum.photos/seed/nexus-ottava/1400/760',
    metric: { value: '+3,8x', label: 'reconhecimento de marca' },
    challenge:
      'Ottava disputava um setor onde a percepção decide tudo: bancos pareciam iguais, e a marca não trazia diferenciação nem confiança para quem a conhecia.',
    solution:
      'Refizemos o posicionamento a partir de dados de mercado e de audiência, e reconstruímos a identidade — nome na mente, arquétipo, sistema visual e narrativa alinhados.',
    result:
      'A marca saiu da homogeneidade, com reconhecimento medido após o lançamento e uma comunicação que passou a converter a primeira impressão em credibilidade.',
  },
  {
    id: 'kite',
    client: 'Kite',
    category: 'web',
    featured: true,
    title: 'Produto digital reconstruído do zero para converter melhor.',
    cover: 'https://picsum.photos/seed/nexus-kite/1400/900',
    metric: { value: '+42%', label: 'de conversão na jornada' },
    challenge:
      'Kite tinha produto sólido e onboarding frágil: usuários se perdiam nas etapas e o valor do produto aparecia tarde demais.',
    solution:
      'Redesenhamos o produto digital — arquitetura da informação, design system e fluxos de onboarding — testando cada etapa com usuários reais.',
    result:
      'A jornada ficou mais curta e mais clara, com conversão maior entre as etapas e retenção no primeiro uso.',
  },
  {
    id: 'nordka',
    client: 'Nordka',
    category: 'growth',
    featured: true,
    title: 'Operação de growth do zero ao primeiro R$ com custo caindo.',
    cover: 'https://picsum.photos/seed/nexus-nordka/1400/760',
    metric: { value: '-31%', label: 'de CAC em 6 meses' },
    challenge:
      'Nordka começava do zero em aquisição: sem dados históricos, sem canais validados e com verba limitada para testar.',
    solution:
      'Montamos a operação de growth — funil, experimentação e mix de canais — com hipóteses priorizadas e leitura semanal de resultados.',
    result:
      'Primeiro R$ entrou com custo controlado, e o CAC caiu mês a mês à medida que o modelo de aquisição amadureceu.',
  },
  {
    id: 'ambara',
    client: 'Ambar',
    category: 'branding',
    featured: false,
    title: 'Rebrand que sustentou a expansão nacional da marca.',
    cover: 'https://picsum.photos/seed/nexus-ambara/1400/760',
    metric: { value: '+71%', label: 'de afinidade com a marca' },
    challenge:
      'Ambar crescia em regiões diferentes e a marca rachava: cada praça falava uma linguagem, e a expansão estava perdendo consistência.',
    solution:
      'Unificamos posicionamento e identidade num manual vivo, com sistema flexível que adapta a marca a cada contexto sem perder consistência.',
    result:
      'A marca passou a ser percebida como uma só — com afinidade maior e a base pronta para crescer.',
  },
  {
    id: 'volta',
    client: 'Volta',
    category: 'growth',
    featured: false,
    title: 'Funil de aquisição que multiplicou os trials qualificados.',
    cover: 'https://picsum.photos/seed/nexus-volta/1400/760',
    metric: { value: '2,4x', label: 'mais trials qualificados' },
    challenge:
      'Volta gerava volume de cadastro, mas qualidade baixa: trials não viravam clientes pagantes e a equipe de vendas perdia tempo.',
    solution:
      'Requalificamos o funil — segmentação, conteúdo por estágio e critérios de qualificação — com experimentos contínuos de captura.',
    result:
      'Menos cadastro e mais conversão: trials qualificados subiram e o ciclo comercial ficou mais produtivo.',
  },
  {
    id: 'lumen',
    client: 'Lumen',
    category: 'web',
    featured: false,
    title: 'Plataforma de saúde que simplificou o acesso aos pacientes.',
    cover: 'https://picsum.photos/seed/nexus-lumen/1400/900',
    metric: { value: '+58%', label: 'de ativação no app' },
    challenge:
      'Lumen tinha uma plataforma de saúde rica em telas e pobre em fluxo: pacientes abandonavam antes de usar o serviço central.',
    solution:
      'Redesenhamos a experiência mobile — jornadas-chave, navegação e clareza do primeiro uso — com foco em acessibilidade.',
    result:
      'A ativação disparou e a equipe de produto passou a medir o uso real de cada tela.',
  },
]

export const FEATURED_CASES = CASES.filter((c) => c.featured)

export function caseCategoryLabel(id) {
  return CASE_CATEGORIES.find((c) => c.id === id)?.label ?? id
}