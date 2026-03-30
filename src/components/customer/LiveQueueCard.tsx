'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface QueueStats {
  totalWaiting: number
  estimatedWaitMinutes: number
  isOpen: boolean
}

export default function LiveQueueCard() {
  const [stats, setStats] = useState<QueueStats>({
    totalWaiting: 0,
    estimatedWaitMinutes: 0,
    isOpen: true,
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `/api/queue?salonId=${process.env.NEXT_PUBLIC_SALON_ID}`
        )
        if (res.data.success) setStats(res.data.data.stats)
      } catch {
        // silently fail — keep default zeros
      }
    }
    fetch()
    const interval = setInterval(fetch, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  const maxSlots = 6
  const filledWidth = `${Math.min((stats.totalWaiting / maxSlots) * 100, 100)}%`

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_40px_80px_-15px_rgba(0,104,95,0.08)] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
        <span className="material-symbols-outlined text-8xl" data-icon="hourglass_empty">hourglass_empty</span>
      </div>

      <div className="flex justify-between items-start mb-8 relative">
        <div>
          <span className="label-sm text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-2 block">
            Live Status
          </span>
          <h3 className="text-2xl font-bold text-on-surface flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary"
              data-icon="schedule"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              schedule
            </span>
            {stats.totalWaiting === 0
              ? 'No one waiting'
              : `${stats.totalWaiting} ${stats.totalWaiting === 1 ? 'person' : 'people'} waiting`}
          </h3>
        </div>
        <div className="bg-teal-50 rounded-full px-3 py-1 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="space-y-6 relative">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-on-surface-variant text-sm font-medium">
              Estimated wait time
            </span>
            {stats.totalWaiting === 0 ? (
              <span className="text-3xl font-black text-primary">
                0 <span className="text-sm font-bold uppercase tracking-tighter">min</span>
              </span>
            ) : (
              <span className="text-3xl font-black text-primary">
                ~{stats.estimatedWaitMinutes}{' '}
                <span className="text-sm font-bold uppercase tracking-tighter">min</span>
              </span>
            )}
          </div>

          <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: filledWidth }}
            />
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest">
              {stats.totalWaiting} of {maxSlots} slots filled
            </span>
            <span className="text-[10px] font-medium text-outline italic">
              {stats.totalWaiting === 0 ? 'Walk in anytime' : 'Updated just now'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}