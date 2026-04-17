import type { LiveGate, LiveZone, LiveQueue, LiveExit, Mode } from './types'

// ─── Initial state per mode ───────────────────────────────────────────────────

export const INITIAL_GATES: LiveGate[] = [
  { id: 'gA', label: 'Gate A — North',    shortLabel: 'A', occupancy: 82, waitTime: 38, trend: 'rising',  x: 200, y: 18  },
  { id: 'gB', label: 'Gate B — North East', shortLabel: 'B', occupancy: 74, waitTime: 24, trend: 'rising',  x: 318, y: 58  },
  { id: 'gC', label: 'Gate C — East',     shortLabel: 'C', occupancy: 28, waitTime: 7,  trend: 'stable',  x: 378, y: 162 },
  { id: 'gD', label: 'Gate D — South East', shortLabel: 'D', occupancy: 45, waitTime: 14, trend: 'falling', x: 348, y: 262 },
  { id: 'gE', label: 'Gate E — South',    shortLabel: 'E', occupancy: 68, waitTime: 22, trend: 'rising',  x: 200, y: 318 },
  { id: 'gF', label: 'Gate F — South West', shortLabel: 'F', occupancy: 55, waitTime: 18, trend: 'stable',  x: 72,  y: 268 },
  { id: 'gG', label: 'Gate G — West',     shortLabel: 'G', occupancy: 32, waitTime: 9,  trend: 'stable',  x: 22,  y: 162 },
  { id: 'gH', label: 'Gate H — North West', shortLabel: 'H', occupancy: 60, waitTime: 20, trend: 'falling', x: 82,  y: 58  },
]

export const INITIAL_ZONES: LiveZone[] = [
  { id: 'zN',  label: 'North Stand',     cx: 200, cy: 72,  rx: 80, ry: 28, density: 82 },
  { id: 'zS',  label: 'South Stand',     cx: 200, cy: 268, rx: 80, ry: 28, density: 55 },
  { id: 'zE',  label: 'East Concourse',  cx: 338, cy: 170, rx: 38, ry: 62, density: 28 },
  { id: 'zW',  label: 'West Concourse',  cx: 62,  cy: 170, rx: 38, ry: 62, density: 32 },
  { id: 'zM',  label: 'Main Concourse',  cx: 200, cy: 170, rx: 65, ry: 45, density: 68 },
]

export const INITIAL_QUEUES: LiveQueue[] = [
  { id: 'qF1', label: 'Food Stand A1',   type: 'food',     waitTime: 22, trend: 'rising',  x: 338, y: 108 },
  { id: 'qF2', label: 'Food Stand B2',   type: 'food',     waitTime: 8,  trend: 'stable',  x: 62,  y: 108 },
  { id: 'qF3', label: 'Food Kiosk C',    type: 'food',     waitTime: 5,  trend: 'falling', x: 338, y: 232 },
  { id: 'qR1', label: 'Restroom North',  type: 'restroom', waitTime: 18, trend: 'rising',  x: 200, y: 42  },
  { id: 'qR2', label: 'Restroom East',   type: 'restroom', waitTime: 4,  trend: 'stable',  x: 358, y: 170 },
  { id: 'qR3', label: 'Restroom West',   type: 'restroom', waitTime: 6,  trend: 'stable',  x: 42,  y: 170 },
]

export const INITIAL_EXITS: LiveExit[] = [
  { id: 'eN', label: 'Exit North', density: 88, estimatedTime: 22, x: 200, y: 18  },
  { id: 'eE', label: 'Exit East',  density: 42, estimatedTime: 9,  x: 378, y: 162 },
  { id: 'eW', label: 'Exit West',  density: 24, estimatedTime: 4,  x: 22,  y: 162 },
  { id: 'eS', label: 'Exit South', density: 62, estimatedTime: 14, x: 200, y: 318 },
]

// ─── Noise helpers ────────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)) }

function jitter(v: number, range: number, min: number, max: number) {
  return clamp(v + (Math.random() - 0.5) * range * 2, min, max)
}

// ─── Mode multipliers ─────────────────────────────────────────────────────────

const MODE_MULT: Record<Mode, { occ: number; wait: number; queue: number }> = {
  normal: { occ: 1.0, wait: 1.0, queue: 1.0 },
  peak:   { occ: 1.4, wait: 1.6, queue: 1.8 },
  exit:   { occ: 1.6, wait: 0.3, queue: 0.4 },
}

// ─── Tick: evolve state ───────────────────────────────────────────────────────

export function tickGates(gates: LiveGate[], mode: Mode): LiveGate[] {
  const m = MODE_MULT[mode]
  return gates.map(g => {
    const newOcc = clamp(jitter(g.occupancy * m.occ, 4, 5, 98), 5, 98)
    const newWait = clamp(Math.round(jitter(g.waitTime * m.wait, 3, 1, 55)), 1, 55)
    const gateTrend: LiveGate['trend'] = newOcc > g.occupancy + 2 ? 'rising' : newOcc < g.occupancy - 2 ? 'falling' : 'stable'
    return { ...g, occupancy: Math.round(newOcc), waitTime: newWait, trend: gateTrend }
  })
}

export function tickZones(zones: LiveZone[], mode: Mode): LiveZone[] {
  const m = MODE_MULT[mode]
  return zones.map(z => ({
    ...z,
    density: clamp(Math.round(jitter(z.density * m.occ, 5, 5, 98)), 5, 98),
  }))
}

export function tickQueues(queues: LiveQueue[], mode: Mode): LiveQueue[] {
  const m = MODE_MULT[mode]
  return queues.map(q => {
    const newWait = clamp(Math.round(jitter(q.waitTime * m.queue, 3, 1, 40)), 1, 40)
    const t: LiveQueue['trend'] = newWait > q.waitTime + 1 ? 'rising' : newWait < q.waitTime - 1 ? 'falling' : 'stable'
    return { ...q, waitTime: newWait, trend: t }
  })
}

export function tickExits(exits: LiveExit[], mode: Mode): LiveExit[] {
  if (mode !== 'exit') return exits.map(e => ({ ...e, density: clamp(Math.round(jitter(e.density, 3, 5, 95)), 5, 95) }))
  // Exit rush: north and south get very crowded, west stays clear
  return exits.map(e => {
    const target = e.id === 'eW' ? 22 : e.id === 'eE' ? 55 : 88
    const newDensity = clamp(Math.round(jitter(target, 4, 5, 98)), 5, 98)
    const newTime = Math.round(newDensity / 5)
    return { ...e, density: newDensity, estimatedTime: newTime }
  })
}
