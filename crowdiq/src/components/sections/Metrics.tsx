import { motion } from 'framer-motion'
import AnimatedCounter from '../common/AnimatedCounter'

const metrics = [
  { value: 47, suffix: '%', label: 'Faster Entry', sub: 'Average gate wait time reduction across 12 venues', color: '#00d9ff', data: [20,28,35,30,42,38,47] },
  { value: 3.2, suffix: 'min', decimals: 1, label: 'Wait Reduction', sub: 'Average concession and restroom queue time saved per fan', color: '#a855f7', data: [1.2,1.8,2.1,2.5,2.8,3.0,3.2] },
  { value: 94, suffix: '%', label: 'Fan Satisfaction', sub: 'Post-event survey score across CrowdIQ-enabled venues', color: '#00ff88', data: [72,76,80,84,88,91,94] },
  { value: 2.1, suffix: 'x', decimals: 1, label: 'Operational Efficiency', sub: 'Improvement in staff deployment accuracy and incident response', color: '#f59e0b', data: [1.0,1.2,1.4,1.6,1.8,2.0,2.1] },
]

function Spark({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1
  const w = 80, h = 32
  const pts = data.map((v, i) => `${(i/(data.length-1))*w},${h-((v-min)/range)*h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ opacity: 0.7 }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={`url(#spark-${color.replace('#','')})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={h-((data[data.length-1]-min)/range)*h} r="3" fill={color} />
    </svg>
  )
}

export default function Metrics() {
  return (
    <section id="metrics" style={{ padding: '100px 0', background: 'var(--c-obsidian)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-cyan" style={{ width: 600, height: 400, bottom: -100, right: '5%' }} />
        <div className="orb-violet" style={{ width: 400, height: 400, top: -50, left: '10%' }} />
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      </div>

      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 999, padding: '7px 18px', marginBottom: 22 }}>
            <span style={{ color: '#00ff88', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Proven Impact</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16 }}>Numbers that matter</h2>
          <p style={{ color: 'rgba(240,246,255,0.45)', fontSize: 17, fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Real outcomes from venues that deployed CrowdIQ across a full season.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="metrics-grid">
          {metrics.map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -8 }}
              style={{
                padding: '28px 24px', borderRadius: 18,
                background: 'rgba(13,27,62,0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                position: 'relative', overflow: 'hidden', cursor: 'default',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = `${m.color}30`
                el.style.boxShadow = `0 0 32px ${m.color}18, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${m.color}80, transparent)` }} />
              {/* Corner glow */}
              <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${m.color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ color: m.color, fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 44, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>
                <AnimatedCounter to={m.value} suffix={m.suffix} decimals={m.decimals ?? 0} duration={2.2} />
              </div>
              <div style={{ color: 'var(--c-white)', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 16, marginBottom: 8, letterSpacing: '-0.02em' }}>{m.label}</div>
              <p style={{ color: 'rgba(240,246,255,0.32)', fontSize: 12, fontFamily: 'Inter, sans-serif', lineHeight: 1.65, marginBottom: 18 }}>{m.sub}</p>
              <Spark data={m.data} color={m.color} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .metrics-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .metrics-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
