import Link from 'next/link';

export default function AdminBarbersPage() {
  return (
    <div className="flex-1 p-6 md:p-12 min-h-screen bg-surface xl:max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 mt-8 md:mt-0">
        <div>
          <p className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-2">Management Console</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">Barbers &amp; Staff</h1>
        </div>
        <button className="flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90 active:scale-95 shadow-lg w-full sm:w-auto">
          <span className="material-symbols-outlined" data-icon="person_add">person_add</span>
          <span>Add Barber</span>
        </button>
      </header>

      {/* Barbers Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Card 1: Marcus L. */}
        <div className="bg-surface-container-lowest rounded-[20px] p-6 transition-all hover:translate-y-[-4px] shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full shrink-0 bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xl ring-4 ring-surface-container-low">
                ML
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface leading-tight">Marcus L.</h3>
                <span className="bg-surface-container-high text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mt-1">Senior Barber</span>
              </div>
            </div>
            <span className="bg-teal-50 text-primary border border-primary/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Available</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Bookings Today</p>
              <p className="text-2xl font-black text-on-surface">12</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Completed</p>
              <p className="text-2xl font-black text-on-surface">07</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-secondary-container py-3 rounded-2xl font-semibold text-sm hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-lg" data-icon="calendar_month">calendar_month</span>
              <span>Edit Schedule</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface-variant rounded-2xl hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
            </button>
          </div>
        </div>

        {/* Card 2: Elena J. */}
        <div className="bg-surface-container-lowest rounded-[20px] p-6 transition-all hover:translate-y-[-4px] shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full shrink-0 bg-primary-fixed text-on-primary-fixed font-bold text-xl ring-4 ring-surface-container-low flex items-center justify-center">
                EJ
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface leading-tight">Elena J.</h3>
                <span className="bg-surface-container-high text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mt-1">Creative Director</span>
              </div>
            </div>
            <span className="bg-amber-400/10 text-amber-700 border border-amber-400/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">On Break</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Bookings Today</p>
              <p className="text-2xl font-black text-on-surface">08</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Completed</p>
              <p className="text-2xl font-black text-on-surface">05</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-secondary-container py-3 rounded-2xl font-semibold text-sm hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-lg" data-icon="calendar_month">calendar_month</span>
              <span>Edit Schedule</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface-variant rounded-2xl hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
            </button>
          </div>
        </div>

        {/* Card 3: Julian V. */}
        <div className="bg-surface-container-lowest rounded-[20px] p-6 opacity-80 transition-all hover:translate-y-[-4px] hover:opacity-100 shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full shrink-0 bg-surface-dim text-on-surface-variant font-bold text-xl ring-4 ring-surface-container-low flex items-center justify-center">
                JV
              </div>
              <div>
                <h3 className="text-xl font-bold text-on-surface leading-tight">Julian V.</h3>
                <span className="bg-surface-container-high text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mt-1">Barber Apprentice</span>
              </div>
            </div>
            <span className="bg-slate-200 text-slate-600 border border-slate-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Off Today</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Bookings Today</p>
              <p className="text-2xl font-black text-on-surface">00</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Completed</p>
              <p className="text-2xl font-black text-on-surface">00</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-secondary-container py-3 rounded-2xl font-semibold text-sm hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-lg" data-icon="calendar_month">calendar_month</span>
              <span>Edit Schedule</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface-variant rounded-2xl hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
            </button>
          </div>
        </div>
      </section>

      {/* Working Hours Section */}
      <section className="bg-surface-container-lowest rounded-[24px] overflow-hidden shadow-sm border border-outline-variant/10">
        <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 border-b border-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" data-icon="schedule">schedule</span>
            <h2 className="text-xl font-extrabold text-on-surface tracking-tight">Standard Weekly Schedule</h2>
          </div>
          <button className="text-primary font-bold text-[11px] uppercase tracking-widest hover:underline focus:outline-none">Apply to all staff</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Work Day</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Shift Start</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Shift End</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {/* Monday */}
              <tr className="group hover:bg-surface-container-low/20 transition-colors">
                <td className="px-8 py-5 font-bold text-on-surface">Monday</td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium text-on-secondary-container">09:00 AM</div>
                </td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium text-on-secondary-container">06:00 PM</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-teal-50 px-2 py-1 rounded">Operating</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </td>
              </tr>
              
              {/* Tuesday */}
              <tr className="group hover:bg-surface-container-low/20 transition-colors">
                <td className="px-8 py-5 font-bold text-on-surface">Tuesday</td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium text-on-secondary-container">09:00 AM</div>
                </td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium text-on-secondary-container">06:00 PM</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-teal-50 px-2 py-1 rounded">Operating</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </td>
              </tr>
              
              {/* Wednesday */}
              <tr className="group bg-surface-container-low/30">
                <td className="px-8 py-5 font-bold text-slate-400">Wednesday</td>
                <td className="px-8 py-5">
                  <div className="text-slate-300 text-sm italic">— —</div>
                </td>
                <td className="px-8 py-5">
                  <div className="text-slate-300 text-sm italic">— —</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">Day Off</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </td>
              </tr>
              
              {/* Thursday */}
              <tr className="group hover:bg-surface-container-low/20 transition-colors">
                <td className="px-8 py-5 font-bold text-on-surface">Thursday</td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium">09:00 AM</div>
                </td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium">08:00 PM</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-teal-50 px-2 py-1 rounded">Operating</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all border border-transparent"></div>
                  </label>
                </td>
              </tr>
              
              {/* Friday */}
              <tr className="group hover:bg-surface-container-low/20 transition-colors">
                <td className="px-8 py-5 font-bold text-on-surface">Friday</td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium">09:00 AM</div>
                </td>
                <td className="px-8 py-5">
                  <div className="bg-surface-container-low inline-flex px-3 py-2 rounded-xl text-sm font-medium">09:00 PM</div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-teal-50 px-2 py-1 rounded">Operating</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all border border-transparent"></div>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-surface-container-low flex justify-end min-w-[700px]">
          <button className="bg-on-surface text-surface px-8 py-3 rounded-full font-bold text-sm tracking-wide uppercase shadow-md active:scale-95 transition-all outline-none">Save Global Hours</button>
        </div>
      </section>
      
      {/* FAB for Quick Actions (Mobile) */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center md:hidden z-40 active:scale-90 transition-transform">
        <span className="material-symbols-outlined text-3xl" data-icon="add">add</span>
      </button>
    </div>
  );
}
