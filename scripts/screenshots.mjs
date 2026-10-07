import { spawn } from 'node:child_process'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = resolve(ROOT, 'docs/images')

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 4173
const CDP_PORT = 9222
const BASE = `http://localhost:${PORT}`
const VIEWPORT = { width: 1440, height: 900 }

const SHOTS = [
  { name: 'home-hero', path: '/', full: false },
  { name: 'home-full', path: '/', full: true },
  { name: 'servicos', path: '/servicos', full: true },
  { name: 'cases', path: '/cases', full: true },
  { name: 'case-detail', path: '/cases/ottava', full: true },
  { name: 'sobre', path: '/sobre', full: true },
  { name: 'contato', path: '/contato', full: true },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url)
      if (r.ok) return
    } catch {
      /* not up yet */
    }
    await sleep(500)
  }
  throw new Error(`preview server não respondeu em ${url}`)
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.id = 0
    this.pending = new Map()
    this.handlers = []
  }
  async open() {
    await new Promise((res, rej) => {
      this.ws.onopen = res
      this.ws.onerror = () => rej(new Error('falha ao abrir WebSocket CDP'))
    })
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id && this.pending.has(msg.id)) {
        const { res, rej } = this.pending.get(msg.id)
        this.pending.delete(msg.id)
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result)
      } else if (msg.method) {
        for (const h of this.handlers) h(msg)
      }
    }
  }
  send(method, params = {}) {
    const id = ++this.id
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }
  once(method) {
    return new Promise((res) => {
      const h = (m) => {
        if (m.method === method) {
          this.handlers = this.handlers.filter((x) => x !== h)
          res(m.params)
        }
      }
      this.handlers.push(h)
    })
  }
  close() {
    try {
      this.ws.close()
    } catch {
      /* ignore */
    }
  }
}

async function capturePage(cdp, shot) {
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: VIEWPORT.width,
    height: VIEWPORT.height,
    deviceScaleFactor: 1,
    mobile: false,
  })

  const loaded = cdp.once('Page.loadEventFired')
  await cdp.send('Page.navigate', { url: BASE + shot.path })
  await Promise.race([loaded, sleep(10000)])
  await sleep(1500)

  await cdp.send('Runtime.evaluate', {
    expression: `(async () => {
      const h = document.body.scrollHeight
      for (let y = 0; y < h; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })()`,
    awaitPromise: true,
  })
  await sleep(1200)

  const params = { format: 'png', fromSurface: true }
  if (shot.full) {
    const { cssContentSize } = await cdp.send('Page.getLayoutMetrics')
    params.captureBeyondViewport = true
    params.clip = {
      x: 0,
      y: 0,
      width: VIEWPORT.width,
      height: Math.ceil(cssContentSize.height),
      scale: 1,
    }
  } else {
    await cdp.send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
    await sleep(300)
  }

  const { data } = await cdp.send('Page.captureScreenshot', params)
  const file = join(OUT, `${shot.name}.png`)
  await writeFile(file, Buffer.from(data, 'base64'))
  console.log(`  ✓ ${shot.name}.png`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const userDataDir = join(tmpdir(), `nexus-shots-${Date.now()}`)

  console.log('Subindo preview (vite preview)...')
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'ignore',
  })

  console.log('Abrindo Chrome headless...')
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--force-color-profile=srgb',
      `--remote-debugging-port=${CDP_PORT}`,
      '--remote-allow-origins=*',
      `--user-data-dir=${userDataDir}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  let cdp
  try {
    await waitForServer(BASE)

    // aguarda o endpoint CDP
    let target
    for (let i = 0; i < 40; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, {
          method: 'PUT',
        })
        if (res.ok) {
          target = await res.json()
          break
        }
      } catch {
        /* not up yet */
      }
      await sleep(500)
    }
    if (!target) throw new Error('não consegui criar target no Chrome')

    cdp = new CDP(target.webSocketDebuggerUrl)
    await cdp.open()
    await cdp.send('Page.enable')
    await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    })

    console.log('Capturando prints...')
    for (const shot of SHOTS) await capturePage(cdp, shot)
    console.log(`\nPronto: ${SHOTS.length} imagens em docs/images/`)
  } finally {
    cdp?.close()
    chrome.kill('SIGKILL')
    preview.kill('SIGKILL')
    await rm(userDataDir, { recursive: true, force: true }).catch(() => {})
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
