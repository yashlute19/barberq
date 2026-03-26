import { create } from 'zustand'
import type { BookingFormData } from '@/types/booking'

interface BookingStore {
  step: 1 | 2
  formData: Partial<BookingFormData>
  selectedBarber: { id: string; name: string } | null
  selectedDate: string | null
  selectedSlot: string | null
  setStep: (s: 1 | 2) => void
  setFormData: (d: Partial<BookingFormData>) => void
  setSelectedBarber: (b: { id: string; name: string } | null) => void
  setSelectedDate: (d: string | null) => void
  setSelectedSlot: (s: string | null) => void
  reset: () => void
}

export const useBookingStore = create<BookingStore>((set) => ({
  step: 1, formData: {}, selectedBarber: null, selectedDate: null, selectedSlot: null,
  setStep: (step) => set({ step }),
  setFormData: (data) => set((s) => ({ formData: { ...s.formData, ...data } })),
  setSelectedBarber: (selectedBarber) => set({ selectedBarber }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
  reset: () => set({ step: 1, formData: {}, selectedBarber: null, selectedDate: null, selectedSlot: null }),
}))
