'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const salonId = process.env.NEXT_PUBLIC_SALON_ID!;

  const { register, handleSubmit, reset } = useForm();
  
  // Custom states for toggles that are harder with native inputs
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const res = await axios.get(`/api/salon?salonId=${salonId}`);
        if (res.data.success) {
          const s = res.data.data;
          setSalon(s);
          setIsOpen(s.isOpen);
          reset(s);
        }
      } catch (err) {
        console.error('Failed to load salon settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSalon();
  }, [salonId, reset]);

  const onSubmit = async (data: any) => {
    setSaving(true);
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        tagline: data.tagline,
        isOpen,
        maxQueueSize: parseInt(data.maxQueueSize),
        slotDuration: parseInt(data.slotDuration)
      };
      const res = await axios.put(`/api/salon?salonId=${salonId}`, payload);
      if (res.data.success) {
        alert('Settings saved successfully');
      }
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return <div className="flex-1 p-6 flex justify-center items-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="flex-1 pb-20 bg-surface min-h-screen">
      <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-surface border-b border-outline-variant/10 sticky top-0 z-40 backdrop-blur-md">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface">Salon Settings</h1>
          <p className="text-xs md:text-sm text-secondary leading-none mt-1">Configure your atelier&apos;s core operations</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleSubmit(onSubmit)} disabled={saving} className="px-4 md:px-6 py-2 md:py-2.5 bg-primary text-on-primary rounded-full font-semibold text-xs md:text-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-md">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save Changes</span>}
          </button>
        </div>
      </header>

      <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
        <div className="flex gap-4 md:gap-8 mb-10 border-b border-outline-variant/10 overflow-x-auto scrollbar-hide">
          <button className="pb-4 text-xs md:text-sm font-bold tracking-widest uppercase text-primary border-b-2 border-primary whitespace-nowrap focus:outline-none">General & Rules</button>
          <button className="pb-4 text-xs md:text-sm font-bold tracking-widest uppercase text-secondary hover:text-on-surface transition-colors whitespace-nowrap focus:outline-none hidden">Account</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-on-surface">Salon Identity</h2>
                <div className="flex items-center justify-between sm:justify-start gap-3 bg-surface-container-low px-4 py-2 rounded-full w-full sm:w-auto cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Salon {isOpen ? 'Open' : 'Closed'}</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${isOpen ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isOpen ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Salon Name</label>
                  <input {...register('name')} className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 transition-all font-bold" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Phone Number</label>
                  <input {...register('phone')} className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 transition-all font-bold" type="text" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Address</label>
                  <input {...register('address')} className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 transition-all font-bold" type="text" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Tagline</label>
                  <input {...register('tagline')} className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 transition-all font-bold" type="text" />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Rules */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary">tune</span>
                <h2 className="text-lg font-bold text-on-surface">Booking Rules</h2>
              </div>
              
              <div className="space-y-6">
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary block">Slot Duration (Min)</label>
                  <select {...register('slotDuration')} className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 appearance-none font-bold">
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary block">Max Queue Size</label>
                  <input {...register('maxQueueSize')} className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm font-bold" type="number" />
                </div>
              </div>
            </div>
            
            <div className="relative h-48 rounded-[2rem] overflow-hidden group border border-outline-variant/10 shadow-sm hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="barber tools" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKgTR30t3ZfZF1NysUF0--BUVGhI8nmnd4XyMB-Ekuyr8ACqRUeTSwdKkP6kAqh2X9a4oqJm15H8xRTNUpoc-YeofXrIX072dIyo4-X3osgHnTkLlI3yH_HQSEEHM1hjDTcE1GwZvNi77s0wCbhQ7fFTiBWpqMoRAM9YWmM324K_UieNhLLFsUaEvC5-J-qHfTnF75iQEuTwdqcSi2QzoXxxd7UVsKtIILghcbmJ1h6oxF1q4hV5IsWoBK54D3xCd5nVzxoXVedJs" />
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white mb-1">Your Space</span>
                <span className="text-white font-bold leading-tight">Optimizing operations.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
