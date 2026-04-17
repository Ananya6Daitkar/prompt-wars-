import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Demo', href: '#demo' },
  { label: 'Journey', href: '#fan-journey' },
  { label: 'Features', href: '#features' },
  { label: 'Map', href: '#venue-map' },
  { label: 'Command', href: '#command-center' },
  { label: 'Mobile', href: '#mobile' },
]

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <a href="#main"
        style={{ position: 'fixed', top: -100, left: 16, zIndex: 9999, background: 'var(--c-cyan)', color: 'var(--c-obsidian)', padding: '8px 16px', borderRadius: 8, fontWeight: 800, fontSize: 14, transition: 'top 0.2s', fontFamily: 'Montserrat, sans-serif' }}
        onFocus={e => (e.currentTarget.style.top = '16px')}
        onBlur={e => (e.currentTarget.style.top = '-100px')}
      >Skip to content</a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 64,
          background: scrolled ? 'rgba(10,14,26,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,217,255,0.1)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1360, margin: '0 auto', padding: '0 28px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(0,217,255,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3.5" fill="#00d9ff" />
                <circle cx="9" cy="9" r="7" stroke="#00d9ff" strokeWidth="1" strokeDasharray="2.5 2" opacity="0.55" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 20, color: '#00d9ff', letterSpacing: '-0.04em' }}>CrowdIQ</span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-desktop">
            {links.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,246,255,0.5)', fontSize: 14, fontWeight: 500, fontFamily: 'Inter, sans-serif', transition: 'color 0.2s', letterSpacing: '0.01em', padding: '4px 0', position: 'relative' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#00d9ff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,246,255,0.5)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="nav-desktop">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('#demo')}
              style={{ background: 'var(--c-cyan)', color: 'var(--c-obsidian)', border: 'none', borderRadius: 10, padding: '9px 22px', fontSize: 14, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', boxShadow: '0 0 20px rgba(0,217,255,0.35)', letterSpacing: '-0.01em' }}>
              Launch Demo
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,246,255,0.65)', padding: 4 }}
            aria-label="Toggle menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="17" y1="5" x2="5" y2="17" /><line x1="5" y1="5" x2="17" y2="17" /></>
                : <><line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="16" x2="19" y2="16" /></>
              }
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99, background: 'rgba(10,14,26,0.97)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(0,217,255,0.1)', padding: '20px 24px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(link => (
            <button key={link.href} onClick={() => { scrollTo(link.href); setMenuOpen(false) }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(240,246,255,0.65)', fontSize: 16, fontWeight: 500, fontFamily: 'Inter, sans-serif', textAlign: 'left', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {link.label}
            </button>
          ))}
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { scrollTo('#demo'); setMenuOpen(false) }}
            style={{ marginTop: 14, background: 'var(--c-cyan)', color: 'var(--c-obsidian)', border: 'none', borderRadius: 10, padding: '13px 20px', fontSize: 15, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', cursor: 'pointer' }}>
            Launch Demo
          </motion.button>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
        @media (min-width: 769px) { .nav-mobile { display: none !important; } }
      `}</style>
    </>
  )
}
