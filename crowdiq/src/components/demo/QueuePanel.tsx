import { motion } from 'framer-motion'
import { useDemoStore } from '../../store/demoStore'

function waitColor(m: number) {
  return m > 20 ? '#f43f5e' : m > 10 ? '#f59e0b' : '#00ff88'
}

function waitBg(m: number) {
  return m > 20 ? 'rgba(244,63,94,0.08)' : m > 10 ? 'rgba(245,158,11,0.08)' : 'rgba(0,255,136,0.06)'
}

function waitBorder(m: number) {
  return m > 20 ? 'rgba(244,63,94,0.2)' : m > 10 ? 'rgba(245,158,11,0.2)' : 'rgba(0,255,136,0.18)'
}

export default function QueuePanel() {
  const { venueState } = useDemoStore()
  const concessions = venueState.queues.filter(q => q.type === 'concession')
  const restrooms = venueState.queues.filter(q => q.type === 'restroom')

  function List({ items, title, icon }: { items: typeof concessions; title: string; icon: string }) {
    return (
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>{icon}</span>
          <span style={{ color: 'rgba(240,244,255,0.4)', fontSize: 11, fontWeight: 600, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {items.map((q, i) => (
            <motion.div key={q.id}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px', borderRadius: 10,
                background: q.isAlternative ? 'rgba(0,255,136,0.05)' : 'rgba(10,14,39,0.5)',
                border: q.isAlternative ? '1px solid rgba(0,255,136,0.18)' : '1px solid rgba(255,255,255,0.06)',
              }}>
              <div>
                <div style={{ color: '#f0f4ff', fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{q.name}</div>
                {q.isAlternative && <div style={{ color: '#00ff88', fontSize: 10, fontFamily: 'Inter, sans-serif', marginTop: 2 }}>Recommended alternative</div>}
              </div>
              <span style={{
                background: waitBg(q.waitTime), color: waitColor(q.waitTime),
                border: `1px solid ${waitBorder(q.waitTime)}`,
                borderRadius: 7, padding: '3px 9px', fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
              }}>
                {q.waitTime}m
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <List items={concessions} title="Concessions" icon="🍔" />
      <List items={restrooms} title="Restrooms" icon="🚻" />
    </div>
  )
}
