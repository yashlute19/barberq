import { create } from 'zustand'
import type { QueueEntry, QueueStats } from '@/types/queue'

interface QueueStore {
  entries: QueueEntry[]
  stats: QueueStats | null
  isLoading: boolean
  error: string | null
  setEntries: (entries: QueueEntry[]) => void
  setStats: (stats: QueueStats) => void
  setLoading: (v: boolean) => void
  setError: (v: string | null) => void
  updateEntry: (id: string, updates: Partial<QueueEntry>) => void
  removeEntry: (id: string) => void
  reorderEntries: (entries: QueueEntry[]) => void
}

export const useQueueStore = create<QueueStore>((set) => ({
  entries: [], stats: null, isLoading: false, error: null,
  setEntries: (entries) => set({ entries }),
  setStats: (stats) => set({ stats }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  updateEntry: (id, updates) => set((s) => ({
    entries: s.entries.map(e => e.id === id ? { ...e, ...updates } : e)
  })),
  removeEntry: (id) => set((s) => ({ entries: s.entries.filter(e => e.id !== id) })),
  reorderEntries: (entries) => set({ entries }),
}))
