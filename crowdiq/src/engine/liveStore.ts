import { create } from 'zustand'
import type { LiveVenueState, Mode } from './types'
import {
  INITIAL_GATES, INITIAL_ZONES, INITIAL_QUEUES, INITIAL_EXITS,
  tickGates, tickZones, tickQueues, tickExits,
} from './simulation'
import { computeRecommendations } from './recommender'

const TICK_MS = 4000

function buildInitial(mode: Mode): Omit<LiveVenueState, 'mode'> {
  const gates = INITIAL_GATES
  const zones = INITIAL_ZONES
  const queues = INITIAL_QUEUES
  const exits = INITIAL_EXITS
  const recommendations = computeRecommendations(gates, zones, queues, exits, mode, [])
  return { tick: 0, gates, zones, queues, exits, recommendations, lastNotification: null, fansRedirected: 0 }
}

interface LiveStore extends LiveVenueState {
  setMode: (mode: Mode) => void
  startTicking: () => void
  stopTicking: () => void
  _intervalId: ReturnType<typeof setInterval> | null
}

export const useLiveStore = create<LiveStore>((set, get) => ({
  mode: 'normal',
  ...buildInitial('normal'),
  _intervalId: null,

  setMode: (mode) => {
    const { gates, zones, queues, exits } = buildInitial(mode)
    const recommendations = computeRecommendations(gates, zones, queues, exits, mode, [])
    set({ mode, gates, zones, queues, exits, recommendations, tick: 0, lastNotification: `Mode: ${mode.replace('_', ' ')} — recalculating...`, fansRedirected: 0 })
    setTimeout(() => set({ lastNotification: null }), 3000)
  },

  startTicking: () => {
    const existing = get()._intervalId
    if (existing) clearInterval(existing)

    const id = setInterval(() => {
      const { mode, gates, zones, queues, exits, recommendations, fansRedirected, tick } = get()

      const newGates = tickGates(gates, mode)
      const newZones = tickZones(zones, mode)
      const newQueues = tickQueues(queues, mode)
      const newExits = tickExits(exits, mode)
      const newRecs = computeRecommendations(newGates, newZones, newQueues, newExits, mode, recommendations)

      // Find changed recommendations
      const changed = newRecs.filter(r => r.changed)
      let notification: string | null = null
      let newFansRedirected = fansRedirected

      if (changed.length > 0) {
        const r = changed[0]
        if (r.type === 'gate') {
          const saved = parseInt(r.timeSaved) || 2
          notification = `Route updated — saved ${saved} min · ${Math.round(Math.random() * 80 + 40)} fans redirected`
          newFansRedirected += Math.round(Math.random() * 80 + 40)
        } else if (r.type === 'route') {
          notification = `Route recalculated — ${r.reason}`
        } else if (r.type === 'food') {
          notification = `Queue update — ${r.value} now shortest`
        } else if (r.type === 'exit') {
          notification = `Exit optimized — ${r.value} recommended`
        }
      }

      set({
        gates: newGates, zones: newZones, queues: newQueues, exits: newExits,
        recommendations: newRecs, tick: tick + 1,
        lastNotification: notification,
        fansRedirected: newFansRedirected,
      })

      if (notification) setTimeout(() => set({ lastNotification: null }), 4000)
    }, TICK_MS)

    set({ _intervalId: id })
  },

  stopTicking: () => {
    const id = get()._intervalId
    if (id) clearInterval(id)
    set({ _intervalId: null })
  },
}))
