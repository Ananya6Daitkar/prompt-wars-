import { motion } from 'framer-motion'
import { useDemoStore } from '../../store/demoStore'

export default function GatePanel() {
  const { venueState, selectedGateId, selectGate } = useDemoStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ color: 'rgba(240,244,255,0.35)', fontSize: 12, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>
        Select a gate to see your route
      </p>
      {venueState.gates.map((gate, i) => {
        const isSel = selectedGateId === gate.id
        const pct = gate.queueLength / gate.capacity
        const barColor = pct > 0.7 ? '#f43f5e' : pct > 0.4 ? '#f59e0b' : '#00ff88'
        const waitColor = gate.waitTime > 20 ? '#f43f5e' : gate.waitTime > 10 ? '#f59e0b' : '#00ff88'
        return (
          <motion.button key={gate.id}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => selectGate(isSel ? null : gate.id)}
            style={{
              width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 12, cursor: 'pointer',
              background: isSel ? 'rgba(0,217,255,0.08)' : gate.isRecommended ? 'rgba(0,255,136,0.05)' : 'rgba(10,14,39,0.5)',
              border: isSel ? '1px solid rgba(0,217,255,0.4)' : gate.isRecommended ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,255,255,0.06)',
              boxShadow: isSel ? '0 0 16px rgba(0,217,255,0.08)' : 'none',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#f0f4ff', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{gate.name}</span>
                {gate.isRecommended && (
                  <span style={{ background: 'rgba(0,255,136,0.12)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.25)', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                    Best
                  </span>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: waitColor, fontSize: 14, fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>{gate.waitTime}m</div>
                <div style={{ color: 'rgba(240,244,255,0.3)', fontSize: 10, fontFamily: 'Inter, sans-serif' }}>{gate.queueLength} queued</div>
              </div>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                style={{ height: '100%', background: barColor, borderRadius: 99 }}
              />
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
