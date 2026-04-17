import { motion, AnimatePresence } from 'framer-motion'
import { useDemoStore } from '../../store/demoStore'
import { scenarios } from '../../data/demoData'
import { getDensityColor } from '../../utils/density'
import GatePanel from '../demo/GatePanel'
import QueuePanel from '../demo/QueuePanel'
import ExitPanel from '../demo/ExitPanel'

const card: React.CSSProperties = {
  background: 'rgba(15,21,53,0.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(0,217,255,0.12)',
  borderRadius: 20,
  boxShadow: '0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
}

function StadiumMap() {
  const { venueState, selectedGateId } = useDemoStore()

  const gates = [
    { id: 'g1', x: 200, y: 28, label: 'A' }, { id: 'g2', x: 312, y: 62, label: 'B' },
    { id: 'g3', x: 372, y: 160, label: 'C' }, { id: 'g4', x: 342, y: 258, label: 'D' },
    { id: 'g5', x: 200, y: 312, label: 'E' }, { id: 'g6', x: 78, y: 268, label: 'F' },
    { id: 'g7', x: 38, y: 160, label: 'G' }, { id: 'g8', x: 88, y: 62, label: 'H' },
  ]

  const zones = [
    { id: 'z1', cx: 200, cy: 88, rx: 62, ry: 26 },
    { id: 'z2', cx: 200, cy: 252, rx: 62, ry: 26 },
    { id: 'z3', cx: 322, cy: 170, rx: 36, ry: 52 },
    { id: 'z4', cx: 78, cy: 170, rx: 36, ry: 52 },
    { id: 'z5', cx: 200, cy: 170, rx: 58, ry: 42 },
  ]

  const sel = gates.find(g => g.id === selectedGateId)

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <svg viewBox="0 0 400 340" style={{ width: '100%' }} aria-label="Stadium map">
        <ellipse cx="200" cy="170" rx="188" ry="158" fill="#0a0e27" stroke="#00d9ff" strokeWidth="1" strokeOpacity="0.15" />
        {zones.map(z => {
          const vz = venueState.zones.find(vz => vz.id === z.id)
          const color = vz ? getDensityColor(vz.level) : '#3d4a6b'
          return (
            <motion.ellipse key={z.id} cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
              fill={color} fillOpacity="0.16" stroke={color} strokeWidth="1" strokeOpacity="0.35"
              animate={{ fillOpacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )
        })}
        <ellipse cx="200" cy="170" rx="72" ry="52" fill="#00ff88" fillOpacity="0.04" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.2" />
        <ellipse cx="200" cy="170" rx="42" ry="30" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.14" fill="none" />
        <line x1="200" y1="118" x2="200" y2="222" stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.14" />
        {[0,1,2].map(i => (
          <ellipse key={i} cx="200" cy="170" rx={82+i*30} ry={60+i*22}
            stroke="#00d9ff" strokeWidth="0.4" strokeOpacity="0.07" fill="none" strokeDasharray="3 4" />
        ))}
        <AnimatePresence>
          {sel && (
            <motion.path key={sel.id}
              d={`M ${sel.x} ${sel.y} Q ${(sel.x+200)/2} ${(sel.y+170)/2} 200 170`}
              stroke="#00d9ff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="7 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
        {gates.map(g => {
          const gd = venueState.gates.find(vg => vg.id === g.id)
          const isSel = selectedGateId === g.id
          const isRec = gd?.isRecommended
          const color = isSel ? '#00d9ff' : isRec ? '#00ff88' : '#3d4a6b'
          return (
            <g key={g.id}>
              {isRec && (
                <motion.circle cx={g.x} cy={g.y} r="11" fill="#00ff88" fillOpacity="0.08"
                  animate={{ r: [11,16,11], opacity: [0.4,0.7,0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                />
              )}
              <circle cx={g.x} cy={g.y} r="6" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
              <circle cx={g.x} cy={g.y} r="3" fill={color} />
              <text x={g.x} y={g.y-11} textAnchor="middle" fill={color} fontSize="9" fontFamily="Inter" fontWeight="600">{g.label}</text>
            </g>
          )
        })}
        {sel && (
          <motion.circle cx={200} cy={170} r="5" fill="#b366ff" stroke="#b366ff" strokeWidth="1.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
          />
        )}
      </svg>
      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
        {[{ c: '#00ff88', l: 'Low' }, { c: '#f59e0b', l: 'Moderate' }, { c: '#f43f5e', l: 'High' }].map(item => (
          <div key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.c }} />
            <span style={{ color: 'rgba(240,244,255,0.35)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}>{item.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const tabs = [
  { id: 'gates' as const, label: 'Gates', icon: '🚪' },
  { id: 'queues' as const, label: 'Queues', icon: '⏱' },
  { id: 'exits' as const, label: 'Exits', icon: '🚶' },
]

export default function Demo() {
  const { activeScenarioId, setScenario, activeTab, setTab } = useDemoStore()

  return (
    <section id="demo" style={{ padding: '96px 0', background: 'rgba(15,21,53,0.35)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="orb-violet" style={{ width: 500, height: 500, top: -100, right: -100 }} />
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d9ff', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#00d9ff', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Interactive Demo</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>See it in action</h2>
          <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: 17, fontFamily: 'Inter, sans-serif', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            Three real scenarios. Click gates to see routes. Switch tabs to check queues and exits.
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40, flexWrap: 'wrap' as const }}>
          {scenarios.map(s => (
            <motion.button key={s.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setScenario(s.id)}
              style={{
                padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                background: activeScenarioId === s.id ? 'rgba(0,217,255,0.12)' : 'rgba(15,21,53,0.6)',
                border: activeScenarioId === s.id ? '1px solid rgba(0,217,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: activeScenarioId === s.id ? '#00d9ff' : 'rgba(240,244,255,0.55)',
                boxShadow: activeScenarioId === s.id ? '0 0 20px rgba(0,217,255,0.1)' : 'none',
              }}>
              <div>{s.label}</div>
              <div style={{ fontSize: 11, opacity: 0.6, fontWeight: 400, marginTop: 2 }}>{s.description}</div>
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }} className="demo-grid">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} style={{ ...card, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', color: '#f0f4ff' }}>Live Venue Map</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#00ff88', fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Live</span>
              </div>
            </div>
            <StadiumMap />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }} style={{ ...card, padding: 28 }}>
            <div style={{ display: 'flex', gap: 4, background: 'rgba(10,14,39,0.6)', borderRadius: 12, padding: 4, marginBottom: 20 }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setTab(tab.id)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '9px 0', borderRadius: 9, fontSize: 13, fontWeight: 600,
                    fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                    background: activeTab === tab.id ? 'rgba(0,217,255,0.12)' : 'transparent',
                    border: activeTab === tab.id ? '1px solid rgba(0,217,255,0.25)' : '1px solid transparent',
                    color: activeTab === tab.id ? '#00d9ff' : 'rgba(240,244,255,0.4)',
                  }}>
                  <span>{tab.icon}</span><span>{tab.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 4 }}
                aria-live="polite">
                {activeTab === 'gates' && <GatePanel />}
                {activeTab === 'queues' && <QueuePanel />}
                {activeTab === 'exits' && <ExitPanel />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .demo-grid { grid-template-columns: 1fr !important; } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
      `}</style>
    </section>
  )
}
