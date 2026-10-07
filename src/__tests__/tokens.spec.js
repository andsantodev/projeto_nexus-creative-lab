import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const read = (rel) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const tokensRaw = read('../styles/tokens.css')
const baseRaw = read('../assets/base.css')
const fontsRaw = read('../styles/fonts.css')
const mainRaw = read('../main.js')

const DESIGN_PALETTE = {
  '--color-bg': '#0b0c10',
  '--color-surface': '#1f2833',
  '--color-text': '#ffffff',
  '--color-text-muted': '#c5c6c7',
  '--color-accent': '#45a29e',
  '--color-accent-vibrant': '#66fcf1',
}

describe('F002 — Design tokens and global styles', () => {
  describe('paleta de cores de docs/DESIGN.md como variáveis CSS', () => {
    for (const [token, hex] of Object.entries(DESIGN_PALETTE)) {
      it(`define ${token} = ${hex}`, () => {
        expect(tokensRaw).toContain(`${token}: ${hex};`)
      })
    }

    it('aplica a cor de fundo e texto de forma global no body', () => {
      expect(baseRaw).toContain('background: var(--color-bg);')
      expect(baseRaw).toContain('color: var(--color-text);')
    })
  })

  describe('tipografia de docs/DESIGN.md carregada e aplicada', () => {
    it('carrega Plus Jakarta Sans e Inter (self-hosted, subseto latin)', () => {
      expect(fontsRaw).toContain("font-family: 'Inter Variable';")
      expect(fontsRaw).toContain("font-family: 'Plus Jakarta Sans Variable';")
      expect(fontsRaw).toContain('inter-latin-wght-normal.woff2')
      expect(fontsRaw).toContain('plus-jakarta-sans-latin-wght-normal.woff2')
      expect(fontsRaw).not.toContain('cyrillic')
    })

    it('expõe os tokens --font-display e --font-body', () => {
      expect(tokensRaw).toContain("--font-display: 'Plus Jakarta Sans Variable'")
      expect(tokensRaw).toContain("--font-body: 'Inter Variable'")
    })

    it('aplica --font-display aos headings e --font-body ao corpo globalmente', () => {
      const headings = baseRaw.match(/h1[\s\S]*?\{[\s\S]*?font-family: var\(--font-display\);/)
      expect(headings).toBeTruthy()
      const body = baseRaw.match(/body \{\s*[\s\S]*?font-family: var\(--font-body\);/)
      expect(body).toBeTruthy()
    })
  })

  describe('importação dos tokens na pipeline do app', () => {
    it('importa fonts, tokens.css e base.css em main.js', () => {
      expect(mainRaw).toContain("@/styles/fonts.css'")
      expect(mainRaw).toContain("@/styles/tokens.css'")
      expect(mainRaw).toContain("@/assets/base.css'")
    })
  })
})