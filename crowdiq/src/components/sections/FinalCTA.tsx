import { motion } from 'framer-motion'

export default function FinalCTA() {
  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{ padding: '128px 0', background: 'var(--c-obsidian)', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-cyan" style={{ width: 900, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="orb-violet" style={{ width: 600, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="grid-overlay" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
        <div className="scanline" style={{ opacity: 0.4 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, var(--c-obsidian) 100%)' }} />
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 28px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,217,255,0.07)', border: '1px solid rgba(0,217,255,0.22)', borderRadius: 999, padding: '7px 18px', marginBottom: 36 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d9ff', display: 'inline-block', boxShadow: '0 0 8px #00d9ff' }} />
            <span style={{ color: '#00d9ff', fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Ready to deploy</span>
          </div>

          <h2 style={{ fontSize: 'clamp(38px,6vw,68px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.06, marginBottom: 24 }}>
            Live events deserve{' '}
            <span className="text-grad-cyan">live intelligence.</span>
          </h2>

          <p style={{ color: 'rgba(240,246,255,0.45)', fontSize: 18, fontFamily: 'Inter, sans-serif', lineHeight: 1.75, marginBottom: 48, maxWidth: 580, margin: '0 auto 48px' }}>
            CrowdIQ turns 18,000 simultaneous decisions into one seamless experience — for fans, operators, and the venues that host them.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#demo')}
              style={{ background: 'var(--c-cyan)', color: 'var(--c-obsidian)', border: 'none', borderRadius: 13, padding: '16px 36px', fontSize: 16, fontWeight: 900, fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', letterSpacing: '-0.01em', boxShadow: '0 0 48px rgba(0,217,255,0.45), 0 4px 24px rgba(0,0,0,0.4)' }}>
              Launch Live Demo
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, background: 'rgba(0,217,255,0.07)' }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#features')}
              style={{ background: 'transparent', color: 'var(--c-cyan)', border: '1.5px solid rgba(0,217,255,0.35)', borderRadius: 13, padding: '16px 36px', fontSize: 16, fontWeight: 900, fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', letterSpacing: '-0.01em' }}>
              Explore Features
            </motion.button>
          </div>

          {/* Trust bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 52, marginTop: 72, paddingTop: 52, borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap' as const }}>
            {[
              { v: '12+', l: 'Venues', c: '#00d9ff' },
              { v: '2.4M', l: 'Fans served', c: '#a855f7' },
              { v: '47%', l: 'Avg wait reduction', c: '#00ff88' },
              { v: '99.9%', l: 'Uptime', c: '#f59e0b' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ color: s.c, fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 28, letterSpacing: '-0.03em' }}>{s.v}</div>
                <div style={{ color: 'rgba(240,246,255,0.28)', fontSize: 12, fontFamily: 'Inter, sans-serif', marginTop: 5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.35} }`}</style>
    </section>
  )
}
