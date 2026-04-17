import { motion } from 'framer-motion'
import { useDemoStore } from '../../store/demoStore'

const densityColor: Record<string, string> = {
  low: '#00ff88', moderate: '#f59e0b', high: '#f43f5e', critical: '#f43f5e',
}
const densityBg: Record<string, string> = {
  low: 'rgba(0,255,136,0.08)', moderate: 'rgba(245,158,11,0.08)', high: 'rgba(244,63,94,0.08)', critical: 'rgba(244,63,94,0.08)',
}

export default function ExitPanel() {
  const { venueState } = useDemoStore()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ color: 'rgba(240,244,255,0.35)', fontSize: 12, fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>
        {venueState.phase === 'post_event' ? 'Post-event exit routing active' : 'Exit routes available after event'}
      </p>
      {venueState.exits.map((exit, i) => (
        <motion.div key={exit.id}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          style={{
            padding: '12px 14px', borderRadius: 12,
            background: exit.isRecommended ? 'rgba(0,255,136,0.06)' : 'rgba(10,14,39,0.5)',
            border: exit.isRecommended ? '1px solid rgba(0,255,136,0.22)' : '1px solid rgba(255,255,255,0.06)',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#f0f4ff', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{exit.name}</span>
              {exit.isRecommended && (
                <span style={{ background: 'rgba(0,255,136,0.12)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.25)', borderRadius: 6, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>
                  Fastest
                </span>
              )}
            </div>
            <span style={{
              background: densityBg[exit.density], color: densityColor[exit.density],
              border: `1px solid ${densityColor[exit.density]}33`,
              borderRadius: 7, padding: '3px 9px', fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
            }}>
              {exit.estimatedTime}m
            </span>
          </div>
          <div style={{ color: 'rgba(240,244,255,0.3)', fontSize: 11, fontFamily: 'Inter, sans-serif', marginTop: 4, textTransform: 'capitalize' as const }}>
            {exit.density} density
          </div>
        </motion.div>
      ))}
    </div>
  )
}
