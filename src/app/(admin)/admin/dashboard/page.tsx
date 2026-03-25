import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="p-8 pb-20">
      {/* Top Header Area */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 mt-8 md:mt-0">
        <div>
          <p className="text-secondary font-medium tracking-wide label-sm uppercase opacity-70 mb-1">Monday, October 23, 2023</p>
          <h2 className="text-on-surface font-extrabold text-3xl tracking-tight">Good morning, Ahmed K.</h2>
        </div>
        <Link href="/admin/queue" className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 w-full sm:w-auto">
          <span className="material-symbols-outlined text-xl" data-icon="reorder">reorder</span>
          View Live Queue
        </Link>
      </header>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Today&apos;s Bookings</p>
          <h3 className="text-3xl font-black text-on-surface">12</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-secondary shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">In Queue Now</p>
          <h3 className="text-3xl font-black text-on-surface">4</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-teal-500 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Completed Today</p>
          <h3 className="text-3xl font-black text-on-surface">7</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-amber-500 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.1em] mb-2">Revenue Today</p>
          <h3 className="text-3xl font-black text-on-surface">₹2,400</h3>
        </div>
      </section>

      {/* Main Dashboard Split Layout */}
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Live Queue Panel (55%) */}
        <section className="xl:w-[55%] flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-5 flex justify-between items-center border-b border-surface-container-low">
              <h4 className="text-lg font-bold text-on-surface tracking-tight">Current Queue</h4>
              <button className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider hover:underline">
                <span className="material-symbols-outlined text-sm" data-icon="add_circle" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                Add Walk-in
              </button>
            </div>
            <div className="p-2">
              <ul className="divide-y divide-surface-container-low">
                {/* Queue Item 1 */}
                <li className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 group hover:bg-surface-container-low transition-colors rounded-lg">
                  <div className="flex items-center flex-1">
                    <div className="w-8 h-8 flex items-center justify-center bg-teal-50 text-teal-600 font-bold rounded-full text-xs mr-4">1</div>
                    <div className="flex-1">
                      <h5 className="font-bold text-on-surface text-sm">Rohan Malhotra</h5>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Wait Time: 12 mins</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors" title="Mark In Service">
                      <span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
                    </button>
                    <button className="p-2 text-error hover:bg-error-container/20 rounded-full transition-colors" title="Remove">
                      <span className="material-symbols-outlined" data-icon="delete">delete</span>
                    </button>
                  </div>
                </li>

                {/* Queue Item 2 */}
                <li className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 group hover:bg-surface-container-low transition-colors rounded-lg">
                  <div className="flex items-center flex-1">
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-400 font-bold rounded-full text-xs mr-4">2</div>
                    <div className="flex-1">
                      <h5 className="font-bold text-on-surface text-sm">Vikram Singh</h5>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Wait Time: 25 mins</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors" title="Mark In Service">
                      <span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
                    </button>
                    <button className="p-2 text-error hover:bg-error-container/20 rounded-full transition-colors" title="Remove">
                      <span className="material-symbols-outlined" data-icon="delete">delete</span>
                    </button>
                  </div>
                </li>

                {/* Queue Item 3 */}
                <li className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 group hover:bg-surface-container-low transition-colors rounded-lg">
                  <div className="flex items-center flex-1">
                    <div className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-400 font-bold rounded-full text-xs mr-4">3</div>
                    <div className="flex-1">
                      <h5 className="font-bold text-on-surface text-sm">Arjun Kapoor</h5>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">Wait Time: 40 mins</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-40 justify-end">
                    <button className="p-2"><span className="material-symbols-outlined" data-icon="play_circle">play_circle</span></button>
                    <button className="p-2"><span className="material-symbols-outlined" data-icon="delete">delete</span></button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Barber Status Row */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Barber Station Status</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-10 h-10 rounded-full object-cover" alt="close up headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ6kOCjoVu6tYXmQSbQUhJW_r5nqlbh3IlgB1JmenXyPX8alIHStBJjFKDlRE565z_r2-3jpDwtQBhtTRw95zNnwNc9hfBPRnV_Y_fmAh-LjQzljdYLBCqHHMWZwBWU03Jki8IUzKt0yYI9FYlXjNgOL8JVDXXjWrUpq8nWAK72efoy3Wxwt4baVWPuXQQM9g6iIl5jGRvXFKyco-Ge93YYW21jtf5VqSWxD5lI_uUU1YP6UmAUywVnTvs9s7vEItqStBxNSEUT3A" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Ahmed K.</p>
                  <p className="text-[10px] text-teal-600 font-bold uppercase tracking-tight">With Client</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-10 h-10 rounded-full object-cover" alt="portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgNRgTzqlBrP7mW23XDevz8LE-exerBLnsIdxSTIJt7FkmPiVR0U1yFRBg5XywjghQPXsAoGPyB2CfBb2xFjcoKrZxyhDD3f1oGAT5PpbHtKqutunJYv2HTQPjIIu0qs-e972Y4N_m721W3PJW5JeFzFY6JbuusyFbHFsLxHmaZda4wQX4p766GGLgBTmnp2CVkJaKZxZsAlVKdGFDUsP1oR-9zBPKGUpctQvYBUH161D04Yu2Sh6vXSuxhssUjlfKOyJz-lTikG0" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Rahul V.</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Break</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-10 h-10 rounded-full object-cover" alt="profile shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiBFIB6C2HaZLNYfi2Z2hok1NWBOgiviBk30BBIHEHjNMIoCHgRBb7jRe-El3y3TVPkGTu2Ne9F-68SDRVGhP8i9-NgHOrv1NR-2LGqQkg3ywl7msL93T7_9TuJVH_UT9GsuD0_NPbujPgGXCrC3C5Mg1I_mVDtT1_Lsrrxx_ftKSEndFHs5IsI4aL4ypX1WJn5WeT2P2djud_nLz_cQk29QCUV2qJmr-YFBHg-Q2DSJu1eol7IjGAJfE7CXEz3O2MPj-5VnojMXA" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Sameer D.</p>
                  <p className="text-[10px] text-teal-600 font-bold uppercase tracking-tight">Available</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Appointments Panel (45%) */}
        <section className="xl:w-[45%]">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm h-full">
            <div className="px-6 py-5 flex justify-between items-center border-b border-surface-container-low">
              <h4 className="text-lg font-bold text-on-surface tracking-tight">Today&apos;s Appointments</h4>
              <Link href="/admin/bookings" className="text-xs font-bold text-secondary uppercase tracking-wider hover:underline">View All</Link>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Appointment 1 */}
                <div className="flex gap-4">
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs font-black text-on-surface">10:30</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">AM</p>
                  </div>
                  <div className="flex-1 pb-6 border-b border-surface-container-low">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-bold text-on-surface">Aditya Verma</h5>
                      <span className="px-2.5 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">Active</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Beard Sculpt &amp; Fade • <span className="text-secondary font-bold">Rahul V.</span></p>
                  </div>
                </div>

                {/* Appointment 2 */}
                <div className="flex gap-4">
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs font-black text-on-surface">11:15</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">AM</p>
                  </div>
                  <div className="flex-1 pb-6 border-b border-surface-container-low">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-bold text-on-surface">Zayn Malik</h5>
                      <span className="px-2.5 py-1 bg-amber-400/10 text-amber-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">Waiting</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Signature Cut • <span className="text-secondary font-bold">Ahmed K.</span></p>
                  </div>
                </div>

                {/* Appointment 3 */}
                <div className="flex gap-4 opacity-60">
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs font-black text-on-surface">12:00</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">PM</p>
                  </div>
                  <div className="flex-1 pb-6 border-b border-surface-container-low">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-bold text-on-surface">Kabir Singh</h5>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-tighter">Confirmed</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Hair Coloring • <span className="text-secondary font-bold">Sameer D.</span></p>
                  </div>
                </div>

                {/* Appointment 4 */}
                <div className="flex gap-4 opacity-60">
                  <div className="text-center min-w-[50px]">
                    <p className="text-xs font-black text-on-surface">01:30</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">PM</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-bold text-on-surface">Siddharth M.</h5>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-tighter">Confirmed</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Classic Buzz Cut • <span className="text-secondary font-bold">Ahmed K.</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
