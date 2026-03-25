import Link from 'next/link';

export default function AdminSettingsPage() {
  return (
    <div className="flex-1 pb-20 bg-surface min-h-screen">
      {/* Header Section */}
      <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-surface border-b border-outline-variant/10 sticky top-0 z-40 backdrop-blur-md">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface">Salon Settings</h1>
          <p className="text-xs md:text-sm text-secondary leading-none mt-1">Configure your atelier&apos;s core operations</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 md:px-6 py-2 md:py-2.5 bg-primary text-on-primary rounded-full font-semibold text-xs md:text-sm hover:opacity-90 transition-all flex items-center gap-2">
            <span>Save Changes</span>
          </button>
        </div>
      </header>

      <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
        {/* Tabs Navigation */}
        <div className="flex gap-4 md:gap-8 mb-10 border-b border-outline-variant/10 overflow-x-auto scrollbar-hide">
          <button className="pb-4 text-xs md:text-sm font-bold tracking-widest uppercase text-primary border-b-2 border-primary whitespace-nowrap focus:outline-none">General</button>
          <button className="pb-4 text-xs md:text-sm font-bold tracking-widest uppercase text-secondary hover:text-on-surface transition-colors whitespace-nowrap focus:outline-none">Booking Rules</button>
          <button className="pb-4 text-xs md:text-sm font-bold tracking-widest uppercase text-secondary hover:text-on-surface transition-colors whitespace-nowrap focus:outline-none">Notifications</button>
          <button className="pb-4 text-xs md:text-sm font-bold tracking-widest uppercase text-secondary hover:text-on-surface transition-colors whitespace-nowrap focus:outline-none">Account</button>
        </div>

        {/* Settings Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-12">
            {/* General Section */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-on-surface">Salon Identity</h2>
                <div className="flex items-center justify-between sm:justify-start gap-3 bg-surface-container-low px-4 py-2 rounded-full w-full sm:w-auto">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Salon Open</span>
                  <button className="w-10 h-5 bg-primary rounded-full relative focus:outline-none">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Salon Name</label>
                  <input className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" type="text" defaultValue="The Precision Atelier" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Phone Number</label>
                  <input className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" type="text" defaultValue="+1 (555) 012-3456" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Address</label>
                  <input className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" type="text" defaultValue="128 Luxury Row, Design District, NY 10012" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary">Tagline</label>
                  <input className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" type="text" defaultValue="Where precision meets the modern gentleman." />
                </div>
              </div>
            </section>

            {/* Business Hours Section */}
            <section className="space-y-6">
              <h2 className="text-lg font-bold text-on-surface">Business Hours</h2>
              <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 max-w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead className="bg-surface-container-high/30">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-secondary">Day</th>
                      <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-secondary">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-secondary">Opening</th>
                      <th className="px-6 py-4 text-[10px] font-bold tracking-widest uppercase text-secondary">Closing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">Monday</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-full uppercase">Open</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary">09:00 AM</td>
                      <td className="px-6 py-4 text-sm text-secondary">08:00 PM</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">Tuesday</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-full uppercase">Open</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary">09:00 AM</td>
                      <td className="px-6 py-4 text-sm text-secondary">08:00 PM</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">Wednesday</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-full uppercase">Open</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary">09:00 AM</td>
                      <td className="px-6 py-4 text-sm text-secondary">08:00 PM</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">Thursday</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-full uppercase">Open</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary">09:00 AM</td>
                      <td className="px-6 py-4 text-sm text-secondary">08:00 PM</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest transition-colors text-error">
                      <td className="px-6 py-4 text-sm font-medium">Sunday</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-error/10 text-error text-[10px] font-bold rounded-full uppercase">Closed</span>
                      </td>
                      <td className="px-6 py-4 text-sm opacity-50">—</td>
                      <td className="px-6 py-4 text-sm opacity-50">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Rules & Insights */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Booking Rules Card */}
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary" data-icon="tune">tune</span>
                <h2 className="text-lg font-bold text-on-surface">Booking Rules</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary block">Max Advance Booking (Days)</label>
                  <div className="flex items-center gap-4">
                    <input className="flex-1 accent-primary h-1.5 bg-surface-container-high rounded-full appearance-none outline-none" type="range" defaultValue={30} />
                    <span className="text-sm font-bold w-8">30</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary block">Slot Duration (Min)</label>
                  <select className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20 appearance-none" defaultValue="45 Minutes">
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="45 Minutes">45 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-secondary block">Max Queue Size</label>
                  <input className="w-full bg-surface-container-low border-none outline-none rounded-xl px-4 py-3 text-sm" type="number" defaultValue="12" />
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Allow Walk-ins</span>
                    <button className="w-10 h-5 bg-primary rounded-full relative focus:outline-none">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Require Phone No.</span>
                    <button className="w-10 h-5 bg-primary rounded-full relative focus:outline-none">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Auto-confirm</span>
                    <button className="w-10 h-5 bg-outline-variant rounded-full relative focus:outline-none">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-all"></div>
                    </button>
                  </div>
                </div>
                
                <button className="w-full mt-6 py-4 bg-secondary text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-secondary/90 transition-all focus:outline-none">
                  Save Rules
                </button>
              </div>
            </div>

            {/* Visual Accent Card */}
            <div className="relative h-48 rounded-[2rem] overflow-hidden group border border-outline-variant/10 shadow-sm">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="close-up of professional barber tools and scissors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKgTR30t3ZfZF1NysUF0--BUVGhI8nmnd4XyMB-Ekuyr8ACqRUeTSwdKkP6kAqh2X9a4oqJm15H8xRTNUpoc-YeofXrIX072dIyo4-X3osgHnTkLlI3yH_HQSEEHM1hjDTcE1GwZvNi77s0wCbhQ7fFTiBWpqMoRAM9YWmM324K_UieNhLLFsUaEvC5-J-qHfTnF75iQEuTwdqcSi2QzoXxxd7UVsKtIILghcbmJ1h6oxF1q4hV5IsWoBK54D3xCd5nVzxoXVedJs" />
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white mb-1">Your Space</span>
                <span className="text-white font-bold leading-tight">Reviewing 24 daily slots for next week.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual FAB for quick actions */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50 focus:outline-none">
        <span className="material-symbols-outlined" data-icon="add" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>add</span>
      </button>
    </div>
  );
}
