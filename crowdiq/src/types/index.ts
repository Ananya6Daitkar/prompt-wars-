export type DensityLevel = 'low' | 'moderate' | 'high' | 'critical'
export type EventPhase = 'pre_event' | 'ingress' | 'in_progress' | 'halftime' | 'post_event'
export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type RouteType = 'fastest' | 'least_crowded' | 'accessible'
export type ScenarioId = 'peak_entry' | 'halftime_rush' | 'post_event_exit'

export interface CrowdZone {
  id: string
  name: string
  occupancy: number // 0-100
  capacity: number
  level: DensityLevel
  x: number // SVG position
  y: number
}

export interface Gate {
  id: string
  name: string
  waitTime: number // minutes
  queueLength: number
  capacity: number
  isRecommended: boolean
}

export interface QueueLocation {
  id: string
  name: string
  type: 'concession' | 'restroom'
  waitTime: number // minutes
  isAlternative?: boolean
}

export interface Incident {
  id: string
  severity: Severity
  location: string
  description: string
  action: string
}

export interface StaffMember {
  id: string
  name: string
  location: string
  status: 'available' | 'deployed' | 'en_route'
}

export interface ExitRoute {
  id: string
  name: string
  density: DensityLevel
  estimatedTime: number // minutes
  isRecommended: boolean
}

export interface VenueState {
  phase: EventPhase
  totalOccupancy: number
  gates: Gate[]
  zones: CrowdZone[]
  queues: QueueLocation[]
  incidents: Incident[]
  staff: StaffMember[]
  exits: ExitRoute[]
}

export interface DemoScenario {
  id: ScenarioId
  label: string
  description: string
  state: VenueState
}
