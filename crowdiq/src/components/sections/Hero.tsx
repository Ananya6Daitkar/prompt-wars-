import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const CyberStadia = lazy(() => import('../3d/CyberStadia'))

function StadiumFallback() {
  return (
    <div style={{ width: '100%', height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(0,217,255,0.15)', position: 'absolute' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(168,85,247,0.2)', position: 'absolute' }} />
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,217,255,0.4) 0%, transparent 70%)' }} />
      </div>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const handler = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      setOffset({
        x: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 16,
        y: ((e.clientY - rect.top - rect.height / 2) / rect.height) * 8,
      })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [shouldReduce])

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={containerRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--c-obsidian)', paddingTop: 64 }}>

      {/* ── Background layers ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Orbs */}
        <div className="orb-cyan" style={{ width: 800, height: 800, top: -200, left: -100 }} />
        <div className="orb-violet" style={{ width: 600, height: 600, bottom: -100, right: -50 }} />
        <div className="orb-emerald" style={{ width: 300, height: 300, top: '60%', left: '40%' }} />
        {/* Dot grid */}
        <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        {/* Scanlines */}
        <div className="scanline" />
        {/* Radial vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, var(--c-obsidian) 100%)' }} />
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 32px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', position: 'relative', zIndex: 2 }}
        className="hero-grid">

        {/* ── Left: Copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={shouldReduce ? {} : { transform: `translate(${-offset.x * 0.2}px, ${-offset.y * 0.2}px)`, transition: 'transform 0.12s ease-out' }}
        >
          {/* Live pill */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,217,255,0.07)', border: '1px solid rgba(0,217,255,0.22)', borderRadius: 999, padding: '7px 18px', marginBottom: 32 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d9ff', display: 'inline-block' }} />
            <span style={{ color: '#00d9ff', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Live Venue Intelligence</span>
          </motion.div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(42px, 5.5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: 24, color: 'var(--c-white)' }}>
            Every fan.{' '}
            <span className="text-grad-cyan">Every second.</span>
            <br />Optimized.
          </h1>

          <p style={{ color: 'rgba(240,246,255,0.55)', fontSize: 18, lineHeight: 1.75, marginBottom: 40, maxWidth: 480, fontFamily: 'Inter, sans-serif' }}>
            CrowdIQ gives every fan the best next move in real time — routing, queues, exits, and crowd intelligence in one living system.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#demo')}
              style={{
                background: 'var(--c-cyan)', color: 'var(--c-obsidian)',
                border: 'none', borderRadius: 12, padding: '15px 32px',
                fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat, sans-serif',
                cursor: 'pointer', letterSpacing: '-0.01em',
                boxShadow: '0 0 32px rgba(0,217,255,0.45), 0 4px 20px rgba(0,0,0,0.4)',
              }}>
              Launch Live Demo
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, background: 'rgba(0,217,255,0.07)' }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#fan-journey')}
              style={{
                background: 'transparent', color: 'var(--c-cyan)',
                border: '1.5px solid rgba(0,217,255,0.35)',
                borderRadius: 12, padding: '15px 32px',
                fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat, sans-serif',
                cursor: 'pointer', letterSpacing: '-0.01em',
              }}>
              See Fan Journey
            </motion.button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 36, marginTop: 44, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { v: '47%', l: 'Faster Entry', c: '#00d9ff' },
              { v: '3.2min', l: 'Wait Reduction', c: '#a855f7' },
              { v: '94%', l: 'Fan Satisfaction', c: '#00ff88' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ color: s.c, fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: '-0.03em' }}>{s.v}</div>
                <div style={{ color: 'rgba(240,246,255,0.3)', fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 3, letterSpacing: '0.02em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: 3D Stadium ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'relative',
            ...(shouldReduce ? {} : { transform: `translate(${offset.x * 0.4}px, ${offset.y * 0.4}px)`, transition: 'transform 0.12s ease-out' }),
          }}
        >
          {/* Glow behind canvas */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,217,255,0.12) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)', pointerEvents: 'none' }} />

          <Suspense fallback={<StadiumFallback />}>
            <CyberStadia height={520} interactive={false} />
          </Suspense>

          {/* Floating chips */}
          {[
            { top: '10%', right: '5%', delay: 0.5, color: '#00d9ff', border: 'rgba(0,217,255,0.25)', label: 'Gate C', sub: '8 min wait' },
            { bottom: '15%', left: '2%', delay: 1.5, color: '#00ff88', border: 'rgba(0,255,136,0.25)', label: 'West Exit', sub: 'Clear — 3 min' },
            { top: '50%', right: '0%', delay: 1, color: '#a855f7', border: 'rgba(168,85,247,0.25)', label: '18,420', sub: 'fans live' },
          ].map((chip, i) => (
            <motion.div key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
              style={{
                position: 'absolute', top: chip.top, bottom: chip.bottom,
                right: chip.right, left: chip.left,
                background: 'rgba(13,27,62,0.85)', backdropFilter: 'blur(16px)',
                border: `1px solid ${chip.border}`, borderRadius: 12,
                padding: '9px 14px', zIndex: 10,
                boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 12px ${chip.border}`,
              }}>
              <div style={{ color: chip.color, fontSize: 13, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.01em' }}>{chip.label}</div>
              <div style={{ color: 'rgba(240,246,255,0.45)', fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{chip.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'rgba(240,246,255,0.18)', zIndex: 2 }}>
        <span style={{ fontSize: 10, fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <style>{`
        @media (max-width: 960px) { .hero-grid { grid-template-columns: 1fr !important; padding: 40px 20px !important; } }
      `}</style>
    </section>
  )
}
