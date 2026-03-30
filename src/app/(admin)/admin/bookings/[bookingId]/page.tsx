'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { BookingStatus } from '@/types/booking';
import { useRouter } from 'next/navigation';

export default function BookingDetailPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/bookings/${bookingId}`);
        if (res.data.success) {
          setBooking(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load booking details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleStatusUpdate = async (status: BookingStatus) => {
    if (!window.confirm(`Update booking status to ${status}?`)) return;
    setUpdating(true);
    try {
      const res = await axios.patch(`/api/bookings/${bookingId}`, { status });
      if (res.data.success) {
        setBooking(res.data.data);
      }
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStepStatusColor = (stepStatus: string, currentStatus: string) => {
    const sequence = ['pending', 'confirmed', 'in_progress', 'completed'];
    const currentIndex = sequence.indexOf(currentStatus);
    const stepIndex = sequence.indexOf(stepStatus);

    if (currentStatus === 'cancelled') return 'bg-surface-container-highest border-outline text-outline';
    if (stepIndex < currentIndex) return 'bg-primary text-white border-primary';
    if (stepIndex === currentIndex) return 'bg-primary text-white border-primary shadow-lg ring-4 ring-primary/20';
    return 'bg-surface-container-lowest border-2 border-outline-variant text-outline';
  };

  if (loading) {
     return <div className="flex-1 p-6 flex justify-center items-center min-h-screen bg-surface"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!booking) {
      return (
        <div className="flex-1 p-6 flex flex-col justify-center items-center min-h-screen bg-surface">
           <h2 className="text-xl font-bold mb-4">Booking not found</h2>
           <Link href="/admin/bookings" className="text-primary hover:underline">Back to Bookings</Link>
        </div>
      );
  }

  const initials = booking.customerName.split(' ').map((n:any)=>n[0]).join('').substring(0,2).toUpperCase();

  return (
    <div className="flex-1 p-6 md:p-8 min-h-screen bg-surface xl:max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 mt-8 md:mt-0">
        <div>
          <nav className="flex items-center space-x-2 text-[11px] text-on-surface-variant mb-2 uppercase tracking-[0.05em] font-medium">
            <Link href="/admin/bookings" className="hover:text-primary transition-colors">Bookings</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface">#{booking.id.slice(-6).toUpperCase()}</span>
          </nav>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Booking #{booking.id.slice(-6).toUpperCase()}</h1>
            <span className="px-3 py-1 bg-surface-container-high text-on-surface rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
              {booking.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mt-1 italic">Created: {format(new Date(booking.createdAt), 'MMM dd, h:mm a')}</p>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 xl:col-span-8 space-y-8">
          
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <h3 className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black mb-8">Service Status</h3>
            <div className="relative flex justify-between">
              <div className="absolute top-5 left-0 w-full h-[2px] bg-outline-variant/30 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${getStepStatusColor('pending', booking.status)}`}>
                  <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                </div>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-wider">Pending</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${getStepStatusColor('confirmed', booking.status)}`}>
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-center">Confirmed</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${getStepStatusColor('in_progress', booking.status)}`}>
                  <span className="material-symbols-outlined text-sm">content_cut</span>
                </div>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-center">In Progress</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${getStepStatusColor('completed', booking.status)}`}>
                  <span className="material-symbols-outlined text-sm">flag</span>
                </div>
                <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-center">Completed</span>
              </div>
            </div>
            {booking.status === 'cancelled' && (
              <div className="mt-6 p-4 bg-error/10 text-error rounded-lg flex items-center justify-center gap-2 font-bold text-sm">
                 <span className="material-symbols-outlined">cancel</span> This booking was cancelled.
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black">Customer Profile</h3>
                <span className="material-symbols-outlined text-on-surface-variant">person</span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full shrink-0 bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">{initials}</div>
                <div>
                  <h4 className="text-xl font-bold text-on-surface leading-tight">{booking.customerName}</h4>
                  <p className="text-sm text-primary font-medium tracking-tight">{booking.customerPhone}</p>
                </div>
              </div>
              {booking.customerEmail && (
                 <p className="text-sm text-on-surface-variant mt-2 mb-4">{booking.customerEmail}</p>
              )}
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black">Appointment Info</h3>
                <span className="material-symbols-outlined text-on-surface-variant">event</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant uppercase text-[10px] font-black tracking-wider">Barber</span>
                  <span className="font-bold">{booking.barber?.name || 'Any'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant uppercase text-[10px] font-black tracking-wider">Service</span>
                  <span className="font-bold">{booking.service}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant uppercase text-[10px] font-black tracking-wider">Schedule</span>
                  <span className="font-bold">{format(new Date(booking.date), 'MMM dd')} • {booking.timeSlot}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant uppercase text-[10px] font-black tracking-wider">Duration</span>
                  <span className="font-bold">{booking.duration} min</span>
                </div>
              </div>
            </section>
          </div>

          {booking.notes && (
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <h3 className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black mb-4">Customer Notes</h3>
              <p className="text-sm text-on-surface italic leading-relaxed bg-surface-container-low p-4 rounded-lg">
                &quot;{booking.notes}&quot;
              </p>
            </section>
          )}
        </div>

        <aside className="col-span-12 xl:col-span-4 space-y-8">
          
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="text-[10px] text-on-surface-variant uppercase tracking-widest font-black mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {booking.status === 'pending' && (
                <button 
                  onClick={() => handleStatusUpdate('confirmed')}
                  disabled={updating}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-teal-600 text-white rounded-full font-bold transition-all shadow-sm text-sm"
                >
                  <span className="material-symbols-outlined text-lg">check</span>
                  <span>Confirm Booking</span>
                </button>
              )}
              {booking.status === 'confirmed' && (
                <button 
                  onClick={() => handleStatusUpdate('in_progress')}
                  disabled={updating}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-primary text-white rounded-full font-bold transition-all shadow-sm text-sm"
                >
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                  <span>Start Service</span>
                </button>
              )}
              {booking.status === 'in_progress' && (
                <button 
                  onClick={() => handleStatusUpdate('completed')}
                  disabled={updating}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-800 text-white rounded-full font-bold transition-all shadow-sm text-sm dark:bg-slate-200 dark:text-slate-900"
                >
                  <span className="material-symbols-outlined text-lg">flag</span>
                  <span>Mark Completed</span>
                </button>
              )}
              
              {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                <div className="pt-4 border-t border-outline-variant/10 mt-4">
                  <button 
                    onClick={() => handleStatusUpdate('cancelled')}
                    disabled={updating}
                    className="w-full flex items-center justify-center space-x-2 py-3 text-error bg-error/10 hover:bg-error/20 rounded-full font-bold transition-all text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">cancel</span>
                    <span>Cancel Booking</span>
                  </button>
                </div>
              )}
            </div>
          </section>

        </aside>
      </div>
    </div>
  );
}
