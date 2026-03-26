'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const barberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required')
});

type BarberFormData = z.infer<typeof barberSchema>;

export default function AdminBarbersPage() {
  const salonId = process.env.NEXT_PUBLIC_SALON_ID!;
  const [barbers, setBarbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  // Form
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BarberFormData>({
    resolver: zodResolver(barberSchema) // eslint-disable-next-line
  });

  const fetchBarbers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/barbers?salonId=${salonId}`);
      if (res.data.success) {
        setBarbers(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load barbers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarbers();
    // eslint-disable-next-line
  }, [salonId]);

  const onAddBarber = async (data: BarberFormData) => {
    try {
      await axios.post('/api/barbers', { ...data, salonId });
      setShowAddModal(false);
      reset();
      fetchBarbers();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to add barber');
    }
  };

  const onDeleteBarber = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this barber?')) return;
    try {
      await axios.delete(`/api/barbers/${id}`);
      fetchBarbers();
    } catch (err) {
      alert('Failed to remove barber');
    }
  };

  const openSchedule = async (id: string) => {
    setSelectedBarberId(id);
    setShowScheduleModal(true);
    setLoadingSchedule(true);
    try {
      const res = await axios.get(`/api/barbers/${id}/schedule`);
      if (res.data.success) {
        // Sort by dayOfWeek
        setScheduleData(res.data.data.sort((a: any, b: any) => a.dayOfWeek - b.dayOfWeek));
      }
    } catch (err) {
      alert('Failed to load schedule');
    } finally {
      setLoadingSchedule(false);
    }
  };

  const updateScheduleItem = (index: number, field: string, value: any) => {
    const updated = [...scheduleData];
    updated[index] = { ...updated[index], [field]: value };
    setScheduleData(updated);
  };

  const saveSchedule = async () => {
    if (!selectedBarberId) return;
    try {
      await axios.put(`/api/barbers/${selectedBarberId}/schedule`, scheduleData);
      setShowScheduleModal(false);
      alert('Schedule updated');
    } catch (err) {
      alert('Failed to update schedule');
    }
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="flex-1 p-6 md:p-12 min-h-screen bg-surface xl:max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 mt-8 md:mt-0">
        <div>
          <p className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-2">Management Console</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">Barbers &amp; Staff</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90 active:scale-95 shadow-lg w-full sm:w-auto"
        >
          <span className="material-symbols-outlined">person_add</span>
          <span>Add Barber</span>
        </button>
      </header>

      {loading ? (
         <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {barbers.map(barber => {
            const initials = barber.name.split(' ').map((n:any)=>n[0]).join('').substring(0,2).toUpperCase();
            return (
            <div key={barber.id} className="bg-surface-container-lowest rounded-[20px] p-6 transition-all hover:translate-y-[-4px] shadow-sm border border-outline-variant/10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full shrink-0 bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xl ring-4 ring-surface-container-low">
                      {initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface leading-tight">{barber.name}</h3>
                      <span className="bg-surface-container-high text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mt-1">{barber.role}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button onClick={() => openSchedule(barber.id)} className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-secondary-container py-3 rounded-2xl font-semibold text-sm hover:bg-surface-container-highest transition-colors">
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  <span>Schedule</span>
                </button>
                <button onClick={() => onDeleteBarber(barber.id)} className="w-12 h-12 flex items-center justify-center bg-error/10 text-error rounded-2xl hover:bg-error/20 transition-colors">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          )})}
          
          {barbers.length === 0 && (
             <div className="col-span-full py-20 text-center text-on-surface-variant bg-surface-container-lowest border border-dashed border-outline-variant/20 rounded-3xl">
               <p className="font-bold">No barbers found.</p>
               <p className="text-sm mt-1">Add your team members to get started.</p>
             </div>
          )}
        </section>
      )}

      {/* Add Barber Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-surface w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-start mb-6">
               <h2 className="text-2xl font-black tracking-tighter">Add Staff Member</h2>
               <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-colors leading-none"><span className="material-symbols-outlined">close</span></button>
             </div>
             <form onSubmit={handleSubmit(onAddBarber)} className="space-y-6">
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                   <input {...register('name')} className="w-full mt-2 bg-surface-container-low border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. John Doe" />
                   {errors.name && <p className="text-error text-xs font-bold mt-1 ml-1">{errors.name.message}</p>}
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Role/Title</label>
                   <input {...register('role')} className="w-full mt-2 bg-surface-container-low border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none" placeholder="e.g. Senior Barber" />
                   {errors.role && <p className="text-error text-xs font-bold mt-1 ml-1">{errors.role.message}</p>}
                </div>
                <button disabled={isSubmitting} type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-full disabled:opacity-50 flex justify-center items-center gap-2">
                   {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Profile'}
                </button>
             </form>
           </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-surface w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-start mb-6 shrink-0">
               <div>
                  <h2 className="text-2xl font-black tracking-tighter">Working Hours</h2>
                  <p className="text-sm text-on-surface-variant font-medium mt-1">Configure individual availability</p>
               </div>
               <button onClick={() => setShowScheduleModal(false)} className="p-2 hover:bg-surface-container-high rounded-full transition-colors leading-none"><span className="material-symbols-outlined">close</span></button>
             </div>

             <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {loadingSchedule ? (
                   <div className="flex justify-center py-10"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
                ) : (
                   scheduleData.map((item, index) => (
                     <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${item.isDayOff ? 'bg-surface-container-lowest border-outline-variant/10 opacity-70' : 'bg-surface-container-low border-transparent'}`}>
                        <div className="w-24 font-bold text-sm">{daysOfWeek[item.dayOfWeek]}</div>
                        
                        <div className="flex-1 flex gap-2">
                          <input 
                            type="time" 
                            disabled={item.isDayOff}
                            value={item.startTime} 
                            onChange={(e) => updateScheduleItem(index, 'startTime', e.target.value)}
                            className="bg-surface border-none rounded-lg p-2 text-sm font-bold flex-1 disabled:opacity-50"
                          />
                          <input 
                            type="time" 
                            disabled={item.isDayOff}
                            value={item.endTime} 
                            onChange={(e) => updateScheduleItem(index, 'endTime', e.target.value)}
                            className="bg-surface border-none rounded-lg p-2 text-sm font-bold flex-1 disabled:opacity-50"
                          />
                        </div>

                        <div className="flex items-center gap-2 w-24 justify-end">
                           <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Off</span>
                           <label className="relative inline-flex items-center cursor-pointer">
                             <input type="checkbox" checked={!item.isDayOff} onChange={(e) => updateScheduleItem(index, 'isDayOff', !e.target.checked)} className="sr-only peer" />
                             <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                           </label>
                        </div>
                     </div>
                   ))
                )}
             </div>

             <div className="mt-6 shrink-0 z-20">
               <button onClick={saveSchedule} disabled={loadingSchedule} className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg active:scale-95 transition-all">
                  Save Schedule
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
