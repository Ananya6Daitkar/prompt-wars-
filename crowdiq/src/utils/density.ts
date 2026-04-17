import type { DensityLevel } from '../types'

export function getDensityLevel(occupancy: number): DensityLevel {
  if (occupancy >= 85) return 'critical'
  if (occupancy >= 67) return 'high'
  if (occupancy >= 34) return 'moderate'
  return 'low'
}

export function getDensityColor(level: DensityLevel): string {
  switch (level) {
    case 'critical': return '#ff3366'
    case 'high': return '#ffaa00'
    case 'moderate': return '#ffdd00'
    case 'low': return '#00ff88'
  }
}

export function getWaitColor(minutes: number): string {
  if (minutes > 20) return '#ff3366'
  if (minutes > 10) return '#ffaa00'
  return '#00ff88'
}
