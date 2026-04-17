import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Recommendation } from '../../engine/types'

const TYPE_ICON: Record<string, string> = {
  gate: '🚪', route: '🗺️', food: '🍔', restroom: '🚻', exit: '🚶',
}
const TYPE_COLOR: Record<string, string> = {
  gate: '#00d9ff', route: '#a855f7', food: '#f59e0b', restroom: '#00ff88', exit: '#a855f7',
}

function timeAgo(ts: number) {
  const s = Math.round((Date.now() - ts) / 1000)
  if (s < 5) return 'just now'
  if (s < 60) return `${s}s ago`
  return `${Math.round(s / 60)}m ago`
}

export default function RecommendationCard({ rec }: { rec: Recommendation }) {
  const [showWhy, setShowWhy] = useState(false)
  const color = TYPE_COLOR[rec.type]

  return (
    <motion.div layout
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.01, y: -2 }}
      style={{
        background: 'rgba(10,14,26,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${color}1a`,
        borderRadius: 14,
        padding: '16px 18px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: rec.changed
          ? `0 0 28px ${color}22, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
          : '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'box-shadow 0.4s ease',
        cursor: 'default',
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent 0%, ${color}90 40%, ${color} 50%, ${color}90 60%, transparent 100%)` }} />

      {/* Changed flash overlay */}
      <AnimatePresence>
        {rec.changed && (
          <motion.div initial={{ opacity: 0.35 }} animate={{ opacity: 0 }} transition={{ duration: 1.8 }}
            style={{ position: 'absolute', inset: 0, background: `${color}0a`, borderRadius: 14, pointerEvents: 'none' }} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Icon */}
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}12`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
            {TYPE_ICON[rec.type]}
          </div>
          <div>
            <div style={{ color: 'rgba(240,246,255,0.38)', fontSize: 9, fontWeight: 700, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 2 }}>{rec.title}</div>
            <motion.div key={rec.value} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              style={{ color: 'var(--c-white)', fontSize: 14, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {rec.value}
            </motion.div>
          </div>
        </div>

        {/* Updated badge */}
        <AnimatePresence>
          {rec.changed && (
            <motion.span initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.75 }}
              style={{ background: `${color}15`, color, border: `1px solid ${color}40`, borderRadius: 6, padding: '2px 8px', fontSize: 9, fontWeight: 800, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.06em', flexShrink: 0 }}>
              Updated
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Chips row */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' as const }}>
        <span style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '3px 9px', fontSize: 11, color: 'rgba(240,246,255,0.55)', fontFamily: 'Inter, sans-serif' }}>
          {rec.reason}
        </span>
        <span style={{ background: `${color}0e`, border: `1px solid ${color}28`, borderRadius: 6, padding: '3px 9px', fontSize: 11, color, fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
          ⚡ {rec.timeSaved}
        </span>
      </div>

      {/* Confidence bar */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ color: 'rgba(240,246,255,0.28)', fontSize: 10, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Confidence</span>
          <span style={{ color: 'rgba(240,246,255,0.2)', fontSize: 10, fontFamily: 'Inter, sans-serif' }}>updated {timeAgo(rec.updatedAt)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${rec.confidence}%` }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{ height: '100%', background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 99, boxShadow: `0 0 6px ${color}60` }} />
          </div>
          <span style={{ color, fontSize: 12, fontWeight: 900, fontFamily: 'Montserrat, sans-serif', minWidth: 34, textAlign: 'right' as const }}>{rec.confidence}%</span>
        </div>
      </div>

      {/* Why this? */}
      <button onClick={() => setShowWhy(!showWhy)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5, color: color, fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', opacity: 0.75, transition: 'opacity 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
      >
        <motion.span animate={{ rotate: showWhy ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: 'inline-block', fontSize: 9 }}>▼</motion.span>
        Why this?
      </button>

      <AnimatePresence>
        {showWhy && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}>
            <div style={{ marginTop: 10, padding: '11px 13px', background: `${color}07`, border: `1px solid ${color}1e`, borderRadius: 10, color: 'rgba(240,246,255,0.6)', fontSize: 12, fontFamily: 'Inter, sans-serif', lineHeight: 1.65 }}>
              {rec.detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
