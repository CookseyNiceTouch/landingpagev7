import { useRef, useEffect, useCallback, type ReactElement } from 'react'
import { CABLES, type CableConfig } from '@/data/cables'

// ── Tuneable constants ──────────────────────────────────────────────────────

const DESKTOP_MQ = '(min-width: 1024px)'
const SAMPLE_COUNT = 50
const PUSH_RADIUS = 160
const PUSH_DISTANCE = 55
const SPRING_FACTOR = 0.12
const DRAW_DURATION_MS = 2000
const ENDPOINT_FADE = 10
const PIN_COUNT = 3

// ── Geometry helpers ────────────────────────────────────────────────────────

interface Vec2 {
  x: number
  y: number
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function evalCatmullRom(points: Vec2[], t: number): Vec2 {
  const n = points.length
  const segs = n - 1
  const st = Math.max(0, Math.min(1, t)) * segs
  const seg = Math.min(Math.floor(st), segs - 1)
  const lt = st - seg

  const p0 = points[Math.max(seg - 1, 0)]
  const p1 = points[seg]
  const p2 = points[seg + 1]
  const p3 = points[Math.min(seg + 2, n - 1)]

  const lt2 = lt * lt
  const lt3 = lt2 * lt
  return {
    x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * lt + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * lt2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * lt3),
    y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * lt + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * lt2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * lt3),
  }
}

function sampleSpline(waypoints: Vec2[], count: number): Vec2[] {
  const pts: Vec2[] = []
  for (let i = 0; i <= count; i++) {
    pts.push(evalCatmullRom(waypoints, i / count))
  }
  return pts
}

function catmullRomToPath(points: Vec2[]): string {
  if (points.length < 2) return ''
  const n = points.length
  let d = `M ${points[0].x},${points[0].y}`

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(i + 2, n - 1)]

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
  }
  return d
}

function dist(a: Vec2, b: Vec2): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy)
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// ── Per-cable runtime state ─────────────────────────────────────────────────

interface CableState {
  config: CableConfig
  baseSamples: Vec2[]
  displaced: Vec2[]
  restPath: string
  currentPath: string
  drawn: boolean
  totalLength: number
  dashOffset: number
}

// ── Component ───────────────────────────────────────────────────────────────

export default function CableLayer(): ReactElement | null {
  const svgRef = useRef<SVGSVGElement>(null)
  const statesRef = useRef<CableState[]>([])
  const mouseRef = useRef<Vec2>({ x: -9999, y: -9999 })
  const isDesktopRef = useRef(true)
  const animatingRef = useRef(false)
  const rafIdRef = useRef(0)
  const drawnSetRef = useRef<Set<string>>(new Set())
  const pathRefsRef = useRef<Map<string, SVGPathElement>>(new Map())

  // ── Resolve anchor element positions ──────────────────────────────────

  const getPort = useCallback((anchor: string, ax: number, ay: number): Vec2 | null => {
    const el = document.querySelector(`[data-cable-anchor="${anchor}"]`)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width * ax, y: r.top + r.height * ay }
  }, [])

  // ── Build waypoints that guarantee vertical tangents ──────────────────
  //
  // 5 waypoints:
  //   [0] from              – the port on the source image
  //   [1] (from.x, from.y + drop) – straight down → vertical exit
  //   [2] (midX + sweep, midY)    – the apex of the sweep
  //   [3] (to.x, to.y - drop)     – straight up → vertical entry
  //   [4] to                – the port on the target image

  const buildWaypoints = useCallback(
    (cfg: CableConfig): Vec2[] | null => {
      const from = getPort(cfg.from.anchor, cfg.from.x, cfg.from.y)
      const to = getPort(cfg.to.anchor, cfg.to.x, cfg.to.y)
      if (!from || !to) return null
      const dy = Math.abs(to.y - from.y)
      const drop = Math.min(cfg.tension, dy * 0.35)
      const midY = (from.y + to.y) / 2
      const midX = (from.x + to.x) / 2
      return [
        from,
        { x: from.x, y: from.y + drop },
        { x: midX + cfg.sweep, y: midY },
        { x: to.x, y: to.y - drop },
        to,
      ]
    },
    [getPort],
  )

  // ── Recompute all cable base paths ────────────────────────────────────

  const recompute = useCallback(() => {
    const states: CableState[] = []
    for (const cfg of CABLES) {
      const wp = buildWaypoints(cfg)
      if (!wp) continue
      const samples = sampleSpline(wp, SAMPLE_COUNT)
      const path = catmullRomToPath(samples)
      const prev = statesRef.current.find((s) => s.config.id === cfg.id)
      states.push({
        config: cfg,
        baseSamples: samples,
        displaced: prev ? prev.displaced : samples.map((p) => ({ ...p })),
        restPath: path,
        currentPath: prev ? prev.currentPath : path,
        drawn: prev ? prev.drawn : false,
        totalLength: 0,
        dashOffset: prev?.dashOffset ?? 1,
      })
    }
    statesRef.current = states

    for (const st of states) {
      const el = pathRefsRef.current.get(st.config.id)
      if (el) {
        el.setAttribute('d', st.restPath)
        st.totalLength = el.getTotalLength()
        if (!st.drawn) st.dashOffset = st.totalLength
      }
    }
  }, [buildWaypoints])

  // ── Mouse displacement + spring-back animation loop ───────────────────

  const animate = useCallback(() => {
    const states = statesRef.current
    if (!states.length) return

    let anyDisplaced = false
    const mouse = mouseRef.current

    for (const st of states) {
      const { baseSamples, displaced } = st
      let changed = false

      // Find closest sample for push direction
      let closestIdx = -1
      let closestDist = Infinity
      for (let i = 0; i <= SAMPLE_COUNT; i++) {
        const d = dist(mouse, baseSamples[i])
        if (d < closestDist) {
          closestDist = d
          closestIdx = i
        }
      }

      // Tangent from neighboring base samples
      let pushNx = 0
      let pushNy = 0
      let pushSide = 1
      if (closestIdx >= 0 && closestDist < PUSH_RADIUS) {
        const prev = baseSamples[Math.max(closestIdx - 1, 0)]
        const next = baseSamples[Math.min(closestIdx + 1, SAMPLE_COUNT)]
        const tx = next.x - prev.x
        const ty = next.y - prev.y
        const tLen = Math.sqrt(tx * tx + ty * ty) || 1
        pushNx = -ty / tLen
        pushNy = tx / tLen
        const dx = baseSamples[closestIdx].x - mouse.x
        const dy = baseSamples[closestIdx].y - mouse.y
        pushSide = dx * pushNx + dy * pushNy > 0 ? 1 : -1
      }

      for (let i = 0; i <= SAMPLE_COUNT; i++) {
        const base = baseSamples[i]
        const cur = displaced[i]
        let targetX = base.x
        let targetY = base.y

        if (closestDist < PUSH_RADIUS) {
          const d = dist(mouse, base)
          const ratio = Math.min(d / PUSH_RADIUS, 1)
          const proximity = (1 - ratio * ratio) * (1 - ratio * ratio)

          const edgeDist = Math.min(i, SAMPLE_COUNT - i)
          const endFade = smoothstep(0, ENDPOINT_FADE, edgeDist)

          const strength = proximity * endFade * PUSH_DISTANCE
          if (strength > 0.01) {
            targetX = base.x + pushNx * strength * pushSide
          }
        }

        const newX = lerp(cur.x, targetX, SPRING_FACTOR)
        const newY = lerp(cur.y, targetY, SPRING_FACTOR)

        if (Math.abs(newX - cur.x) > 0.1 || Math.abs(newY - cur.y) > 0.1) {
          changed = true
        }
        if (Math.abs(newX - base.x) > 0.5 || Math.abs(newY - base.y) > 0.5) {
          anyDisplaced = true
        }

        displaced[i] = { x: newX, y: newY }
      }

      // Hard-pin endpoints so the cable never shortens or breaks tangent
      for (let k = 0; k < PIN_COUNT; k++) {
        displaced[k] = { ...baseSamples[k] }
        displaced[SAMPLE_COUNT - k] = { ...baseSamples[SAMPLE_COUNT - k] }
      }
      changed = true

      if (changed) {
        st.currentPath = catmullRomToPath(displaced)
      }
    }

    renderPaths()

    if (anyDisplaced) {
      rafIdRef.current = requestAnimationFrame(animate)
    } else {
      animatingRef.current = false
    }
  }, [])

  const ensureAnimating = useCallback(() => {
    if (!animatingRef.current) {
      animatingRef.current = true
      rafIdRef.current = requestAnimationFrame(animate)
    }
  }, [animate])

  // ── Render current paths into SVG DOM ─────────────────────────────────

  const renderPaths = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return
    const states = statesRef.current

    while (svg.childNodes.length > states.length) {
      svg.removeChild(svg.lastChild!)
    }

    for (let i = 0; i < states.length; i++) {
      const st = states[i]
      let g: SVGGElement

      if (i < svg.childNodes.length) {
        g = svg.childNodes[i] as SVGGElement
      } else {
        g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        for (let j = 0; j < 3; j++) {
          const p = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          p.setAttribute('fill', 'none')
          p.setAttribute('stroke-linecap', 'round')
          p.setAttribute('stroke-linejoin', 'round')
          g.appendChild(p)
        }
        svg.appendChild(g)
      }

      const paths = g.childNodes as NodeListOf<SVGPathElement>
      const { style } = st.config
      const d = st.currentPath

      if (!pathRefsRef.current.has(st.config.id)) {
        pathRefsRef.current.set(st.config.id, paths[1])
      }

      paths[0].setAttribute('d', d)
      paths[0].setAttribute('stroke', style.shadowColor)
      paths[0].setAttribute('stroke-width', String(style.width + 4))

      paths[1].setAttribute('d', d)
      paths[1].setAttribute('stroke', style.color)
      paths[1].setAttribute('stroke-width', String(style.width))

      paths[2].setAttribute('d', d)
      paths[2].setAttribute('stroke', style.highlightColor)
      paths[2].setAttribute('stroke-width', String(style.width * 0.3))
      paths[2].setAttribute('stroke-opacity', '0.55')

      if (st.totalLength > 0) {
        const offset = st.dashOffset
        for (const p of Array.from(paths)) {
          p.setAttribute('stroke-dasharray', String(st.totalLength))
          p.setAttribute('stroke-dashoffset', String(offset))
        }
      }
    }
  }, [])

  // ── Draw-in animation (triggered by IntersectionObserver) ─────────────

  const triggerDrawIn = useCallback(
    (cableId: string) => {
      const initial = statesRef.current.find((s) => s.config.id === cableId)
      if (!initial || initial.drawn) return
      initial.drawn = true
      drawnSetRef.current.add(cableId)

      const startOffset = initial.totalLength
      const start = performance.now()

      const step = (now: number) => {
        // Always look up the CURRENT state — recompute() replaces objects on scroll
        const st = statesRef.current.find((s) => s.config.id === cableId)
        if (!st) return

        const elapsed = now - start
        const progress = Math.min(1, elapsed / DRAW_DURATION_MS)
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2

        st.dashOffset = startOffset * (1 - eased)
        renderPaths()
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    },
    [renderPaths],
  )

  // ── Setup: observers, event listeners ─────────────────────────────────

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const handleMq = (e: MediaQueryListEvent | MediaQueryList) => {
      isDesktopRef.current = e.matches
      if (svgRef.current) {
        svgRef.current.style.display = e.matches ? '' : 'none'
      }
    }
    handleMq(mq)
    mq.addEventListener('change', handleMq)

    recompute()
    renderPaths()

    for (const st of statesRef.current) {
      const el = pathRefsRef.current.get(st.config.id)
      if (el) {
        st.totalLength = el.getTotalLength()
        if (!st.drawn) st.dashOffset = st.totalLength
      }
    }
    renderPaths()

    // Trigger draw-in when the "from" anchor's centre scrolls above
    // 45% from the top of the viewport (= 55% from the bottom).
    const checkTriggers = () => {
      if (!isDesktopRef.current) return
      const trigger = window.innerHeight * 0.45
      for (const cfg of CABLES) {
        if (drawnSetRef.current.has(cfg.id)) continue
        const el = document.querySelector(`[data-cable-anchor="${cfg.from.anchor}"]`)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const centerY = r.top + r.height / 2
        if (centerY < trigger) triggerDrawIn(cfg.id)
      }
    }

    const onLayout = () => {
      if (!isDesktopRef.current) return
      recompute()
      const states = statesRef.current
      for (const st of states) {
        for (let i = 0; i <= SAMPLE_COUNT; i++) {
          st.displaced[i] = { ...st.baseSamples[i] }
        }
        st.currentPath = st.restPath
      }
      renderPaths()
      checkTriggers()
    }
    window.addEventListener('scroll', onLayout, { passive: true })
    window.addEventListener('resize', onLayout, { passive: true })

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (isDesktopRef.current) ensureAnimating()
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Defer the initial check one frame so getTotalLength() returns real values
    const initRaf = requestAnimationFrame(checkTriggers)

    return () => {
      mq.removeEventListener('change', handleMq)
      window.removeEventListener('scroll', onLayout)
      window.removeEventListener('resize', onLayout)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(initRaf)
      cancelAnimationFrame(rafIdRef.current)
    }
  }, [recompute, renderPaths, ensureAnimating, triggerDrawIn])

  return (
    <svg
      ref={svgRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none',
        filter: 'url(#crt-glow)',
      }}
    />
  )
}
