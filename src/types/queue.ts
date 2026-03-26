export type QueueStatus = 'waiting' | 'in_service' | 'done' | 'removed'

export interface QueueEntry {
  id: string
  salonId: string
  barberId: string | null
  customerName: string | null
  customerPhone: string | null
  position: number
  status: QueueStatus
  joinedAt: string
  servedAt: string | null
  barber?: { id: string; name: string; status: string } | null
}

export interface QueueStats {
  totalWaiting: number
  estimatedWaitMinutes: number
  isOpen: boolean
}
