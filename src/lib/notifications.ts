import { Resend } from 'resend'
import { bookingConfirmationTemplate, bookingStatusUpdateTemplate } from './email-templates'
import type { Booking } from '@/types/booking'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log('[EMAIL_SKIPPED] RESEND_API_KEY not set')
    return
  }
  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html })
    if (error) console.error('[EMAIL_SEND_ERROR]', error)
  } catch (error) {
    console.error('[EMAIL_ERROR]', error)
    // Never throw — email failure must not break booking flow
  }
}

export async function sendBookingConfirmation(
  booking: Booking & {
    barber?: { name: string } | null
    salon?: { name: string; phone: string | null } | null
  }
): Promise<void> {
  if (!booking.customerEmail) return // silently skip if no email provided

  const { subject, html } = bookingConfirmationTemplate({
    customerName: booking.customerName,
    bookingId: booking.id,
    barberName: booking.barber?.name ?? 'Any available barber',
    date: new Date(booking.date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }),
    timeSlot: booking.timeSlot,
    service: booking.service,
    salonName: booking.salon?.name ?? 'The Salon',
    salonPhone: booking.salon?.phone ?? 'the salon',
  })

  await sendEmail(booking.customerEmail, subject, html)
}

export async function sendBookingStatusUpdate(
  booking: Booking & { salon?: { name: string } | null },
  newStatus: string
): Promise<void> {
  if (!booking.customerEmail) return

  const { subject, html } = bookingStatusUpdateTemplate({
    customerName: booking.customerName,
    bookingId: booking.id,
    newStatus,
    salonName: booking.salon?.name ?? 'The Salon',
  })

  await sendEmail(booking.customerEmail, subject, html)
}
