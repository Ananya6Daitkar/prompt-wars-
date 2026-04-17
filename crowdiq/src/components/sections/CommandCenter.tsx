import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDemoStore } from '../../store/demoStore'

const card: React.CSSProperties = {
  background: 'rgba(15,21,53,0.7)', backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16,
  padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
}

function GateThroughput() {
  const { venueState } = useDemoStore()
  const max = Math.max(...venueState.gates.map(g => g.queueLength), 1)
  return (
    <div style={{ ...card, borderColor: 'rgba(0,217,255,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h4 style={{ color: '#f0f4ff', fontSize: 14, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Gate Throughput</h4>
        <span style={{ background: 'rgba(0,217,255,0.1)', color: '#00d9ff', border: '1px solid rgba(0,217,255,0.25)', borderRadius: 7, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>Live</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {venueState.gates.slice(0, 6).map((gate, i) => {
          const pct = gate.queueLength / max
          const color = pct > 0.7 ? '#f43f5e' : pct > 0.4 ? '#f59e0b' : '#00ff88'
          return (
            <div key={gate.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'rgba(240,244,255,0.35)', fontSize: 11, fontFamily: 'Inter, sans-serif', width: 20, flexShrink: 0 }}>{gate.name.split('—')[0].trim()}</span>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  style={{ height: '100%', background: color, borderRadius: 99 }} />
              </div>
              <span style={{ color: 'rgba(240,244,255,0.4)', fontSize: 11, fontFamily: 'Montserrat, sans-serif', fontWeight: 600, width: 28, textAlign: 'right' as const }}>{gate.waitTime}m</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function IncidentAlerts() {
  const { venueState } = useDemoStore()
  const sevStyle: Record<string, { bg: string; color: string; border: string }> = {
    low: { bg: 'rgba(0,255,136,0.08)', color: '#00ff88', border: 'rgba(0,255,136,0.2)' },
    medium: { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: 'rgba(245,158,11,0.2)' },
    high: { bg: 'rgba(244,63,94,0.08)', color: '#f43f5e', border: 'rgba(244,63,94,0.2)' },
    critical: { bg: 'rgba(244,63,94,0.12)', color: '#f43f5e', border: 'rgba(244,63,94,0.3)' },
  }
  return (
    <div style={{ ...card, borderColor: 'rgba(244,63,94,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h4 style={{ color: '#f0f4ff', fontSize: 14, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Incident Alerts</h4>
        <span style={{ background: 'rgba(244,63,94,0.1)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.25)', borderRadius: 7, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{venueState.incidents.length} active</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {venueState.incidents.map(inc => {
          const s = sevStyle[inc.severity]
          return (
            <div key={inc.id} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(10,14,39,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#f0f4ff', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{inc.location}</span>
                <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{inc.severity}</span>
              </div>
              <p style={{ color: 'rgba(240,244,255,0.45)', fontSize: 12, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>{inc.description}</p>
              <p style={{ color: '#00d9ff', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>→ {inc.action}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function QueueForecast() {
  const { venueState } = useDemoStore()
  const items = venueState.queues.filter(q => q.type === 'concession').slice(0, 3)

  function Spark({ v }: { v: number }) {
    const pts = [v*0.6, v*0.75, v*0.88, v, v*1.1, v*1.05, v]
    const max = Math.max(...pts); const min = Math.min(...pts); const range = max - min || 1
    const w = 64, h = 28
    const path = pts.map((p, i) => `${(i/(pts.length-1))*w},${h-((p-min)/range)*h}`).join(' ')
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ opacity: 0.7 }}>
        <polyline points={path} fill="none" stroke="#00d9ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={w} cy={h-((pts[pts.length-1]-min)/range)*h} r="2.5" fill="#00d9ff" />
      </svg>
    )
  }

  return (
    <div style={{ ...card, borderColor: 'rgba(179,102,255,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h4 style={{ color: '#f0f4ff', fontSize: 14, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Queue Forecast</h4>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>+15 min</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map(q => (
          <div key={q.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#f0f4ff', fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{q.name}</div>
              <div style={{ color: q.waitTime > 20 ? '#f43f5e' : q.waitTime > 10 ? '#f59e0b' : '#00ff88', fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>
                {q.waitTime}m now → {Math.round(q.waitTime * 1.15)}m predicted
              </div>
            </div>
            <Spark v={q.waitTime} />
          </div>
        ))}
      </div>
    </div>
  )
}

function StaffDeployment() {
  const { venueState } = useDemoStore()
  const [deployed, setDeployed] = useState<string[]>([])
  const statusColor: Record<string, string> = { available: '#00ff88', deployed: '#00d9ff', en_route: '#f59e0b' }
  const statusBg: Record<string, string> = { available: 'rgba(0,255,136,0.08)', deployed: 'rgba(0,217,255,0.08)', en_route: 'rgba(245,158,11,0.08)' }

  return (
    <div style={{ ...card, borderColor: 'rgba(0,255,136,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h4 style={{ color: '#f0f4ff', fontSize: 14, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Staff Deployment</h4>
        <span style={{ background: 'rgba(0,255,136,0.08)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 7, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
          {venueState.staff.filter(s => s.status === 'available').length} available
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {venueState.staff.map(s => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, background: 'rgba(10,14,39,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor[s.status], flexShrink: 0 }} />
              <div>
                <div style={{ color: '#f0f4ff', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{s.name}</div>
                <div style={{ color: 'rgba(240,244,255,0.35)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{s.location}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: statusBg[s.status], color: statusColor[s.status], border: `1px solid ${statusColor[s.status]}33`, borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>
                {s.status.replace('_', ' ')}
              </span>
              {s.status === 'available' && !deployed.includes(s.id) && (
                <button onClick={() => setDeployed(d => [...d, s.id])}
                  style={{ background: 'none', border: 'none', color: '#00d9ff', fontSize: 11, fontFamily: 'Inter, sans-serif', cursor: 'pointer', fontWeight: 600 }}>
                  Deploy
                </button>
              )}
              {deployed.includes(s.id) && <span style={{ color: '#00ff88', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SignageControl() {
  const [zone, setZone] = useState('North Stand')
  const [msg, setMsg] = useState('Use Gate C — Shorter Wait')
  const [sent, setSent] = useState(false)
  const presets = ['Use Gate C — Shorter Wait', 'West Concourse Now Open', 'Order Ahead — Skip the Line', 'Exit via West — Fastest Route']

  return (
    <div style={{ ...card, borderColor: 'rgba(245,158,11,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h4 style={{ color: '#f0f4ff', fontSize: 14, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}>Signage Control</h4>
        <span style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 7, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>Manual</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="signage-inner">
        <div>
          <label style={{ color: 'rgba(240,244,255,0.35)', fontSize: 11, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Zone</label>
          <select value={zone} onChange={e => setZone(e.target.value)}
            style={{ width: '100%', background: 'rgba(10,14,39,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 12px', color: '#f0f4ff', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none' }}>
            {['North Stand', 'South Stand', 'East Concourse', 'West Concourse', 'All Zones'].map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div>
          <label style={{ color: 'rgba(240,244,255,0.35)', fontSize: 11, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Message</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {presets.map(p => (
              <button key={p} onClick={() => setMsg(p)}
                style={{
                  textAlign: 'left' as const, padding: '7px 10px', borderRadius: 8, fontSize: 12,
                  fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                  background: msg === p ? 'rgba(0,217,255,0.1)' : 'transparent',
                  border: msg === p ? '1px solid rgba(0,217,255,0.3)' : '1px solid transparent',
                  color: msg === p ? '#00d9ff' : 'rgba(240,244,255,0.45)',
                }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000) }}
        style={{
          width: '100%', marginTop: 16, padding: '11px 0', borderRadius: 10, fontSize: 13, fontWeight: 700,
          fontFamily: 'Montserrat, sans-serif', cursor: 'pointer',
          background: sent ? 'rgba(0,255,136,0.12)' : 'rgba(0,217,255,0.1)',
          border: sent ? '1px solid rgba(0,255,136,0.3)' : '1px solid rgba(0,217,255,0.3)',
          color: sent ? '#00ff88' : '#00d9ff',
        }}>
        {sent ? '✓ Signage Updated' : 'Push to Displays'}
      </motion.button>
    </div>
  )
}

export default function CommandCenter() {
  return (
    <section id="command-center" style={{ padding: '96px 0', background: 'rgba(15,21,53,0.2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-cyan" style={{ width: 600, height: 300, top: -50, left: '50%', transform: 'translateX(-50%)' }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f43f5e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#f43f5e', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Operator Dashboard</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>Command Center</h2>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: 17, fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            Full venue visibility — incidents, throughput, staff, and signage in one cockpit.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="cmd-grid">
          {[GateThroughput, IncidentAlerts, QueueForecast, StaffDeployment].map((Comp, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Comp />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}>
          <SignageControl />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cmd-grid { grid-template-columns: 1fr !important; } .signage-inner { grid-template-columns: 1fr !important; } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
      `}</style>
    </section>
  )
}
