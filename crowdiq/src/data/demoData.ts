import type { DemoScenario, VenueState } from '../types'

const peakEntryState: VenueState = {
  phase: 'ingress',
  totalOccupancy: 62,
  gates: [
    { id: 'g1', name: 'Gate A — North', waitTime: 42, queueLength: 380, capacity: 400, isRecommended: false },
    { id: 'g2', name: 'Gate B — North East', waitTime: 28, queueLength: 210, capacity: 400, isRecommended: false },
    { id: 'g3', name: 'Gate C — East', waitTime: 8, queueLength: 60, capacity: 400, isRecommended: true },
    { id: 'g4', name: 'Gate D — South East', waitTime: 15, queueLength: 120, capacity: 400, isRecommended: false },
    { id: 'g5', name: 'Gate E — South', waitTime: 35, queueLength: 290, capacity: 400, isRecommended: false },
    { id: 'g6', name: 'Gate F — South West', waitTime: 22, queueLength: 180, capacity: 400, isRecommended: false },
    { id: 'g7', name: 'Gate G — West', waitTime: 11, queueLength: 85, capacity: 400, isRecommended: false },
    { id: 'g8', name: 'Gate H — North West', waitTime: 19, queueLength: 150, capacity: 400, isRecommended: false },
  ],
  zones: [
    { id: 'z1', name: 'North Stand', occupancy: 88, capacity: 5000, level: 'critical', x: 200, y: 80 },
    { id: 'z2', name: 'South Stand', occupancy: 72, capacity: 5000, level: 'high', x: 200, y: 320 },
    { id: 'z3', name: 'East Concourse', occupancy: 35, capacity: 3000, level: 'moderate', x: 340, y: 200 },
    { id: 'z4', name: 'West Concourse', occupancy: 28, capacity: 3000, level: 'low', x: 60, y: 200 },
    { id: 'z5', name: 'Main Concourse', occupancy: 65, capacity: 4000, level: 'high', x: 200, y: 200 },
    { id: 'z6', name: 'VIP Level', occupancy: 45, capacity: 1000, level: 'moderate', x: 200, y: 150 },
  ],
  queues: [
    { id: 'q1', name: 'Concession A — Level 1', type: 'concession', waitTime: 22 },
    { id: 'q2', name: 'Concession B — Level 2', type: 'concession', waitTime: 8, isAlternative: true },
    { id: 'q3', name: 'Concession C — East Wing', type: 'concession', waitTime: 5, isAlternative: true },
    { id: 'q4', name: 'Restroom — North', type: 'restroom', waitTime: 18 },
    { id: 'q5', name: 'Restroom — East', type: 'restroom', waitTime: 4, isAlternative: true },
    { id: 'q6', name: 'Restroom — West', type: 'restroom', waitTime: 6, isAlternative: true },
  ],
  incidents: [
    { id: 'i1', severity: 'high', location: 'Gate A — North', description: 'Crowd surge detected', action: 'Redirect fans to Gate C or G' },
    { id: 'i2', severity: 'medium', location: 'North Stand', description: 'Occupancy at 88%', action: 'Deploy 3 staff to manage flow' },
  ],
  staff: [
    { id: 's1', name: 'Officer Chen', location: 'Gate A', status: 'deployed' },
    { id: 's2', name: 'Officer Patel', location: 'North Stand', status: 'en_route' },
    { id: 's3', name: 'Officer Kim', location: 'Command Center', status: 'available' },
    { id: 's4', name: 'Officer Torres', location: 'East Concourse', status: 'available' },
  ],
  exits: [
    { id: 'e1', name: 'Exit A — North', density: 'critical', estimatedTime: 18, isRecommended: false },
    { id: 'e2', name: 'Exit B — East', density: 'moderate', estimatedTime: 8, isRecommended: false },
    { id: 'e3', name: 'Exit C — West', density: 'low', estimatedTime: 3, isRecommended: true },
  ],
}

const halftimeState: VenueState = {
  phase: 'halftime',
  totalOccupancy: 94,
  gates: peakEntryState.gates.map(g => ({ ...g, waitTime: 2, queueLength: 10 })),
  zones: [
    { id: 'z1', name: 'North Stand', occupancy: 92, capacity: 5000, level: 'critical', x: 200, y: 80 },
    { id: 'z2', name: 'South Stand', occupancy: 88, capacity: 5000, level: 'critical', x: 200, y: 320 },
    { id: 'z3', name: 'East Concourse', occupancy: 78, capacity: 3000, level: 'high', x: 340, y: 200 },
    { id: 'z4', name: 'West Concourse', occupancy: 55, capacity: 3000, level: 'moderate', x: 60, y: 200 },
    { id: 'z5', name: 'Main Concourse', occupancy: 95, capacity: 4000, level: 'critical', x: 200, y: 200 },
    { id: 'z6', name: 'VIP Level', occupancy: 60, capacity: 1000, level: 'high', x: 200, y: 150 },
  ],
  queues: [
    { id: 'q1', name: 'Concession A — Level 1', type: 'concession', waitTime: 28 },
    { id: 'q2', name: 'Concession B — Level 2', type: 'concession', waitTime: 24 },
    { id: 'q3', name: 'Concession C — East Wing', type: 'concession', waitTime: 12, isAlternative: true },
    { id: 'q4', name: 'Restroom — North', type: 'restroom', waitTime: 22 },
    { id: 'q5', name: 'Restroom — East', type: 'restroom', waitTime: 14, isAlternative: true },
    { id: 'q6', name: 'Restroom — West', type: 'restroom', waitTime: 9, isAlternative: true },
  ],
  incidents: [
    { id: 'i1', severity: 'critical', location: 'Main Concourse', description: 'Extreme congestion at halftime', action: 'Activate overflow routing to West Concourse' },
    { id: 'i2', severity: 'high', location: 'Concession A', description: 'Queue exceeds 25 min', action: 'Promote order-ahead to fans in section' },
    { id: 'i3', severity: 'medium', location: 'Restroom — North', description: 'Queue at 22 min', action: 'Direct fans to East/West restrooms' },
  ],
  staff: peakEntryState.staff,
  exits: peakEntryState.exits,
}

const postEventState: VenueState = {
  phase: 'post_event',
  totalOccupancy: 98,
  gates: peakEntryState.gates.map(g => ({ ...g, waitTime: 0, queueLength: 0 })),
  zones: [
    { id: 'z1', name: 'North Stand', occupancy: 98, capacity: 5000, level: 'critical', x: 200, y: 80 },
    { id: 'z2', name: 'South Stand', occupancy: 96, capacity: 5000, level: 'critical', x: 200, y: 320 },
    { id: 'z3', name: 'East Concourse', occupancy: 82, capacity: 3000, level: 'critical', x: 340, y: 200 },
    { id: 'z4', name: 'West Concourse', occupancy: 38, capacity: 3000, level: 'moderate', x: 60, y: 200 },
    { id: 'z5', name: 'Main Concourse', occupancy: 90, capacity: 4000, level: 'critical', x: 200, y: 200 },
    { id: 'z6', name: 'VIP Level', occupancy: 70, capacity: 1000, level: 'high', x: 200, y: 150 },
  ],
  queues: peakEntryState.queues.map(q => ({ ...q, waitTime: 0 })),
  incidents: [
    { id: 'i1', severity: 'critical', location: 'Exit A — North', description: 'Exit blocked — crowd surge', action: 'Immediately redirect to Exit C (West)' },
    { id: 'i2', severity: 'high', location: 'Main Concourse', description: 'Bottleneck forming', action: 'Open auxiliary exit corridors' },
  ],
  staff: peakEntryState.staff,
  exits: [
    { id: 'e1', name: 'Exit A — North', density: 'critical', estimatedTime: 25, isRecommended: false },
    { id: 'e2', name: 'Exit B — East', density: 'high', estimatedTime: 12, isRecommended: false },
    { id: 'e3', name: 'Exit C — West', density: 'low', estimatedTime: 4, isRecommended: true },
    { id: 'e4', name: 'Exit D — South', density: 'moderate', estimatedTime: 8, isRecommended: false },
  ],
}

export const scenarios: DemoScenario[] = [
  {
    id: 'peak_entry',
    label: 'Peak Entry',
    description: '15,000 fans arriving — gate congestion building',
    state: peakEntryState,
  },
  {
    id: 'halftime_rush',
    label: 'Halftime Rush',
    description: 'Full capacity — concession and restroom surge',
    state: halftimeState,
  },
  {
    id: 'post_event_exit',
    label: 'Post-Event Exit',
    description: '18,000 fans exiting — dynamic routing active',
    state: postEventState,
  },
]

export const defaultScenario = scenarios[0]
