export type Mode = 'normal' | 'peak' | 'exit'

export interface LiveGate {
  id: string
  label: string
  shortLabel: string
  occupancy: number   // 0-100
  waitTime: number    // minutes
  trend: 'rising' | 'stable' | 'falling'
  // SVG map position
  x: number
  y: number
}

export interface LiveZone {
  id: string
  label: string
  cx: number
  cy: number
  rx: number
  ry: number
  density: number  // 0-100
}

export interface LiveQueue {
  id: string
  label: string
  type: 'food' | 'restroom'
  waitTime: number
  trend: 'rising' | 'stable' | 'falling'
  x: number
  y: number
}

export interface LiveExit {
  id: string
  label: string
  density: number
  estimatedTime: number
  x: number
  y: number
}

export interface Recommendation {
  id: string
  type: 'gate' | 'route' | 'food' | 'restroom' | 'exit'
  title: string
  value: string
  reason: string
  timeSaved: string
  confidence: number  // 0-100
  updatedAt: number   // timestamp ms
  changed: boolean    // did it just change?
  detail: string      // "Why this?" full explanation
  routeFrom?: { x: number; y: number }
  routeTo?: { x: number; y: number }
}

export interface LiveVenueState {
  mode: Mode
  tick: number
  gates: LiveGate[]
  zones: LiveZone[]
  queues: LiveQueue[]
  exits: LiveExit[]
  recommendations: Recommendation[]
  lastNotification: string | null
  fansRedirected: number
}
