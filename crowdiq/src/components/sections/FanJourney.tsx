import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stages = [
  {
    id: 'arrival', icon: '📍', label: 'Before Arrival', color: '#00d9ff',
    headline: 'Know before you go',
    points: ['Best gate for your seat', 'Predicted entry wait times', 'Pre-order halftime food'],
    detail: 'CrowdIQ analyzes your ticket, location, and live gate data to give you a personalized arrival plan — before you leave home.',
  },
  {
    id: 'ingress', icon: '🚪', label: 'Ingress', color: '#b366ff',
    headline: 'Skip the bottleneck',
    points: ['Real-time gate queue lengths', 'Dynamic rerouting as crowds shift', 'Accessible entry path options'],
    detail: 'As you approach the venue, CrowdIQ monitors all 8 gates in real time and guides you to the fastest entry — updating every 30 seconds.',
  },
  {
    id: 'navigation', icon: '🗺️', label: 'In-Venue', color: '#00ff88',
    headline: 'Find your way instantly',
    points: ['Turn-by-turn indoor navigation', 'Crowd-aware route to your seat', 'Nearest low-wait concessions'],
    detail: 'Once inside, the venue map activates with your seat highlighted and the least-congested path to get there.',
  },
  {
    id: 'halftime', icon: '⏸️', label: 'Halftime', color: '#f59e0b',
    headline: 'Make the most of the break',
    points: ['Shortest restroom queue nearby', 'Order-ahead food ready at pickup', 'Crowd surge alerts for concourses'],
    detail: 'Halftime is the hardest 15 minutes in any stadium. CrowdIQ predicts the rush and routes you around it.',
  },
  {
    id: 'exit', icon: '🚶', label: 'Post-Game Exit', color: '#00d9ff',
    headline: 'Leave on your terms',
    points: ['Least-congested exit route', 'Real-time crowd flow updates', 'Parking and transit coordination'],
    detail: 'When the final whistle blows, CrowdIQ activates exit routing — dynamically adjusting as 18,000 fans start moving at once.',
  },
]

export default function FanJourney() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section id="fan-journey" style={{ padding: '96px 0', background: '#0a0e27', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-cyan" style={{ width: 600, height: 400, bottom: -100, left: '20%' }} />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(179,102,255,0.08)', border: '1px solid rgba(179,102,255,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ color: '#b366ff', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Fan Journey</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>
            From parking lot to final whistle
          </h2>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: 17, fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            CrowdIQ works at every stage of your event day — not just when you're lost.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }} className="journey-grid">
          {stages.map((stage, i) => (
            <motion.div key={stage.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setActiveId(activeId === stage.id ? null : stage.id)}
                style={{
                  cursor: 'pointer', padding: '24px 20px', borderRadius: 16,
                  background: activeId === stage.id ? 'rgba(15,21,53,0.9)' : 'rgba(15,21,53,0.6)',
                  border: activeId === stage.id ? `1px solid ${stage.color}44` : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: activeId === stage.id ? `0 0 24px ${stage.color}18` : '0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{stage.icon}</div>
                <div style={{ color: stage.color, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.07em', marginBottom: 8 }}>
                  {stage.label}
                </div>
                <h3 style={{ color: '#f0f4ff', fontSize: 15, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', marginBottom: 12, lineHeight: 1.3 }}>
                  {stage.headline}
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {stage.points.map(p => (
                    <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: 'rgba(240,244,255,0.45)', fontSize: 12, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                      <span style={{ color: stage.color, marginTop: 1, flexShrink: 0 }}>›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <AnimatePresence>
                {activeId === stage.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}>
                    <div style={{
                      marginTop: 8, padding: '14px 16px', borderRadius: 12,
                      background: `${stage.color}0a`, border: `1px solid ${stage.color}28`,
                      color: 'rgba(240,244,255,0.65)', fontSize: 13, fontFamily: 'Inter, sans-serif', lineHeight: 1.6,
                    }}>
                      {stage.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .journey-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 640px) { .journey-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
