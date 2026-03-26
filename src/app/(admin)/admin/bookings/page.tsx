'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { BookingStatus } from '@/types/booking';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const salonId = process.env.NEXT_PUBLIC_SALON_ID!;

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/bookings', {
        params: { salonId, status: filter, page, limit: 10 }
      });
      if (res.data.success) {
        setBookings(res.data.data.bookings);
        setTotalPages(res.data.data.totalPages);
        setTotal(res.data.data.total);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, page, salonId]);

  const handleUpdateStatus = async (id: string, status: string) => {
    if (!window.confirm(`Update booking to ${status}?`)) return;
    try {
      await axios.patch(`/api/bookings/${id}`, { status });
      fetchBookings(); // refresh
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const statusColors = {
    pending: 'bg-amber-50 text-amber-600 border-amber-100',
    confirmed: 'bg-teal-50 text-teal-600 border-teal-100',
    in_progress: 'bg-blue-50 text-blue-600 border-blue-100',
    completed: 'bg-slate-100 text-slate-500 border-slate-200',
    cancelled: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-surface min-h-screen xl:max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10 mt-8 md:mt-0">
        <div>
          <h1 className="text-3xl md:text-[2.75rem] font-bold tracking-tighter leading-tight">Appointments</h1>
          <p className="text-on-surface-variant font-medium mt-1">Manage and schedule your atelier sessions.</p>
        </div>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(status => (
          <button 
            key={status}
            onClick={() => { setFilter(status as any); setPage(1); }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap capitalize ${filter === status ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-surface-container-low border-b border-outline-variant/5">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Booking ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Barber</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Date &amp; Time</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Service</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-on-surface-variant">
                    No bookings found for the selected filter.
                  </td>
                </tr>
              ) : (
                bookings.map(booking => {
                  const initials = booking.customerName.split(' ').map((n:any) => n[0]).join('').substring(0, 2).toUpperCase();
                  
                  return (
                  <tr key={booking.id} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-6 py-5 text-sm font-medium text-on-surface-variant font-mono">#{booking.id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{initials}</div>
                        <span className="text-sm font-semibold">{booking.customerName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium">{booking.barber?.name || 'Any'}</td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold">{format(new Date(booking.date), 'MMM dd, yyyy')}</p>
                      <p className="text-xs text-on-surface-variant font-medium">{booking.timeSlot}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-surface-container-high px-2 py-1 rounded whitespace-nowrap">{booking.service}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${(statusColors as any)[booking.status]}`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/bookings/${booking.id}`} className="p-2 bg-surface-container hover:bg-surface-container-high rounded-lg transition-colors inline-block" title="View Details">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </Link>
                        {booking.status === 'pending' && (
                          <button onClick={() => handleUpdateStatus(booking.id, 'confirmed')} className="p-2 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-lg transition-colors inline-block" title="Confirm">
                            <span className="material-symbols-outlined text-lg">check</span>
                          </button>
                        )}
                        {(booking.status !== 'completed' && booking.status !== 'cancelled') && (
                           <button onClick={() => handleUpdateStatus(booking.id, 'cancelled')} className="p-2 bg-error/10 hover:bg-error/20 text-error rounded-lg transition-colors inline-block" title="Cancel Booking">
                             <span className="material-symbols-outlined text-lg">close</span>
                           </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )})
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-6 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest hidden sm:block">
            Showing {bookings.length > 0 ? (page - 1) * 10 + 1 : 0}-{Math.min(page * 10, total)} of {total} bookings
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container-low transition-colors disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm">
              {page}
            </div>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages || totalPages === 0}
              className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container-low transition-colors disabled:opacity-30"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
