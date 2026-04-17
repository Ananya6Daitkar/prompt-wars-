import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const zones = [
  { id: 'north', label: 'North Stand', x: 200, y: 55, rx: 82, ry: 28, density: 'high' as const, pct: 78 },
  { id: 'south', label: 'South Stand', x: 200, y: 285, rx: 82, ry: 28, density: 'moderate' as const, pct: 52 },
  { id: 'east', label: 'East Concourse', x: 342, y: 170, rx: 40, ry: 68, density: 'low' as const, pct: 28 },
  { id: 'west', label: 'West Concourse', x: 58, y: 170, rx: 40, ry: 68, density: 'moderate' as const, pct: 45 },
  { id: 'main', label: 'Main Concourse', x: 200, y: 170, rx: 68, ry: 48, density: 'high' as const, pct: 82 },
]

const routes = [
  { id: 'gate', d: 'M 58 170 Q 130 170 200 170', color: '#00d9ff', label: 'Best Gate → Seat' },
  { id: 'food', d: 'M 200 170 Q 271 130 342 100', color: '#00ff88', label: 'Seat → Food' },
  { id: 'exit', d: 'M 200 170 Q 200 228 200 285', color: '#b366ff', label: 'Exit Route' },
]

const densityColor = { low: '#00ff88', moderate: '#f59e0b', high: '#f43f5e', critical: '#f43f5e' }
const densityBadge = { low: { bg: 'rgba(0,255,136,0.1)', color: '#00ff88', border: 'rgba(0,255,136,0.25)' }, moderate: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.25)' }, high: { bg: 'rgba(244,63,94,0.1)', color: '#f43f5e', border: 'rgba(244,63,94,0.25)' }, critical: { bg: 'rgba(244,63,94,0.1)', color: '#f43f5e', border: 'rgba(244,63,94,0.25)' } }

export default function VenueMap() {
  const [activeRoute, setActiveRoute] = useState('gate')
  const [hoveredZone, setHoveredZone] = useState<string | null>(null)

  return (
    <section id="venue-map" style={{ padding: '96px 0', background: '#0a0e27', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-cyan" style={{ width: 500, height: 500, top: '50%', right: -100, transform: 'translateY(-50%)' }} />
        <div className="orb-violet" style={{ width: 400, height: 400, bottom: -100, left: -50 }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d9ff', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#00d9ff', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Smart Venue Map</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>The whole venue, at a glance</h2>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: 17, fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            Live density, animated routes, and active hotspots — all in one view.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, alignItems: 'start' }} className="map-grid">
          {/* Map */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: 'rgba(15,21,53,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(0,217,255,0.12)', borderRadius: 20, padding: 28, boxShadow: '0 4px 32px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color: '#f0f4ff' }}>Live Venue Intelligence</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#00ff88', fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>18,420 fans</span>
              </div>
            </div>

            <svg viewBox="0 0 400 340" style={{ width: '100%', maxHeight: 380 }} aria-label="Venue map">
              <ellipse cx="200" cy="170" rx="192" ry="158" fill="#0a0e27" stroke="#00d9ff" strokeWidth="1" strokeOpacity="0.12" />
              {zones.map(z => {
                const color = densityColor[z.density]
                const isHov = hoveredZone === z.id
                return (
                  <g key={z.id}>
                    <motion.ellipse cx={z.x} cy={z.y} rx={z.rx} ry={z.ry}
                      fill={color} fillOpacity={isHov ? 0.28 : 0.14}
                      stroke={color} strokeWidth={isHov ? 1.5 : 1} strokeOpacity={isHov ? 0.7 : 0.3}
                      animate={{ fillOpacity: [0.1, 0.18, 0.1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      onMouseEnter={() => setHoveredZone(z.id)}
                      onMouseLeave={() => setHoveredZone(null)}
                      style={{ cursor: 'pointer' }}
                    />
                    {isHov && (
                      <text x={z.x} y={z.y + 4} textAnchor="middle" fill={color} fontSize="9" fontFamily="Inter" fontWeight="700">
                        {z.label} — {z.pct}%
                      </text>
                    )}
                  </g>
                )
              })}
              <ellipse cx="200" cy="170" rx="72" ry="52" fill="#00ff88" fillOpacity="0.04" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.18" />
              <ellipse cx="200" cy="170" rx="42" ry="30" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.14" fill="none" />
              <line x1="200" y1="118" x2="200" y2="222" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.14" />
              {[0,1,2].map(i => (
                <ellipse key={i} cx="200" cy="170" rx={82+i*30} ry={60+i*22}
                  stroke="#00d9ff" strokeWidth="0.4" strokeOpacity="0.07" fill="none" strokeDasharray="3 4" />
              ))}
              {routes.map(r => (
                <AnimatePresence key={r.id}>
                  {activeRoute === r.id && (
                    <motion.path d={r.d} stroke={r.color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="8 5"
                      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>
              ))}
              {[
                { x: 200, y: 12, l: 'N' }, { x: 374, y: 170, l: 'E' },
                { x: 200, y: 328, l: 'S' }, { x: 26, y: 170, l: 'W' },
                { x: 322, y: 52, l: 'NE' }, { x: 78, y: 52, l: 'NW' },
              ].map((g, i) => (
                <g key={i}>
                  <motion.circle cx={g.x} cy={g.y} r="8" fill="#00d9ff" fillOpacity="0.08"
                    animate={{ r: [8,12,8], opacity: [0.4,0.8,0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <circle cx={g.x} cy={g.y} r="4" fill="#00d9ff" fillOpacity="0.25" stroke="#00d9ff" strokeWidth="1.5" />
                  <circle cx={g.x} cy={g.y} r="2" fill="#00d9ff" />
                  <text x={g.x} y={g.y - 12} textAnchor="middle" fill="#00d9ff" fontSize="8" fontFamily="Inter" opacity="0.7">{g.l}</text>
                </g>
              ))}
              {[{ x: 342, y: 100, icon: '🍔' }, { x: 58, y: 240, icon: '🚻' }, { x: 342, y: 240, icon: '🚻' }].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="13" fill="#1a2040" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11">{p.icon}</text>
                </g>
              ))}
            </svg>

            {/* Route selector */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' as const }}>
              {routes.map(r => (
                <button key={r.id} onClick={() => setActiveRoute(r.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9,
                    fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                    background: activeRoute === r.id ? `${r.color}15` : 'transparent',
                    border: activeRoute === r.id ? `1px solid ${r.color}50` : '1px solid rgba(255,255,255,0.08)',
                    color: activeRoute === r.id ? r.color : 'rgba(240,244,255,0.4)',
                  }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                  {r.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Side panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ background: 'rgba(15,21,53,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20 }}>
              <h4 style={{ color: '#f0f4ff', fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 16 }}>Zone Status</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {zones.map(z => {
                  const b = densityBadge[z.density]
                  return (
                    <div key={z.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ color: '#f0f4ff', fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{z.label}</div>
                        <div style={{ height: 3, width: 80, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginTop: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${z.pct}%`, background: densityColor[z.density], borderRadius: 99 }} />
                        </div>
                      </div>
                      <span style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}`, borderRadius: 7, padding: '3px 9px', fontSize: 11, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>
                        {z.pct}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ background: 'rgba(15,21,53,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 20 }}>
              <h4 style={{ color: '#f0f4ff', fontSize: 13, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 14 }}>Legend</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { c: '#00ff88', l: 'Low density', s: '< 34%' },
                  { c: '#f59e0b', l: 'Moderate', s: '34–66%' },
                  { c: '#f43f5e', l: 'High density', s: '67–84%' },
                  { c: '#00d9ff', l: 'Gate / Node', s: 'Entry point' },
                ].map(item => (
                  <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.c, flexShrink: 0 }} />
                    <span style={{ color: 'rgba(240,244,255,0.65)', fontSize: 12, fontFamily: 'Inter, sans-serif', flex: 1 }}>{item.l}</span>
                    <span style={{ color: 'rgba(240,244,255,0.25)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{item.s}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.18)', borderRadius: 16, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#00ff88', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>AI Recommendation</span>
              </div>
              <p style={{ color: 'rgba(240,244,255,0.65)', fontSize: 13, fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                Gate W has the shortest queue. Fastest route via West Concourse — estimated 4 min to seat.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .map-grid { grid-template-columns: 1fr !important; } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
      `}</style>
    </section>
  )
}
