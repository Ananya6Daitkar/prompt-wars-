import type { LiveGate, LiveQueue, LiveExit, LiveZone, Recommendation, Mode } from './types'

function now() { return Date.now() }

function confidence(best: number, second: number): number {
  const diff = second - best
  return Math.min(99, Math.round(70 + diff * 1.5))
}

// ─── Gate recommendation ──────────────────────────────────────────────────────
export function recommendGate(gates: LiveGate[], prev?: Recommendation): Recommendation {
  const sorted = [...gates].sort((a, b) => a.waitTime - b.waitTime)
  const best = sorted[0]
  const second = sorted[1]
  const timeSaved = second.waitTime - best.waitTime
  const conf = confidence(best.waitTime, second.waitTime)

  const changed = prev?.value !== best.label

  return {
    id: 'gate',
    type: 'gate',
    title: 'Best Gate',
    value: best.label,
    reason: `${Math.round(100 - best.occupancy)}% less crowd than avg`,
    timeSaved: timeSaved > 0 ? `${timeSaved} min faster` : 'Fastest available',
    confidence: conf,
    updatedAt: now(),
    changed,
    detail: `${best.label} selected because it has only ${best.waitTime}m wait vs ${second.waitTime}m at ${second.label}. ${second.label} is ${second.trend === 'rising' ? 'rising fast' : 'holding steady'} and will reach ${Math.min(99, second.occupancy + 8)}% capacity in ~3 minutes. CrowdIQ is routing ${Math.round(Math.random() * 80 + 40)} fans here now.`,
    routeFrom: { x: 200, y: 170 },
    routeTo: { x: best.x, y: best.y },
  }
}

// ─── Route recommendation ─────────────────────────────────────────────────────
export function recommendRoute(zones: LiveZone[], gates: LiveGate[], prev?: Recommendation): Recommendation {
  const bestGate = [...gates].sort((a, b) => a.waitTime - b.waitTime)[0]
  const mainZone = zones.find(z => z.id === 'zM')!
  const altZone = zones.find(z => z.id === 'zW') || zones.find(z => z.id === 'zE')!
  const useDirect = mainZone.density < 60
  const routeLabel = useDirect ? 'Direct via Main Concourse' : `Via ${altZone.label}`
  const timeSaved = useDirect ? 2 : 4
  const conf = Math.min(97, Math.round(78 + (100 - mainZone.density) * 0.2))
  const changed = prev?.value !== routeLabel

  return {
    id: 'route',
    type: 'route',
    title: 'Fastest Route',
    value: routeLabel,
    reason: `${Math.round(100 - (useDirect ? mainZone.density : altZone.density))}% clear path`,
    timeSaved: `${timeSaved} min faster`,
    confidence: conf,
    updatedAt: now(),
    changed,
    detail: `Main Concourse is at ${mainZone.density}% density. ${useDirect ? 'Direct route is clear — no detour needed.' : `Routing via ${altZone.label} (${altZone.density}% density) saves ${timeSaved} minutes vs pushing through the main corridor.`} Route recalculates every 8 seconds.`,
    routeFrom: { x: bestGate.x, y: bestGate.y },
    routeTo: { x: 200, y: 170 },
  }
}

// ─── Food recommendation ──────────────────────────────────────────────────────
export function recommendFood(queues: LiveQueue[], prev?: Recommendation): Recommendation {
  const food = queues.filter(q => q.type === 'food').sort((a, b) => a.waitTime - b.waitTime)
  const best = food[0]
  const worst = food[food.length - 1]
  const saved = worst.waitTime - best.waitTime
  const conf = confidence(best.waitTime, food[1]?.waitTime ?? best.waitTime + 5)
  const changed = prev?.value !== best.label

  return {
    id: 'food',
    type: 'food',
    title: 'Shortest Food Line',
    value: best.label,
    reason: `${saved} min shorter than nearest alt`,
    timeSaved: `${saved} min saved`,
    confidence: conf,
    updatedAt: now(),
    changed,
    detail: `${best.label} has only ${best.waitTime}m wait. ${worst.label} is at ${worst.waitTime}m and ${worst.trend === 'rising' ? 'still rising' : 'holding'}. Order-ahead available — skip the queue entirely.`,
  }
}

// ─── Restroom recommendation ──────────────────────────────────────────────────
export function recommendRestroom(queues: LiveQueue[], prev?: Recommendation): Recommendation {
  const rest = queues.filter(q => q.type === 'restroom').sort((a, b) => a.waitTime - b.waitTime)
  const best = rest[0]
  const second = rest[1]
  const saved = second.waitTime - best.waitTime
  const conf = confidence(best.waitTime, second.waitTime)
  const changed = prev?.value !== best.label

  return {
    id: 'restroom',
    type: 'restroom',
    title: 'Nearest Low-Wait Restroom',
    value: best.label,
    reason: `${saved} min less than next option`,
    timeSaved: `${saved} min saved`,
    confidence: conf,
    updatedAt: now(),
    changed,
    detail: `${best.label} has ${best.waitTime}m wait. ${second.label} is at ${second.waitTime}m and ${second.trend === 'rising' ? 'rising' : 'stable'}. 2 min walk from your current position.`,
  }
}

// ─── Exit recommendation ──────────────────────────────────────────────────────
export function recommendExit(exits: LiveExit[], mode: Mode, prev?: Recommendation): Recommendation {
  const sorted = [...exits].sort((a, b) => a.estimatedTime - b.estimatedTime)
  const best = sorted[0]
  const second = sorted[1]
  const saved = second.estimatedTime - best.estimatedTime
  const conf = confidence(best.estimatedTime, second.estimatedTime)
  const changed = prev?.value !== best.label

  return {
    id: 'exit',
    type: 'exit',
    title: 'Smart Exit Route',
    value: best.label,
    reason: mode === 'exit' ? `${Math.round(100 - best.density)}% less congestion` : 'Optimal post-event route',
    timeSaved: saved > 0 ? `${saved} min faster` : 'Fastest exit',
    confidence: conf,
    updatedAt: now(),
    changed,
    detail: `${best.label} is at ${best.density}% density — ${Math.round(100 - best.density)}% clearer than ${second.label} (${second.density}%). ${mode === 'exit' ? `Exit rush active. ${Math.round(Math.random() * 200 + 100)} fans already redirected here.` : 'Pre-positioning for post-event exit.'}`,
    routeFrom: { x: 200, y: 170 },
    routeTo: { x: best.x, y: best.y },
  }
}

// ─── Full recommendation set ──────────────────────────────────────────────────
export function computeRecommendations(
  gates: LiveGate[],
  zones: LiveZone[],
  queues: LiveQueue[],
  exits: LiveExit[],
  mode: Mode,
  prev: Recommendation[]
): Recommendation[] {
  const prevMap = Object.fromEntries(prev.map(r => [r.id, r]))
  return [
    recommendGate(gates, prevMap['gate']),
    recommendRoute(zones, gates, prevMap['route']),
    recommendFood(queues, prevMap['food']),
    recommendRestroom(queues, prevMap['restroom']),
    recommendExit(exits, mode, prevMap['exit']),
  ]
}
