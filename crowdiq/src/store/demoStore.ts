import { create } from 'zustand'
import { scenarios, defaultScenario } from '../data/demoData'
import type { ScenarioId, VenueState } from '../types'

interface DemoStore {
  activeScenarioId: ScenarioId
  venueState: VenueState
  selectedGateId: string | null
  activeTab: 'gates' | 'queues' | 'exits'
  setScenario: (id: ScenarioId) => void
  selectGate: (id: string | null) => void
  setTab: (tab: 'gates' | 'queues' | 'exits') => void
}

export const useDemoStore = create<DemoStore>((set) => ({
  activeScenarioId: defaultScenario.id,
  venueState: defaultScenario.state,
  selectedGateId: null,
  activeTab: 'gates',

  setScenario: (id) => {
    const scenario = scenarios.find(s => s.id === id)
    if (scenario) set({ activeScenarioId: id, venueState: scenario.state, selectedGateId: null })
  },

  selectGate: (id) => set({ selectedGateId: id }),

  setTab: (tab) => set({ activeTab: tab }),
}))
