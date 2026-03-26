'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStats } from '@/hooks/useStats';
import { useQueue } from '@/hooks/useQueue';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboardPage() {
  const salonId = process.env.NEXT_PUBLIC_SALON_ID!;
  const [userName, setUserName] = useState('Admin'); // Placeholder, could fetch from session
  const { stats, isLoading: statsLoading } = useStats(salonId);
  const { entries: queueEntries, isLoading: queueLoading, updateStatus, removeEntry } = useQueue(salonId);
  const [barbers, setBarbers] = useState<any[]>([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await axios.get(`/api/barbers?salonId=${salonId}`);
        if (res.data.success) {
          setBarbers(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch barbers', err);
      }
    };
    fetchBarbers();
  }, [salonId]);

  return (
    <div className="p-8 pb-20 bg-surface min-h-screen">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 mt-8 md:mt-0">
        <div>
          <p className="text-secondary font-medium tracking-wide text-[10px] uppercase opacity-70 mb-1">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          <h2 className="text-on-surface font-extrabold text-3xl tracking-tight">System Overview</h2>
        </div>
        <Link href="/admin/queue" className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 w-full sm:w-auto">
          <span className="material-symbols-outlined text-xl">reorder</span>
          View Live Queue
        </Link>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary shadow-sm relative overflow-hidden">
           {statsLoading && <div className="absolute inset-0 bg-surface-container/50 flex items-center justify-center"><Loader2 className="animate-spin w-5 h-5 text-primary"/></div>}
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Today&apos;s Bookings</p>
          <h3 className="text-3xl font-black text-on-surface">{stats?.bookingsToday || 0}</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-secondary shadow-sm relative overflow-hidden">
           {statsLoading && <div className="absolute inset-0 bg-surface-container/50 flex items-center justify-center"><Loader2 className="animate-spin w-5 h-5 text-secondary"/></div>}
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Active Queue</p>
          <h3 className="text-3xl font-black text-on-surface">{stats?.activeQueue || 0}</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-teal-500 shadow-sm relative overflow-hidden">
          {statsLoading && <div className="absolute inset-0 bg-surface-container/50 flex items-center justify-center"><Loader2 className="animate-spin w-5 h-5 text-teal-500"/></div>}
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Revenue Today (Est)</p>
          <h3 className="text-3xl font-black text-on-surface">₹{stats?.revenueToday || 0}</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-amber-500 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Staff Active</p>
          <h3 className="text-3xl font-black text-on-surface">{barbers.length}</h3>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Live Queue Panel */}
        <section className="xl:w-[55%] flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 flex justify-between items-center border-b border-surface-container-low">
              <h4 className="text-lg font-bold tracking-tight">Current Queue</h4>
              <Link href="/admin/queue" className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider hover:underline">
                <span className="material-symbols-outlined text-sm">add_circle</span>
                Manage Queue
              </Link>
            </div>
            <div className="p-2">
              <ul className="divide-y divide-surface-container-low">
                {queueLoading ? (
                   <li className="p-10 flex justify-center"><Loader2 className="animate-spin w-6 h-6 text-primary"/></li>
                ) : queueEntries.length === 0 ? (
                   <li className="p-10 text-center text-on-surface-variant text-sm font-bold">Queue is empty</li>
                ) : queueEntries.slice(0, 5).map((entry, i) => (
                  <li key={entry.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 group hover:bg-surface-container-low transition-colors rounded-lg">
                    <div className="flex items-center flex-1">
                      <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full text-xs mr-4 ${entry.status === 'in_service' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>{i+1}</div>
                      <div className="flex-1">
                        <h5 className="font-bold text-sm">{entry.customerName || 'Anonymous Walk-in'}</h5>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{entry.status.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      {entry.status === 'waiting' && <button onClick={() => updateStatus(entry.id, 'in_service')} className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"><span className="material-symbols-outlined">play_circle</span></button>}
                      {entry.status === 'in_service' && <button onClick={() => updateStatus(entry.id, 'done')} className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"><span className="material-symbols-outlined">check_circle</span></button>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Barber Station Overview</h4>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {barbers.slice(0, 3).map(barber => {
                   const initials = barber.name.split(' ').map((n:any)=>n[0]).join('').substring(0,2).toUpperCase();
                   return (
                   <div key={barber.id} className="flex items-center gap-3">
                     <div className="relative">
                       <div className="w-10 h-10 rounded-full bg-surface-container-highest flex justify-center items-center text-xs font-bold ring-2 ring-white text-on-surface">
                          {initials}
                       </div>
                       <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-white rounded-full"></span>
                     </div>
                     <div>
                       <p className="text-sm font-bold text-on-surface">{barber.name}</p>
                       <p className="text-[10px] text-teal-600 font-bold uppercase tracking-tight">Active</p>
                     </div>
                   </div>
                )})}
                {barbers.length === 0 && <p className="text-xs text-on-surface-variant col-span-3">No barbers available.</p>}
             </div>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="xl:w-[45%]">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm h-full">
            <div className="px-6 py-5 flex justify-between items-center border-b border-surface-container-low">
              <h4 className="text-lg font-bold tracking-tight">Today&apos;s Appointments</h4>
              <Link href="/admin/bookings" className="text-xs font-bold text-secondary uppercase tracking-wider hover:underline">View All</Link>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {statsLoading ? (
                   <div className="flex justify-center py-10"><Loader2 className="animate-spin w-6 h-6 text-primary"/></div>
                ) : stats?.upcomingBookings?.length === 0 ? (
                   <div className="text-center py-10 text-on-surface-variant font-bold text-sm">No upcoming appointments today.</div>
                ) : stats?.upcomingBookings?.map((booking: any) => (
                  <div key={booking.id} className="flex gap-4">
                    <div className="text-center min-w-[50px] shrink-0 mt-1">
                      <p className="text-xs font-black text-on-surface">{parseTimeString(booking.timeSlot).split(' ')[0]}</p>
                      <p className="text-[10px] text-on-surface-variant font-bold uppercase">{parseTimeString(booking.timeSlot).split(' ')[1]}</p>
                    </div>
                    <div className="flex-1 pb-6 border-b border-surface-container-low last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold text-on-surface leading-tight text-sm">{booking.customerName}</h5>
                        <span className="shrink-0 px-2 py-0.5 bg-surface-container-high text-on-surface-variant text-[9px] font-black rounded uppercase tracking-widest">{booking.status}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant font-medium mt-1 leading-snug">
                         {booking.service} <br/> <span className="text-primary font-bold">{booking.barber?.name || 'Any Barber'}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
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
