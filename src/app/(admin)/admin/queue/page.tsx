import Link from 'next/link';

export default function AdminQueuePage() {
  return (
    <div className="p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 mt-8 md:mt-0">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Live Queue</h1>
          <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-teal-100 flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            Open
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high text-on-secondary-container hover:bg-surface-container-highest transition-all text-sm font-semibold">
            <span className="material-symbols-outlined text-[20px]">pause_circle</span>
            Pause Queue
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary hover:opacity-90 transition-all text-sm font-bold shadow-sm shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Add Walk-in
          </button>
        </div>
      </header>

      {/* Queue Summary Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">People Waiting</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-on-surface">4</span>
            <span className="text-on-surface-variant text-sm font-medium">Clients</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">Avg Wait Time</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-on-surface">22</span>
            <span className="text-on-surface-variant text-sm font-medium">Minutes</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mb-1">Slots Available</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-on-surface">2</span>
            <span className="text-on-surface-variant text-sm font-medium">Openings</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Queue Board (70%) */}
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="bg-surface-container-lowest rounded-xl min-w-[800px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant/10">
                <tr>
                  <th className="px-4 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest w-10"></th>
                  <th className="px-4 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest w-12 text-center">Pos</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Client</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Joined At</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Barber</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {/* In Service Row */}
                <tr className="bg-teal-50/50 hover:bg-teal-50 transition-colors">
                  <td className="px-4 py-5 text-center">
                    <span className="material-symbols-outlined text-outline-variant/40 cursor-grab">drag_indicator</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-teal-700 font-black">1</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">Julian Rossi</span>
                      <span className="text-[11px] text-on-surface-variant/70">+1 (555) •••-4291</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">10:15 AM</span>
                      <span className="text-[10px] text-teal-600 font-bold uppercase tracking-tight">Wait: 0m</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <select className="bg-transparent border-0 text-xs font-bold text-teal-800 p-0 focus:ring-0 cursor-pointer outline-none w-full max-w-[120px]">
                      <option>Marco (Master)</option>
                      <option>Dante</option>
                      <option>Any Barber</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-[9px] font-black uppercase rounded-full tracking-widest whitespace-nowrap">In Service</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3 text-on-surface-variant">
                      <button className="hover:text-primary transition-colors" title="Complete"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                      <button className="hover:text-primary transition-colors" title="Move Up"><span className="material-symbols-outlined text-[20px]">arrow_upward</span></button>
                      <button className="hover:text-error transition-colors" title="Remove"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>

                {/* Waiting Row */}
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-4 py-5 text-center">
                    <span className="material-symbols-outlined text-outline-variant/40 cursor-grab">drag_indicator</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-on-surface-variant font-bold">2</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">Marcus Thorne</span>
                      <span className="text-[11px] text-on-surface-variant/70">+1 (555) •••-8812</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">10:32 AM</span>
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">Wait: 18m</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <select className="bg-transparent border-0 text-xs font-bold text-on-surface p-0 focus:ring-0 cursor-pointer outline-none w-full max-w-[120px]">
                      <option>Any Barber</option>
                      <option>Marco</option>
                      <option>Dante</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-0.5 bg-secondary-container/30 text-secondary text-[9px] font-black uppercase rounded-full tracking-widest whitespace-nowrap">Next Up</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3 text-on-surface-variant">
                      <button className="hover:text-primary transition-colors" title="Start Service"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                      <button className="hover:text-primary transition-colors" title="Move Up"><span className="material-symbols-outlined text-[20px]">arrow_upward</span></button>
                      <button className="hover:text-error transition-colors" title="Remove"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>

                {/* Waiting Row 3 */}
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-4 py-5 text-center">
                    <span className="material-symbols-outlined text-outline-variant/40 cursor-grab">drag_indicator</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-on-surface-variant font-bold">3</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">Liam H.</span>
                      <span className="text-[11px] text-on-surface-variant/70">+1 (555) •••-3309</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">10:45 AM</span>
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">Wait: 31m</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <select className="bg-transparent border-0 text-xs font-bold text-on-surface p-0 focus:ring-0 cursor-pointer outline-none w-full max-w-[120px]">
                      <option>Dante</option>
                      <option>Marco</option>
                      <option>Any Barber</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[9px] font-black uppercase rounded-full tracking-widest whitespace-nowrap">Waiting</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3 text-on-surface-variant">
                      <button className="hover:text-primary transition-colors" title="Start Service"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                      <button className="hover:text-primary transition-colors" title="Move Up"><span className="material-symbols-outlined text-[20px]">arrow_upward</span></button>
                      <button className="hover:text-error transition-colors" title="Remove"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>

                {/* Waiting Row 4 */}
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-4 py-5 text-center">
                    <span className="material-symbols-outlined text-outline-variant/40 cursor-grab">drag_indicator</span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-on-surface-variant font-bold">4</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">Alex Nguyen</span>
                      <span className="text-[11px] text-on-surface-variant/70">+1 (555) •••-1122</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">10:55 AM</span>
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">Wait: 41m</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <select className="bg-transparent border-0 text-xs font-bold text-on-surface p-0 focus:ring-0 cursor-pointer outline-none w-full max-w-[120px]">
                      <option>Any Barber</option>
                      <option>Marco</option>
                      <option>Dante</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[9px] font-black uppercase rounded-full tracking-widest whitespace-nowrap">Waiting</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-3 text-on-surface-variant">
                      <button className="hover:text-primary transition-colors" title="Start Service"><span className="material-symbols-outlined text-[20px]">check_circle</span></button>
                      <button className="hover:text-primary transition-colors" title="Move Up"><span className="material-symbols-outlined text-[20px]">arrow_upward</span></button>
                      <button className="hover:text-error transition-colors" title="Remove"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Queue Settings (30%) */}
        <aside className="w-full xl:w-[320px] shrink-0">
          <div className="bg-surface-container-low p-8 rounded-xl sticky top-8 border border-outline-variant/10">
            <h2 className="text-sm font-black text-on-surface uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">tune</span>
              Queue Settings
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Max Queue Size</label>
                <input className="w-full bg-surface-container-lowest border-0 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all outline-none" type="number" defaultValue="12" />
                <p className="text-[10px] text-on-surface-variant/60 mt-2 italic">Limits automatic joins via web app.</p>
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Est. Time Per Client</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-lowest border-0 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all outline-none" type="number" defaultValue="30" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant/40">MINS</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Auto-Close Queue</label>
                <div className="relative flex items-center">
                  <input className="w-full bg-surface-container-lowest border-0 rounded-lg px-4 py-3 pr-10 text-sm font-semibold focus:ring-2 focus:ring-primary/20 transition-all outline-none" type="time" defaultValue="18:30" />
                  <span className="material-symbols-outlined absolute right-4 text-on-surface-variant/30 text-lg pointer-events-none">schedule</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-outline-variant/10">
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Accepting Walk-ins</span>
                <div className="w-10 h-5 bg-teal-500 rounded-full relative cursor-pointer shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                </div>
              </div>

              <button className="w-full bg-on-surface text-surface py-3.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-on-surface-variant transition-all mt-4 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save Settings
              </button>
            </div>

            <div className="mt-8 p-4 bg-surface-container rounded-lg border border-primary/5">
              <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Status Insight</h3>
              <p className="text-[11px] leading-relaxed text-on-surface-variant font-medium">
                Queue is currently operating at <span className="font-bold text-on-surface">65% capacity</span>. Estimated final service will conclude at <span className="font-bold text-on-surface">12:45 PM</span>.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
