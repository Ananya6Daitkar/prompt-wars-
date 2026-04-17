import { AnimatePresence, motion } from 'framer-motion'
import { useLiveStore } from '../../engine/liveStore'

export default function NotificationToast() {
  const { lastNotification } = useLiveStore()

  return (
    <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 999, pointerEvents: 'none' }}>
      <AnimatePresence>
        {lastNotification && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: 'rgba(15,21,53,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,217,255,0.3)',
              borderRadius: 12,
              padding: '10px 20px',
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,217,255,0.1)',
              whiteSpace: 'nowrap' as const,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d9ff', display: 'inline-block', flexShrink: 0 }}
            />
            <span style={{ color: '#f0f4ff', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
              {lastNotification}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
