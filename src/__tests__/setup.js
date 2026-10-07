import { vi } from 'vitest'

window.scrollTo = () => {}

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

Element.prototype.scrollIntoView = () => {}

class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
    this.observed = []
  }

  observe(el) {
    this.observed.push(el)
    this.callback([{ isIntersecting: true, target: el, intersectionRatio: 1 }], this)
  }

  disconnect() {}
  unobserve() {}
  takeRecords() {
    return []
  }
}

globalThis.IntersectionObserver = IntersectionObserverMock