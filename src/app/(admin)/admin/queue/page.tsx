'use client';

import { useState } from 'react';
import { useQueue } from '@/hooks/useQueue';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Loader2 } from 'lucide-react';

export default function AdminQueuePage() {
  const salonId = process.env.NEXT_PUBLIC_SALON_ID!;
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [barberId, setBarberId] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Note: We don't fetch barbers here specifically in Phase 2, but we could hook it up later.
  
  const { entries, stats, isLoading, updateStatus, addWalkIn, reorder, error } = useQueue(salonId);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(entries);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedEntries = items.map((item, index) => ({
      id: item.id,
      position: index + 1,
    }));

    // Optimistic UI update could be handled in store, but here we just call the API
    await reorder(reorderedEntries);
  };

  const handleAddWalkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError(null);
    try {
      await addWalkIn(name, phone, barberId || undefined);
      setShowAddModal(false);
      setName('');
      setPhone('');
      setBarberId('');
    } catch (err: any) {
      setAddError(err.message || 'Failed to add walk-in');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemove = (id: string) => {
    if (window.confirm('Are you sure you want to remove this entry?')) {
      updateStatus(id, 'removed');
    }
  };

  const maskPhone = (phone: string | null) => {
    if (!phone) return 'No phone';
    if (phone.length < 10) return phone;
    return `+91 ${phone.substring(0, 2)}***${phone.substring(phone.length - 4)}`;
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
           {error && <span className="text-error text-sm font-bold bg-error/10 px-3 py-1 rounded-full">{error}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
             onClick={() => setShowAddModal(true)}
             className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white hover:opacity-90 transition-all text-sm font-black shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Add Walk-in
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Waiting', value: stats?.totalWaiting || 0, unit: 'Clients' },
          { label: 'Avg Wait (~)', value: stats?.estimatedWaitMinutes || 0, unit: 'Mins' },
          { label: 'Total Active', value: entries.length, unit: 'Today' },
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
                  {(isLoading && entries.length === 0) ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center font-bold animate-pulse text-on-surface-variant">Loading Board...</td>
                    </tr>
                  ) : entries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center font-bold text-on-surface-variant/40 italic">No entries in the active queue.</td>
                    </tr>
                  ) : (
                    entries.map((entry, index) => (
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
                                <span className="text-[11px] text-on-surface-variant font-medium opacity-60">{maskPhone(entry.customerPhone)}</span>
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
                                <button onClick={() => handleRemove(entry.id)} className="p-2 hover:bg-error/10 hover:text-error rounded-lg transition-colors" title="Remove">
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

       {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black tracking-tighter">Add Walk-in</h2>
                <p className="text-sm text-on-surface-variant font-medium mt-1">Manual queue entry</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
                disabled={isAdding}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddWalkIn} className="space-y-6">
              {addError && (
                 <p className="p-3 bg-error/10 text-error rounded-xl text-sm font-medium border border-error/20">{addError}</p>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Name (Optional)</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={isAdding}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Phone Number (Optional)</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="+91 9800000000"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  disabled={isAdding}
                />
              </div>
              
              <button 
                type="submit"
                disabled={isAdding}
                className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-full font-black flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isAdding ? <><Loader2 className="w-5 h-5 animate-spin" /> <span>Adding...</span></> : 'Confirm Entry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
