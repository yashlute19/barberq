'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/booking-store';
import { format, addDays, isSameDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerPhone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  customerEmail: z.string().email('Please enter a valid email'),
  service: z.string().min(1, 'Please select a service'),
  notes: z.string().max(200, 'Notes cannot exceed 200 characters').optional(),
});

type BookingFormInputs = z.infer<typeof bookingSchema>;

export default function BookAppointmentPage() {
  const salonId = process.env.NEXT_PUBLIC_SALON_ID!;
  const router = useRouter();
  const { 
    step, setStep, 
    selectedBarber, setSelectedBarber, 
    selectedDate, setSelectedDate,
    selectedSlot, setSelectedSlot,
    formData, setFormData
  } = useBookingStore();

  const [barbers, setBarbers] = useState<any[]>([]);
  const [slots, setSlots] = useState<{ time: string, available: boolean }[]>([]);
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<BookingFormInputs>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: formData.customerName || '',
      customerPhone: formData.customerPhone || '',
      customerEmail: formData.customerEmail || '',
      service: formData.service || '',
      notes: formData.notes || '',
    }
  });

  const notesValue = watch('notes');

  // Generate 14 days
  const upcomingDates = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await axios.get(`/api/barbers?salonId=${salonId}`);
        if (res.data.success) setBarbers(res.data.data);
      } catch (err) {
        console.error('Failed to load barbers', err);
      } finally {
        setLoadingBarbers(false);
      }
    };
    fetchBarbers();
  }, [salonId]);

  useEffect(() => {
    if (selectedBarber && selectedDate) {
      const fetchSlots = async () => {
        setLoadingSlots(true);
        try {
          const res = await axios.get(`/api/bookings/slots`, {
            params: {
              salonId,
              barberId: selectedBarber.id === 'any' ? 'any' : selectedBarber.id,
              date: selectedDate
            }
          });
          if (res.data.success) {
            setSlots(res.data.data);
            if (selectedSlot && !res.data.data.find((s:any) => s.time === selectedSlot)?.available) {
               setSelectedSlot(null);
            }
          }
        } catch (err) {
          console.error('Failed to load slots', err);
        } finally {
          setLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [selectedBarber, selectedDate, salonId, selectedSlot, setSelectedSlot]);

  const onNextStep = () => {
    if (selectedBarber && selectedDate && selectedSlot) setStep(2);
  };

  const onSubmit = async (data: BookingFormInputs) => {
    setSubmitError(null);
    setFormData(data);
    
    try {
      const res = await axios.post('/api/bookings', {
        salonId,
        barberId: selectedBarber?.id === 'any' ? undefined : selectedBarber?.id,
        date: selectedDate,
        timeSlot: selectedSlot,
        ...data
      });

      if (res.data.success) {
        router.push(`/book/confirmation/${res.data.data.id}`);
      }
    } catch (err: any) {
      setSubmitError(err.response?.data?.error || err.message || 'Failed to complete booking');
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-surface text-on-surface">
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl h-16 flex justify-between items-center px-6 py-3 border-b border-outline-variant/10">
        <Link href="/" className="text-xl font-black tracking-tighter text-primary">BarberQ</Link>
        <div className="flex items-center gap-4">
          <Link href="/queue" className="text-sm font-bold text-on-surface hover:text-primary transition-colors">Queue</Link>
        </div>
      </header>

      <main className="max-w-[720px] mx-auto px-6 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none mb-4">Book Your Session</h1>
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-2 rounded-full bg-surface-container-high overflow-hidden relative">
              <div className={`absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-xs tracking-widest uppercase ${step === 1 ? 'text-primary' : 'text-on-surface-variant'}`}>Select Time</span>
              <span className="material-symbols-outlined text-xs text-outline">arrow_forward</span>
              <span className={`font-bold text-xs tracking-widest uppercase ${step === 2 ? 'text-primary' : 'text-on-surface-variant'}`}>Your Details</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Step 1: Choose Your Expert</h3>
              
              {loadingBarbers ? (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {[1, 2, 3].map(i => <div key={i} className="flex-shrink-0 w-44 h-32 rounded-xl bg-surface-container-low animate-pulse"></div>)}
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  <button 
                    onClick={() => setSelectedBarber({ id: 'any', name: 'Anyone' })}
                    className={`flex-shrink-0 w-44 p-5 rounded-xl border-2 transition-all text-left ${selectedBarber?.id === 'any' ? 'bg-primary/5 border-primary text-primary shadow-sm shadow-primary/10' : 'bg-surface-container-lowest border-transparent hover:bg-surface-container-low'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 ${selectedBarber?.id === 'any' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>*</div>
                    <div className="font-semibold text-sm">Any Barber</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-70">First available</div>
                  </button>

                  {barbers.map(barber => {
                    const isSelected = selectedBarber?.id === barber.id;
                    const initials = barber.name.split(' ').map((n:string) => n[0]).join('').substring(0,2).toUpperCase();
                    return (
                      <button 
                        key={barber.id}
                        onClick={() => setSelectedBarber({ id: barber.id, name: barber.name })}
                        className={`flex-shrink-0 w-44 p-5 rounded-xl border-2 transition-all text-left ${isSelected ? 'bg-primary/5 border-primary text-primary shadow-sm shadow-primary/10' : 'bg-surface-container-lowest border-transparent hover:bg-surface-container-low'}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 ${isSelected ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>{initials}</div>
                        <div className="font-semibold text-sm">{barber.name}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-70">{barber.role}</div>
                      </button>
                    )
                  })}
                </div>
              )}
            </section>

            <section className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4 flex items-center justify-between">
                <span>Select Date</span>
                {!selectedBarber && <span className="text-error text-xs normal-case">Select a barber first</span>}
              </h3>
              <div className={`flex gap-3 overflow-x-auto pb-2 ${!selectedBarber ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                {upcomingDates.map(date => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button 
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl transition-all ${isSelected ? 'bg-primary text-white shadow-lg active:scale-95' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'}`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-tighter">{format(date, 'EEE')}</span>
                      <span className="text-xl font-bold">{format(date, 'd')}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {selectedBarber && selectedDate && (
              <section className="mb-16 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Available Times</h3>
                
                {loadingSlots ? (
                  <div className="grid grid-cols-3 gap-3">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="py-6 rounded-xl bg-surface-container-low animate-pulse"></div>)}
                  </div>
                ) : slots.length === 0 ? (
                  <div className="p-8 text-center bg-surface-container-low rounded-2xl border border-outline-variant/10">
                    <p className="font-bold">No slots available</p>
                    <p className="text-sm text-on-surface-variant mt-1">Please select another date or barber.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {slots.map(slot => {
                      const isSelected = selectedSlot === slot.time;
                      return (
                        <button 
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`py-4 px-2 rounded-xl font-medium text-sm transition-all border ${
                            !slot.available 
                              ? 'bg-surface-container-high text-outline-variant cursor-not-allowed line-through border-transparent' 
                              : isSelected 
                                ? 'bg-primary text-white border-primary shadow-md' 
                                : 'bg-surface-container-lowest border-white hover:border-primary text-on-surface'
                          }`}
                        >
                          {parseTimeString(slot.time)}
                        </button>
                      )
                    })}
                  </div>
                )}
              </section>
            )}

            <button 
              onClick={onNextStep}
              disabled={!selectedBarber || !selectedDate || !selectedSlot}
              className="w-full bg-primary hover:bg-primary-container text-white font-bold py-5 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Details
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6">Step 2: Your Details</h2>
              <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submitError && (
                  <div className="p-4 bg-error/10 text-error rounded-xl text-sm font-bold border border-error/20">
                    {submitError}
                  </div>
                )}

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-2 ml-1">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">person</span>
                    <input {...register('customerName')} className={`w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface font-bold placeholder:font-medium placeholder:text-outline-variant ${errors.customerName ? 'ring-1 ring-error' : ''}`} placeholder="e.g. Julian Pierce" type="text" />
                  </div>
                  {errors.customerName && <p className="text-xs text-error font-bold mt-1 ml-1">{errors.customerName.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-2 ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">phone</span>
                    <input {...register('customerPhone')} className={`w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface font-bold placeholder:font-medium placeholder:text-outline-variant ${errors.customerPhone ? 'ring-1 ring-error' : ''}`} placeholder="e.g. 9800000000" type="tel" />
                  </div>
                  {errors.customerPhone && <p className="text-xs text-error font-bold mt-1 ml-1">{errors.customerPhone.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-2 ml-1">Email (For Confirmation)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                    <input {...register('customerEmail')} className={`w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface font-bold placeholder:font-medium placeholder:text-outline-variant ${errors.customerEmail ? 'ring-1 ring-error' : ''}`} placeholder="client@example.com" type="email" />
                  </div>
                  {errors.customerEmail && <p className="text-xs text-error font-bold mt-1 ml-1">{errors.customerEmail.message}</p>}
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-2 ml-1">Service Required</label>
                  <div className="relative">
                    <select {...register('service')} className={`w-full bg-surface-container-low border-none rounded-xl py-4 px-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface font-bold appearance-none ${errors.service ? 'ring-1 ring-error' : ''}`}>
                      <option value="" disabled>Select a service</option>
                      <option value="Haircut">Haircut</option>
                      <option value="Shave & Trim">Shave & Trim</option>
                      <option value="Beard Fade">Beard Fade</option>
                      <option value="Hair + Beard">Hair + Beard</option>
                      <option value="Kids Haircut">Kids Haircut</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                  </div>
                  {errors.service && <p className="text-xs text-error font-bold mt-1 ml-1">{errors.service.message}</p>}
                </div>

                <div className="group relative border-none">
                  <div className="flex justify-between items-end mb-2 ml-1 mr-1">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline">Notes (Optional)</label>
                    <span className="text-[10px] text-outline-variant font-bold">{notesValue?.length || 0}/200</span>
                  </div>
                  <textarea {...register('notes')} className={`w-full bg-surface-container-low border-none rounded-xl py-4 px-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface font-medium placeholder:text-outline-variant resize-none ${errors.notes ? 'ring-1 ring-error' : ''}`} placeholder="Any specific requirements or style preferences?" rows={3}></textarea>
                  {errors.notes && <p className="text-xs text-error font-bold mt-1 ml-1">{errors.notes.message}</p>}
                </div>
              </form>
            </section>

            <section className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 mb-12 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Summary</h4>
                <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-primary hover:underline underline-offset-4">Modify Time</button>
              </div>

              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <span className="block text-[10px] text-outline uppercase font-black tracking-widest mb-1">Service With</span>
                  <span className="text-sm font-bold text-on-surface">{selectedBarber?.name || 'Any Barber'}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-outline uppercase font-black tracking-widest mb-1">Date &amp; Time</span>
                  <span className="text-sm font-bold text-on-surface">
                     {selectedDate && selectedSlot ? `${format(new Date(selectedDate), 'MMM d, yyyy')} • ${parseTimeString(selectedSlot)}` : 'Not selected'}
                  </span>
                </div>
              </div>
            </section>

            <button 
              type="submit"
              form="booking-form"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-container text-white font-bold py-5 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Processing...</> : 'Confirm Appointment'}
              {!isSubmitting && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>}
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

function parseTimeString(time24: string) {
  const [h, m] = time24.split(':');
  let hh = parseInt(h);
  const ampm = hh >= 12 ? 'PM' : 'AM';
  hh = hh % 12;
  hh = hh ? hh : 12; // the hour '0' should be '12'
  return `${hh.toString().padStart(2, '0')}:${m} ${ampm}`;
}
