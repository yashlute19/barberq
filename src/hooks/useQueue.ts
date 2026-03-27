'use client'
import { useEffect, useCallback } from 'react'
import { useQueueStore } from '@/store/queue-store'
import { realtimeClient } from '@/lib/supabase-realtime'
import axios from 'axios'

export function useQueue(salonId: string) {
  const store = useQueueStore()

  const fetchQueue = useCallback(async () => {
    if (!salonId) return
    store.setLoading(true)
    store.setError(null)
    try {
      const res = await axios.get(`/api/queue?salonId=${salonId}`)
      if (res.data.success) {
        store.setEntries(res.data.data.entries)
        store.setStats(res.data.data.stats)
      }
    } catch {
      store.setError('Failed to load queue')
    } finally {
      store.setLoading(false)
    }
  }, [salonId, store.setEntries, store.setStats, store.setLoading, store.setError])

  useEffect(() => {
  if (!salonId) return

  fetchQueue()

  const channel = realtimeClient
    .channel('queue-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'QueueEntry',
        filter: `salonId=eq.${salonId}`,
      },
      () => fetchQueue()
    )
    .subscribe()

  return () => {
    realtimeClient.removeChannel(channel)
  }
}, [salonId, fetchQueue])

  const updateStatus = async (id: string, status: string, barberId?: string) => {
    try { await axios.patch(`/api/queue/${id}`, { status, barberId }) }
    catch { store.setError('Failed to update status') }
  }

  const addWalkIn = async (customerName?: string, customerPhone?: string, barberId?: string) => {
    try {
      const res = await axios.post('/api/queue/join', { salonId, customerName, customerPhone, barberId })
      return res.data.data
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.error || err.message : err instanceof Error ? err.message : 'Failed to join queue'
      store.setError(msg)
      throw new Error(msg)
    }
  }

  const reorder = async (reorderedEntries: { id: string; position: number }[]) => {
    try { await axios.patch('/api/queue/reorder', { entries: reorderedEntries }) }
    catch { store.setError('Failed to reorder') }
  }

  return { ...store, fetchQueue, updateStatus, addWalkIn, reorder }
}
