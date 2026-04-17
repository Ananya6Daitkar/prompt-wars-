import { motion, AnimatePresence } from 'framer-motion'
import { useLiveStore } from '../../engine/liveStore'

function densityColor(d: number) {
  if (d >= 80) return '#f43f5e'
  if (d >= 60) return '#f59e0b'
  if (d >= 35) return '#facc15'
  return '#00ff88'
}

export default function LiveMap() {
  const { gates, zones, recommendations } = useLiveStore()

  const gateRec = recommendations.find(r => r.type === 'gate')
  const exitRec = recommendations.find(r => r.type === 'exit')

  const bestGate = gates.find(g => g.label === gateRec?.value)
  const bestExitGate = gates.find(g => g.label === exitRec?.value)

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 400 340" style={{ width: '100%', display: 'block' }} aria-label="Live venue map">
        <defs>
          <radialGradient id="mapBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0d1b3e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050810" stopOpacity="1" />
          </radialGradient>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-soft">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Cyan gradient for route */}
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="exitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ── Background ── */}
        <ellipse cx="200" cy="170" rx="194" ry="162" fill="url(#mapBg)" stroke="rgba(0,217,255,0.08)" strokeWidth="1" />

        {/* ── Subtle grid inside map ── */}
        {[140, 170, 200, 230, 260].map(y => (
          <line key={`h${y}`} x1="20" y1={y} x2="380" y2={y} stroke="rgba(0,217,255,0.04)" strokeWidth="0.5" />
        ))}
        {[100, 150, 200, 250, 300].map(x => (
          <line key={`v${x}`} x1={x} y1="20" x2={x} y2="320" stroke="rgba(0,217,255,0.04)" strokeWidth="0.5" />
        ))}

        {/* ── Density zones ── */}
        {zones.map(z => {
          const color = densityColor(z.density)
          return (
            <motion.ellipse key={z.id}
              cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
              fill={color} fillOpacity="0.13"
              stroke={color} strokeWidth="1" strokeOpacity="0.28"
              animate={{ fillOpacity: [0.08, 0.17, 0.08] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )
        })}

        {/* ── Field ── */}
        <ellipse cx="200" cy="170" rx="74" ry="54" fill="#00ff88" fillOpacity="0.03" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.15" />
        <ellipse cx="200" cy="170" rx="46" ry="32" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />
        <line x1="200" y1="116" x2="200" y2="224" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.12" />
        <circle cx="200" cy="170" r="6" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.12" fill="none" />

        {/* ── Concourse rings ── */}
        {[0,1,2].map(i => (
          <ellipse key={i} cx="200" cy="170" rx={86+i*30} ry={64+i*22}
            stroke="#00d9ff" strokeWidth="0.4" strokeOpacity="0.06" fill="none" strokeDasharray="3 5" />
        ))}

        {/* ── Best gate route ── */}
        <AnimatePresence mode="wait">
          {bestGate && (
            <motion.path key={`route-${bestGate.id}`}
              d={`M ${bestGate.x} ${bestGate.y} Q ${(bestGate.x + 200) / 2} ${(bestGate.y + 170) / 2} 200 170`}
              stroke="url(#routeGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="9 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              filter="url(#glow-soft)"
            />
          )}
        </AnimatePresence>

        {/* ── Exit route ── */}
        <AnimatePresence mode="wait">
          {bestExitGate && (
            <motion.path key={`exit-${bestExitGate.id}`}
              d={`M 200 170 Q ${(200 + bestExitGate.x) / 2} ${(170 + bestExitGate.y) / 2} ${bestExitGate.x} ${bestExitGate.y}`}
              stroke="url(#exitGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeDasharray="6 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.25 }}
            />
          )}
        </AnimatePresence>

        {/* ── Gate nodes ── */}
        {gates.map(g => {
          const isBest = g.label === gateRec?.value
          const color = isBest ? '#00d9ff' : densityColor(g.occupancy)
          const r = isBest ? 7 : 4.5

          return (
            <g key={g.id}>
              {/* Pulse ring on best gate */}
              {isBest && (
                <>
                  <motion.circle cx={g.x} cy={g.y} r="16"
                    fill="#00d9ff" fillOpacity="0.06"
                    animate={{ r: [16, 24, 16], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle cx={g.x} cy={g.y} r="10"
                    fill="none" stroke="#00d9ff" strokeWidth="1" strokeOpacity="0.4"
                    animate={{ r: [10, 18, 10], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}
              <motion.circle cx={g.x} cy={g.y} r={r}
                fill={color} fillOpacity="0.22" stroke={color} strokeWidth={isBest ? 2 : 1.2}
                animate={{ r: [r, r + (isBest ? 1.5 : 0.8), r] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                filter={isBest ? 'url(#glow-soft)' : undefined}
              />
              <circle cx={g.x} cy={g.y} r={isBest ? 3.5 : 2} fill={color} />
              <text x={g.x} y={g.y - (isBest ? 14 : 10)} textAnchor="middle"
                fill={color} fontSize={isBest ? 10 : 8} fontFamily="Montserrat" fontWeight="800" opacity={isBest ? 1 : 0.55}>
                {g.shortLabel}
              </text>
              {/* Wait badge on best gate */}
              {isBest && (
                <g>
                  <rect x={g.x - 15} y={g.y + 9} width="30" height="14" rx="4" fill="#00d9ff" fillOpacity="0.12" stroke="#00d9ff" strokeWidth="0.8" strokeOpacity="0.5" />
                  <text x={g.x} y={g.y + 19} textAnchor="middle" fill="#00d9ff" fontSize="8" fontFamily="Montserrat" fontWeight="900">{g.waitTime}m</text>
                </g>
              )}
            </g>
          )
        })}

        {/* ── Seat marker ── */}
        <motion.circle cx={200} cy={170} r="7"
          fill="#a855f7" fillOpacity="0.25" stroke="#a855f7" strokeWidth="1.5"
          animate={{ r: [7, 10, 7], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          filter="url(#glow-soft)"
        />
        <circle cx={200} cy={170} r="3.5" fill="#a855f7" />
        <text x={200} y={157} textAnchor="middle" fill="#a855f7" fontSize="7.5" fontFamily="Montserrat" fontWeight="800" opacity="0.8" letterSpacing="0.05em">YOUR SEAT</text>

        {/* ── Service icons ── */}
        {[
          { x: 338, y: 108, icon: '🍔', c: '#f59e0b' },
          { x: 62,  y: 108, icon: '🍔', c: '#00ff88' },
          { x: 338, y: 232, icon: '🍔', c: '#00ff88' },
          { x: 200, y: 40,  icon: '🚻', c: '#f43f5e' },
          { x: 360, y: 170, icon: '🚻', c: '#00ff88' },
          { x: 40,  y: 170, icon: '🚻', c: '#00ff88' },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="12" fill="rgba(13,27,62,0.85)" stroke={p.c} strokeWidth="0.8" strokeOpacity="0.35" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10">{p.icon}</text>
          </g>
        ))}
      </svg>

      {/* LIVE badge */}
      <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,255,136,0.22)', borderRadius: 8, padding: '4px 11px' }}>
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 6px #00ff88' }} />
        <span style={{ color: '#00ff88', fontSize: 10, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.06em' }}>LIVE</span>
      </div>

      {/* Legend */}
      <div style={{ position: 'absolute', bottom: 8, left: 8, display: 'flex', gap: 10, background: 'rgba(10,14,26,0.7)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '4px 10px' }}>
        {[{ c: '#00ff88', l: 'Low' }, { c: '#facc15', l: 'Med' }, { c: '#f59e0b', l: 'High' }, { c: '#f43f5e', l: 'Critical' }].map(item => (
          <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.c }} />
            <span style={{ color: 'rgba(240,246,255,0.3)', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>{item.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
