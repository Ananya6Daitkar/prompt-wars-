import { motion } from 'framer-motion'

const features = [
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="9" stroke="#00d9ff" strokeWidth="1.5"/><circle cx="13" cy="13" r="4.5" fill="#00d9ff" fillOpacity="0.18" stroke="#00d9ff" strokeWidth="1"/><circle cx="13" cy="13" r="2" fill="#00d9ff"/></svg>,
    title: 'Crowd-Aware Wayfinding', color: '#00d9ff',
    body: 'Routes update in real time as crowd density shifts — always the fastest path, never the most congested.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="15" width="4" height="8" rx="1" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="1"/><rect x="11" y="9" width="4" height="14" rx="1" fill="#a855f7" fillOpacity="0.5" stroke="#a855f7" strokeWidth="1"/><rect x="19" y="3" width="4" height="20" rx="1" fill="#a855f7" stroke="#a855f7" strokeWidth="1"/></svg>,
    title: 'Live Queue Prediction', color: '#a855f7',
    body: 'AI forecasts concession and restroom wait times 5–15 minutes ahead, so you plan before the rush hits.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="5" y="7" width="16" height="14" rx="2" stroke="#00ff88" strokeWidth="1.5"/><path d="M9 13h8M9 16h5" stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round"/><circle cx="19" cy="7" r="4" fill="#00ff88" fillOpacity="0.18" stroke="#00ff88" strokeWidth="1"/><path d="M17.5 7l1 1 2-2" stroke="#00ff88" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Order-Ahead Concessions', color: '#00ff88',
    body: 'Order food from your seat. Pick it up at the counter — no queue, no missed action.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 3v4M13 19v4M3 13h4M19 13h4" stroke="#00d9ff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="13" cy="13" r="5" stroke="#00d9ff" strokeWidth="1.5"/><circle cx="13" cy="13" r="2" fill="#00d9ff"/></svg>,
    title: 'Accessibility-First Routing', color: '#00d9ff',
    body: 'Elevator-only paths, accessible restrooms, and low-density routes for fans with mobility needs.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 9h16M5 13h10M5 17h12" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="5" width="20" height="16" rx="2" stroke="#f59e0b" strokeWidth="1.5"/></svg>,
    title: 'Dynamic Gate Allocation', color: '#f59e0b',
    body: 'Gates are scored and ranked in real time. Fans are guided to the fastest entry — automatically.',
  },
  {
    icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="3" width="9" height="9" rx="1.5" stroke="#a855f7" strokeWidth="1.5"/><rect x="14" y="3" width="9" height="9" rx="1.5" stroke="#a855f7" strokeWidth="1.5"/><rect x="3" y="14" width="9" height="9" rx="1.5" stroke="#a855f7" strokeWidth="1.5"/><rect x="14" y="14" width="9" height="9" rx="1.5" stroke="#a855f7" strokeWidth="1.5"/></svg>,
    title: 'Venue Operations Layer', color: '#a855f7',
    body: 'Operators see everything — gate throughput, incident alerts, staff positions, and signage control in one cockpit.',
  },
]

export default function Features() {
  return (
    <section id="features" style={{ padding: '100px 0', background: 'var(--c-obsidian)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-violet" style={{ width: 500, height: 500, top: '50%', left: -100, transform: 'translateY(-50%)' }} />
        <div className="orb-cyan" style={{ width: 400, height: 400, bottom: -100, right: -50 }} />
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      </div>

      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,136,0.07)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 999, padding: '7px 18px', marginBottom: 22 }}>
            <span style={{ color: '#00ff88', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Platform Features</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16 }}>Built for every moment</h2>
          <p style={{ color: 'rgba(240,246,255,0.45)', fontSize: 17, fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Six core capabilities that work together to eliminate friction at every touchpoint.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="features-grid">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.07 }}
              whileHover={{ scale: 1.03, y: -6 }}
              style={{
                padding: '28px 24px', borderRadius: 18,
                background: 'rgba(13,27,62,0.55)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                position: 'relative', overflow: 'hidden', cursor: 'default',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${f.color}30` }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${f.color}70, transparent)` }} />
              <div style={{ display: 'inline-flex', padding: 11, borderRadius: 13, background: `${f.color}10`, border: `1px solid ${f.color}20`, marginBottom: 18 }}>
                {f.icon}
              </div>
              <h3 style={{ color: 'var(--c-white)', fontSize: 17, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', marginBottom: 10, letterSpacing: '-0.02em' }}>{f.title}</h3>
              <p style={{ color: 'rgba(240,246,255,0.42)', fontSize: 14, fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .features-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
