'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface QueueEntry {
  id: string;
  customerName: string;
  customerPhone: string;
  position: number;
  status: string;
  joinedAt: string;
  barberId?: string;
  barber?: { name: string };
}

export default function AdminQueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const salonId = 'salon-1'; // Hardcoded for this phase

  const fetchQueue = async () => {
    try {
      const res = await fetch(`/api/queue?salonId=${salonId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();

    const channel = supabase
      .channel('admin-queue')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'QueueEntry' }, () => {
        fetchQueue();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/queue/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update positions locally
    const updatedEntries = items.map((item, index) => ({
      ...item,
      position: index + 1,
    }));
    setQueue(updatedEntries);

    // Sync with backend
    try {
      await fetch('/api/queue/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entries: updatedEntries.map(e => ({ id: e.id, position: e.position })),
        }),
      });
    } catch (err) {
      console.error('Reorder fail:', err);
      fetchQueue(); // Revert on failure
    }
  };

  return (
    <div className="p-8 bg-surface min-h-screen text-on-surface">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 mt-8 md:mt-0">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-black tracking-tight">Queue Management</h1>
          <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white hover:opacity-90 transition-all text-sm font-black shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Add Walk-in
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Waiting', value: queue.filter(e => e.status === 'waiting').length, unit: 'Clients' },
          { label: 'In Service', value: queue.filter(e => e.status === 'in_service').length, unit: 'Active' },
          { label: 'Total Volume', value: queue.length, unit: 'Today' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{stat.value}</span>
              <span className="text-on-surface-variant text-sm font-bold">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xl border border-outline-variant/5">
        <DragDropContext onDragEnd={onDragEnd}>
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant/10">
              <tr>
                <th className="px-4 py-4 w-12"></th>
                <th className="px-4 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest w-12 text-center">Pos</th>
                <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Client</th>
                <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <Droppable droppableId="queue-table">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef} className="divide-y divide-outline-variant/5">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center font-bold animate-pulse text-on-surface-variant">Loading Board...</td>
                    </tr>
                  ) : queue.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center font-bold text-on-surface-variant/40 italic">No entries in the active queue.</td>
                    </tr>
                  ) : (
                    queue.map((entry, index) => (
                      <Draggable key={entry.id} draggableId={entry.id} index={index}>
                        {(provided, snapshot) => (
                          <tr 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`transition-colors ${snapshot.isDragging ? 'bg-surface-container-high shadow-2xl' : (entry.status === 'in_service' ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-surface-container-low/50')}`}
                          >
                            <td className="px-4 py-5 text-center" {...provided.dragHandleProps}>
                              <span className="material-symbols-outlined text-outline-variant/40">drag_indicator</span>
                            </td>
                            <td className="px-4 py-5 text-center">
                              <span className={`font-black ${entry.status === 'in_service' ? 'text-primary' : 'text-on-surface-variant'}`}>{index + 1}</span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold">{entry.customerName || 'Anonymous'}</span>
                                <span className="text-[11px] text-on-surface-variant font-medium opacity-60">{entry.customerPhone || 'No phone'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full tracking-widest ${
                                entry.status === 'in_service' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'
                              }`}>
                                {entry.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <div className="flex justify-end gap-2 text-on-surface-variant">
                                {entry.status === 'waiting' && (
                                  <button onClick={() => updateStatus(entry.id, 'in_service')} className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" title="Start Service">
                                    <span className="material-symbols-outlined">start</span>
                                  </button>
                                )}
                                {entry.status === 'in_service' && (
                                  <button onClick={() => updateStatus(entry.id, 'done')} className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" title="Complete">
                                    <span className="material-symbols-outlined">check_circle</span>
                                  </button>
                                )}
                                <button onClick={() => updateStatus(entry.id, 'removed')} className="p-2 hover:bg-error/10 hover:text-error rounded-lg transition-colors" title="Remove">
                                  <span className="material-symbols-outlined">delete</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </div>
  );
}
