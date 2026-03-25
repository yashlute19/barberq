'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface QueueEntry {
  id: string;
  customerName: string;
  position: number;
  status: string;
  joinedAt: string;
}

export default function LiveQueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [joining, setJoining] = useState(false);
  const [myQueueId, setMyQueueId] = useState<string | null>(null);
  
  const salonId = 'salon-1'; 

  const fetchQueue = async () => {
    try {
      const res = await fetch(`/api/queue?salonId=${salonId}`);
      if (!res.ok) throw new Error('Failed to fetch queue');
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      setError('Could not load the queue.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchQueue();
    
    // Check localStorage for our spot
    if (typeof window !== 'undefined') {
      setMyQueueId(localStorage.getItem('myQueueId'));
    }

    // Supabase Realtime Subscription
    const channel = supabase
      .channel('queue-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'QueueEntry' },
        (payload) => {
          console.log('Realtime update:', payload);
          fetchQueue();
          // If we were removed or something changed, we might need to verify our ID
          if (typeof window !== 'undefined') {
             setMyQueueId(localStorage.getItem('myQueueId'));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleJoinQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoining(true);
    try {
      const res = await fetch('/api/queue/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salonId,
          customerName: name,
          customerPhone: phone,
        }),
      });

      if (!res.ok) throw new Error('Failed to join');
      
      const newEntry = await res.json();
      localStorage.setItem('myQueueId', newEntry.id);
      setMyQueueId(newEntry.id); // Update state reactively
      
      setShowModal(false);
      setName('');
      setPhone('');
      fetchQueue();
    } catch (err) {
      alert('Error joining queue. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const inServiceEntry = queue.find(entry => entry.status === 'in_service');
  const waitingEntries = queue.filter(entry => entry.status === 'waiting');
  
  // Calculate people ahead for "Your spot"
  const myEntry = queue.find(e => e.id === myQueueId);
  // People ahead = everyone whose position is lower and status is NOT done/removed
  const peopleAhead = myEntry 
    ? queue.filter(e => e.position < myEntry.position && (e.status === 'waiting' || e.status === 'in_service')).length 
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
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live</span>
          </div>
        </div>
      </header>

      <main className="max-w-[640px] mx-auto px-6 pt-24 space-y-8">
        <section className="bg-surface-container-low p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-70">Current Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span className="text-sm font-bold text-on-surface">Open</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-70">Estimated Wait</span>
              <p className="text-lg font-black text-primary mt-1">~{waitingEntries.length * 20} min</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center py-4">
            <span className="text-7xl font-black text-primary tracking-tighter">
              {myEntry ? peopleAhead : waitingEntries.length}
            </span>
            <p className="text-on-surface-variant font-bold mt-2">
              {myEntry ? 'People ahead of you' : 'People in line'}
            </p>
            <div className="w-12 h-[2px] bg-primary/20 my-6"></div>
            <p className="text-sm text-on-surface-variant max-w-[280px] leading-relaxed font-medium">
              {myEntry 
                ? `You're at position ${queue.indexOf(myEntry) + 1}. We'll notify you when it's almost your turn.` 
                : "Join the precision atelier's digital floor. We'll update you as your chair gets closer."}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Queue Order</h2>
            <span className="text-[10px] font-bold text-on-surface-variant opacity-40">Auto-updates enabled</span>
          </div>
          
          {loading ? (
            <div className="py-10 text-center text-on-surface-variant animate-pulse font-bold">Loading live feed...</div>
          ) : (
            <div className="space-y-3">
              {queue.length === 0 && (
                <div className="bg-surface-container-low p-8 rounded-2xl text-center border-2 border-dashed border-outline-variant/20">
                  <p className="text-on-surface-variant font-bold">Queue is currently empty.</p>
                  <p className="text-xs text-on-surface-variant/60 mt-1">Be the first to join the atelier today!</p>
                </div>
              )}

              {queue.map((entry, index) => {
                const isMe = entry.id === myQueueId;
                const isInService = entry.status === 'in_service';

                return (
                  <div 
                    key={entry.id} 
                    className={`p-4 rounded-xl flex items-center justify-between transition-all duration-500 ${
                      isMe 
                        ? 'bg-primary/5 border-2 border-primary shadow-lg shadow-primary/5' 
                        : 'bg-surface-container-lowest border border-outline-variant/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                        isInService ? 'bg-primary text-white animate-pulse' : (isMe ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant')
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`font-bold ${isMe ? 'text-primary' : 'text-on-surface'}`}>
                            {isMe ? 'Your spot' : (entry.customerName || `Guest #${entry.id.slice(-4)}`)}
                          </p>
                          {isMe && <span className="bg-primary text-white text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">YOU</span>}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isInService ? 'text-primary' : 'text-on-surface-variant/60'}`}>
                          {isInService ? 'In Service' : 'Waiting'}
                        </span>
                      </div>
                    </div>
                    <span className={`material-symbols-outlined ${isInService ? 'text-primary animate-spin-slow' : 'text-on-surface-variant/20'}`}>
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

      {!myEntry && (
        <div className="fixed bottom-0 left-0 w-full z-50 px-6 pb-8 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-outline-variant/10">
          <div className="max-w-[640px] mx-auto">
            <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-primary hover:bg-primary-container text-white py-4 px-8 rounded-full font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/20"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Join the Precision Queue</span>
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tighter">Enter the Line</h2>
                <p className="text-sm text-on-surface-variant font-medium mt-1">Provide your details to claim your spot.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleJoinQueue} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Your Name</label>
                <input 
                  required
                  className="w-full bg-surface-container-low border-0 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="e.g. Julian Rossi"
                  value={name}
                  onChange={e => setName(e.target.value)}
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
                />
              </div>
              
              <button 
                type="submit"
                disabled={joining}
                className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-full font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {joining ? 'Adding you...' : 'Confirm My Spot'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
