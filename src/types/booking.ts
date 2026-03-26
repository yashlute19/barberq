export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  salonId: string
  barberId: string | null
  customerName: string
  customerPhone: string
  customerEmail: string | null
  service: string
  price: number
  date: string
  timeSlot: string
  duration: number
  status: BookingStatus
  notes: string | null
  createdAt: string
  updatedAt: string
  barber?: { id: string; name: string } | null
  salon?: { name: string; phone: string | null } | null
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface BookingFormData {
  barberId: string
  date: string
  timeSlot: string
  customerName: string
  customerPhone: string
  customerEmail: string
  service: string
  notes?: string
}
