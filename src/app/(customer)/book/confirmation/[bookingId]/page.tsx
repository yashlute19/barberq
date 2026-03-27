'use client'
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/store/booking-store';
import { addMinutes, format } from 'date-fns';
import type { Booking } from '@/types/booking';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const resetStore = useBookingStore((state) => state.reset);

  useEffect(() => {
    resetStore();

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/bookings/${bookingId}`);
        if (res.data.success) {
          setBooking(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load booking:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId, resetStore]);

  const handleDownloadICS = () => {
    if (!booking) return;

    const start = new Date(`${booking.date.split('T')[0]}T${booking.timeSlot}:00`);
    const end = addMinutes(start, booking.duration);
    
    const content = [
      'BEGIN:VCALENDAR', 
      'VERSION:2.0', 
      'PRODID:-//BarberQ//EN',
      'BEGIN:VEVENT',
      `DTSTART:${format(start, "yyyyMMdd'T'HHmmss")}`,
      `DTEND:${format(end, "yyyyMMdd'T'HHmmss")}`,
      `SUMMARY:${booking.service} Appointment`,
      `DESCRIPTION:Booking ID: ${booking.id}`,
      'STATUS:CONFIRMED', 
      'END:VEVENT', 
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barberq-${booking.id.slice(-6)}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center space-y-4">
        <span className="material-symbols-outlined text-6xl text-error">error</span>
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
        <Link href="/" className="text-primary hover:underline font-bold">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-hidden flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl h-16 flex justify-center items-center px-6 border-b border-outline-variant/10">
        <Link href="/" className="text-xl font-bold tracking-tighter text-primary">
          BarberQ
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 z-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-full max-w-[480px] space-y-8 text-center mt-10">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary shadow-sm ring-8 ring-primary/5">
              <span className="material-symbols-outlined text-5xl">check_circle</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
              Booking Confirmed!
            </h1>
            <p className="text-on-surface-variant text-sm max-w-xs mx-auto">
              Your seat is reserved. We&apos;re preparing the tools for your arrival.
            </p>
          </div>

          <div className="relative overflow-hidden bg-surface-container-low border-l-4 border-primary rounded-xl p-8 text-left transition-all hover:bg-surface-container shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/70 block mb-1">REFERENCE NUMBER</span>
                <code className="text-sm font-mono font-bold text-on-surface">#{booking.id.slice(-6).toUpperCase()}</code>
              </div>
              <div className="px-3 py-1 rounded bg-primary text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                 {booking.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">BARBER</span>
                <p className="text-on-surface font-semibold">{booking.barber?.name || 'Any Barber'}</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">SERVICE DURATION</span>
                <p className="text-on-surface font-semibold">{booking.duration} min</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">SERVICE</span>
                <p className="text-on-surface font-semibold">{booking.service}</p>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">DATE &amp; TIME</span>
                <div className="flex items-center gap-2 text-on-surface font-bold text-lg">
                  <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                  <span>{format(new Date(booking.date), 'MMM dd, yyyy')}</span>
                  <span className="text-primary">•</span>
                  <span>{parseTimeString(booking.timeSlot)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={handleDownloadICS}
              className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">event_available</span>
              Add to Calendar
            </button>
            <Link href="/queue" className="w-full bg-surface-container border border-outline-variant/10 hover:bg-surface-container-low text-on-surface font-bold py-4 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">reorder</span>
              Check Queue Status
            </Link>
          </div>

          <div className="pt-4">
            <Link href="/" className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Home
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
}

function parseTimeString(time24: string) {
  const [h, m] = time24.split(':');
  let hh = parseInt(h);
  const ampm = hh >= 12 ? 'PM' : 'AM';
  hh = hh % 12;
  hh = hh ? hh : 12;
  return `${hh.toString().padStart(2, '0')}:${m} ${ampm}`;
}
