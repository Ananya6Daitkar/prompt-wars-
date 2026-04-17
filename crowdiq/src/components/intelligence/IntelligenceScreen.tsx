import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLiveStore } from '../../engine/liveStore'
import type { Mode } from '../../engine/types'
import LiveMap from './LiveMap'
import RecommendationCard from './RecommendationCard'
import NotificationToast from './NotificationToast'

const MODES: { id: Mode; label: string; desc: string; color: string; glow: string }[] = [
  { id: 'normal', label: 'Normal',     desc: 'Standard flow',   color: '#00d9ff', glow: 'rgba(0,217,255,0.2)' },
  { id: 'peak',   label: 'Peak Crowd', desc: '18,420 fans',     color: '#f59e0b', glow: 'rgba(245,158,11,0.2)' },
  { id: 'exit',   label: 'Exit Rush',  desc: 'Post-event',      color: '#f43f5e', glow: 'rgba(244,63,94,0.2)' },
]

function LiveTicker() {
  const { gates, queues, tick } = useLiveStore()
  const bestGate = [...gates].sort((a, b) => a.waitTime - b.waitTime)[0]
  const bestFood = [...queues].filter(q => q.type === 'food').sort((a, b) => a.waitTime - b.waitTime)[0]
  const avgWait = Math.round(gates.reduce((s, g) => s + g.waitTime, 0) / gates.length)

  const items = [
    { label: 'Best Gate', value: `${bestGate?.shortLabel} — ${bestGate?.waitTime}m`, color: '#00d9ff' },
    { label: 'Avg Wait', value: `${avgWait}m`, color: avgWait > 20 ? '#f59e0b' : '#00ff88' },
    { label: 'Shortest Food', value: `${bestFood?.waitTime}m`, color: '#f59e0b' },
    { label: 'System Tick', value: `#${tick}`, color: 'rgba(240,246,255,0.2)' },
  ]

  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' as const }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ color: 'rgba(240,246,255,0.28)', fontSize: 10, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{item.label}</span>
          <motion.span key={`${item.label}-${item.value}`}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: item.color, fontSize: 13, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.01em' }}>
            {item.value}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

function GateStatusBar() {
  const { gates } = useLiveStore()
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, alignItems: 'flex-end' }}>
      {gates.map(g => {
        const color = g.occupancy >= 80 ? '#f43f5e' : g.occupancy >= 60 ? '#f59e0b' : '#00ff88'
        const trendIcon = g.trend === 'rising' ? '↑' : g.trend === 'falling' ? '↓' : '→'
        return (
          <div key={g.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 32, height: 48, background: 'rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', border: '1px solid rgba(255,255,255,0.05)' }}>
              <motion.div
                animate={{ height: `${g.occupancy}%` }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                style={{ background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`, width: '100%', borderRadius: '4px 4px 0 0', boxShadow: `0 0 8px ${color}60` }}
              />
            </div>
            <span style={{ color: 'rgba(240,246,255,0.35)', fontSize: 9, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{g.shortLabel}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ color, fontSize: 8, fontWeight: 700 }}>{trendIcon}</span>
              <span style={{ color, fontSize: 10, fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>{g.waitTime}m</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function IntelligenceScreen() {
  const { mode, setMode, startTicking, stopTicking, recommendations, fansRedirected } = useLiveStore()

  useEffect(() => {
    startTicking()
    return () => stopTicking()
  }, [])

  const activeMode = MODES.find(m => m.id === mode)!

  return (
    <section id="demo" style={{ minHeight: '100vh', background: 'var(--c-obsidian)', padding: '88px 0 56px', position: 'relative', overflow: 'hidden' }}>

      {/* ── Background ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-cyan" style={{ width: 700, height: 700, top: -200, left: '5%' }} />
        <div className="orb-violet" style={{ width: 500, height: 500, bottom: -100, right: '5%' }} />
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div className="scanline" style={{ opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 30%, transparent 40%, var(--c-obsidian) 100%)' }} />
      </div>

      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap' as const, gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 8px #00ff88' }} />
              <span style={{ color: '#00ff88', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.09em' }}>Live Intelligence</span>
              <AnimatePresence>
                {fansRedirected > 0 && (
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 7, padding: '2px 10px', fontSize: 10, color: '#00ff88', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                    {fansRedirected.toLocaleString()} fans redirected
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--c-white)', lineHeight: 1.1 }}>
              CrowdIQ{' '}
              <span className="text-grad-cyan">Intelligence Engine</span>
            </h2>
          </div>

          {/* Mode toggle */}
          <div style={{ display: 'flex', gap: 5, background: 'rgba(13,27,62,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 5 }}>
            {MODES.map(m => (
              <motion.button key={m.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setMode(m.id)}
                style={{
                  padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 800,
                  fontFamily: 'Montserrat, sans-serif', cursor: 'pointer',
                  background: mode === m.id ? `${m.color}14` : 'transparent',
                  border: mode === m.id ? `1px solid ${m.color}45` : '1px solid transparent',
                  color: mode === m.id ? m.color : 'rgba(240,246,255,0.35)',
                  boxShadow: mode === m.id ? `0 0 20px ${m.glow}` : 'none',
                  transition: 'all 0.2s',
                }}>
                {m.label}
                <div style={{ fontSize: 9, fontWeight: 400, opacity: 0.55, marginTop: 1, fontFamily: 'Inter, sans-serif' }}>{m.desc}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Live ticker bar ── */}
        <div style={{ background: 'rgba(13,27,62,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '11px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 12 }}>
          <LiveTicker />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: activeMode.color, display: 'inline-block' }} />
            <span style={{ color: 'rgba(240,246,255,0.2)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>Updates every 4s</span>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 20, alignItems: 'start' }} className="intel-grid">

          {/* LEFT — Map + gate bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
              style={{ background: 'rgba(13,27,62,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,217,255,0.14)', borderRadius: 20, padding: 24, boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', color: 'var(--c-white)', letterSpacing: '-0.02em' }}>Smart Venue Map</h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 7, padding: '3px 10px', fontSize: 10, color: '#00d9ff', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>— Best Gate</span>
                  <span style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 7, padding: '3px 10px', fontSize: 10, color: '#a855f7', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>— Exit Route</span>
                </div>
              </div>
              <LiveMap />
            </motion.div>

            {/* Gate status */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              style={{ background: 'rgba(13,27,62,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '18px 22px', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ color: 'rgba(240,246,255,0.4)', fontSize: 10, fontWeight: 700, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Gate Occupancy — Live</span>
                <span style={{ color: 'rgba(240,246,255,0.18)', fontSize: 10, fontFamily: 'Inter, sans-serif' }}>↑ rising · ↓ falling · → stable</span>
              </div>
              <GateStatusBar />
            </motion.div>
          </div>

          {/* RIGHT — Recommendations */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', color: 'var(--c-white)', letterSpacing: '-0.02em' }}>AI Recommendations</h3>
              <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ color: '#00d9ff', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
                Updating live ●
              </motion.span>
            </div>

            <AnimatePresence mode="popLayout">
              {recommendations.map(rec => (
                <RecommendationCard key={rec.id} rec={rec} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <NotificationToast />

      <style>{`
        @media (max-width: 1024px) { .intel-grid { grid-template-columns: 1fr !important; } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.35} }
      `}</style>
    </section>
  )
}
