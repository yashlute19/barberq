'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQueue } from '@/hooks/useQueue';
import { Loader2 } from 'lucide-react';

export default function LiveQueuePage() {
  const salonId = process.env.NEXT_PUBLIC_SALON_ID || "";
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [joining, setJoining] = useState(false);
  const [myQueueId, setMyQueueId] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const { entries, stats, isLoading, addWalkIn } = useQueue(salonId || "");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myQueueId');
      if (stored) setMyQueueId(stored);
    }
  }, []);

  const handleJoinQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoining(true);
    setJoinError(null);
    try {
      const newEntry = await addWalkIn(name, phone);
      localStorage.setItem('myQueueId', newEntry.id);
      setMyQueueId(newEntry.id);
      setShowModal(false);
      setName('');
      setPhone('');
    } catch (err: unknown) {
      setJoinError(err instanceof Error ? err.message : 'Error joining queue. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const waitingCount = stats?.totalWaiting || 0;
  const estimatedWait = stats?.estimatedWaitMinutes || 0;
  const inServiceEntries = entries.filter((e) => e.status === 'in_service');
  
  const myEntry = entries.find((e) => e.id === myQueueId);
  const peopleAhead = myEntry 
    ? entries.filter(e => e.position < myEntry.position && (e.status === 'waiting' || e.status === 'in_service')).length 
    : 0;

  return (
    <div className="min-h-screen pb-32 bg-surface text-on-surface">
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center w-full px-6 py-3 h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-secondary p-1 -ml-2">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="text-xl font-bold tracking-tighter text-primary">Live Queue</h1>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
             <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-[pulse_1.5s_ease-in-out_infinite]"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Updates</span>
          </div>
        </div>
      </header>

      <main className="max-w-[640px] mx-auto px-6 pt-24 space-y-8">
        <section className="bg-surface-container-low p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-70">Current Status</span>
              <div className="flex items-center gap-2 mt-1">
                {stats?.isOpen ? (
                   <>
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-sm font-bold text-on-surface">Open for walk-ins</span>
                   </>
                ) : (
                  <>
                     <span className="h-2 w-2 rounded-full bg-error"></span>
                     <span className="text-sm font-bold text-error">Closed</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-70">Estimated Wait</span>
              <p className="text-lg font-black text-primary mt-1">~{estimatedWait} min</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center py-4">
            <span className="text-7xl font-black text-primary tracking-tighter">
              {myEntry ? peopleAhead : waitingCount}
            </span>
            <p className="text-on-surface-variant font-bold mt-2">
              {myEntry ? 'People ahead of you' : 'People in line'}
            </p>
            <div className="w-12 h-[2px] bg-primary/20 my-6"></div>
            <p className="text-sm text-on-surface-variant max-w-[280px] leading-relaxed font-medium">
              {myEntry 
                ? `You're at position ${myEntry.position}. We'll notify you when it's almost your turn.` 
                : "Join the precision atelier's digital floor. We'll update you as your chair gets closer."}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Queue Order</h2>
            <span className="text-[10px] font-bold text-on-surface-variant opacity-40">Auto-updates enabled</span>
          </div>
          
          {isLoading && entries.length === 0 ? (
             <div className="py-10 flex flex-col items-center text-on-surface-variant text-sm font-bold">
               <Loader2 className="w-6 h-6 animate-spin mb-2" />
               <p>Loading live feed...</p>
             </div>
          ) : (
            <div className="space-y-3">
              {entries.length === 0 && (
                <div className="bg-surface-container-low p-8 rounded-2xl text-center border-2 border-dashed border-outline-variant/20">
                  <p className="text-on-surface-variant font-bold">Queue is currently empty.</p>
                  <p className="text-xs text-on-surface-variant/60 mt-1">Be the first to join the atelier today!</p>
                </div>
              )}

              {entries.map((entry, index) => {
                const isMe = entry.id === myQueueId;
                const isInService = entry.status === 'in_service';

                return (
                  <div 
                    key={entry.id} 
                    className={`block p-4 rounded-xl flex items-center justify-between transition-all duration-500 relative overflow-hidden ${
                      isMe 
                        ? 'bg-primary/5 border border-primary shadow-sm shadow-primary/5' 
                        : 'bg-surface-container-lowest border border-outline-variant/10'
                    }`}
                  >
                    {isInService && (
                       <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0D9488]"></div>
                    )}
                    <div className="flex items-center gap-4 relative z-10 pl-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                        isInService ? 'bg-primary text-white animate-pulse' : (isMe ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant')
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           {/* Mask customer names */}
                          <p className={`font-bold ${isMe ? 'text-primary' : 'text-on-surface'}`}>
                            {isMe ? 'Your spot' : `Guest #${entry.id.slice(-4).toUpperCase()}`}
                          </p>
                          {isMe && <span className="bg-primary text-white text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">YOU</span>}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isInService ? 'text-primary' : 'text-on-surface-variant/60'}`}>
                          {isInService ? 'In Service' : 'Waiting'}
                        </span>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined relative z-10 ${isInService ? 'text-[#0D9488] animate-[spin_4s_linear_infinite]' : 'text-on-surface-variant/20'}`}>
                      {isInService ? 'content_cut' : 'hourglass_empty'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {!myEntry && (
          <section className="pt-4">
            <Link href="/book" className="w-full py-4 px-6 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-on-surface flex items-center justify-between hover:bg-surface-container-high transition-all group">
              <span className="text-sm font-bold">Prefer a set time? Book an appointment</span>
              <span className="material-symbols-outlined text-on-surface-variant transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </section>
        )}
      </main>

      {!myEntry && stats?.isOpen && (
        <div className="fixed bottom-0 left-0 w-full z-50 px-6 pb-8 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-outline-variant/10">
          <div className="max-w-[640px] mx-auto">
            <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-primary hover:bg-primary-container text-white py-4 px-8 rounded-full font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/20"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Join the Queue Now</span>
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tighter">Join the line</h2>
                <p className="text-sm text-on-surface-variant font-medium mt-1">Provide your details to claim your spot.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
                disabled={joining}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleJoinQueue} className="space-y-6">
              {joinError && (
                 <p className="p-3 bg-error/10 text-error rounded-xl text-sm font-medium border border-error/20">{joinError}</p>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Your Name (Optional)</label>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="e.g. Julian Rossi"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={joining}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Phone Number (Optional)</label>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  disabled={joining}
                />
              </div>
              
              <button 
                type="submit"
                disabled={joining}
                className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-full font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {joining ? <><Loader2 className="w-5 h-5 animate-spin" /> <span>Adding you...</span></> : 'Confirm My Spot'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
