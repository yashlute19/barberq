import Link from 'next/link';

export default function LiveQueuePage() {
  return (
    <div className="min-h-screen pb-32">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="flex justify-between items-center w-full px-6 py-3 h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-secondary p-1 -ml-2">
              <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
            </Link>
            <h1 className="text-xl font-bold tracking-tighter text-teal-800 dark:text-teal-300">Live Queue</h1>
          </div>
          <div className="flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700">Live</span>
          </div>
        </div>
      </header>

      <main className="max-w-[640px] mx-auto px-6 pt-24 space-y-8">
        {/* Salon Status Banner */}
        <section className="bg-surface-container-low p-8 rounded-xl space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="label-sm uppercase tracking-[0.1em] text-secondary font-semibold opacity-70">Current Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2 w-2 rounded-full bg-teal-500"></span>
                <span className="text-sm font-medium">Open</span>
              </div>
            </div>
            <div className="text-right">
              <span className="label-sm uppercase tracking-[0.1em] text-secondary font-semibold opacity-70">Wait Time</span>
              <p className="text-lg font-bold text-teal-700 mt-1">~30 min</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center py-4">
            <span className="text-7xl font-extrabold text-primary tracking-tighter">4</span>
            <p className="text-secondary font-medium mt-2">People ahead of you</p>
            <div className="w-12 h-[2px] bg-primary/20 my-6"></div>
            <p className="text-sm text-on-surface-variant max-w-[280px] leading-relaxed">
              Our master barbers are working diligently to provide the perfect precision cut.
            </p>
          </div>
        </section>

        {/* Queue List */}
        <section className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-secondary/60">Queue Order</h2>
            <span className="text-xs text-secondary/40">Last updated: 2 mins ago</span>
          </div>
          <div className="space-y-3">
            {/* Guest 1 */}
            <div className="bg-surface-container-lowest border border-teal-500/20 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <p className="font-semibold text-on-surface">Guest #1</p>
                  <span className="text-xs text-teal-600 font-medium">In Service</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-teal-500" data-icon="content_cut">content_cut</span>
            </div>

            {/* Guest 2 */}
            <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <p className="font-semibold text-on-surface">Guest #2</p>
                  <span className="text-xs text-secondary/50 font-medium">Waiting</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary/20" data-icon="hourglass_empty">hourglass_empty</span>
            </div>

            {/* Your Spot (Guest 3) */}
            <div className="bg-teal-50 border-2 border-teal-100 p-5 rounded-xl flex items-center justify-between relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500"></div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-teal-900">Your spot</p>
                    <span className="bg-teal-500 text-white text-[8px] px-1.5 py-0.5 rounded font-black uppercase">YOU</span>
                  </div>
                  <span className="text-xs text-teal-700 font-medium italic">Estimated: 12:45 PM</span>
                </div>
              </div>
              <div className="text-right">
                <span className="material-symbols-outlined text-primary" data-icon="person_pin" style={{ fontVariationSettings: "'FILL' 1" }}>person_pin</span>
              </div>
            </div>

            {/* Guest 4 */}
            <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <p className="font-semibold text-on-surface">Guest #4</p>
                  <span className="text-xs text-secondary/50 font-medium">Waiting</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary/20" data-icon="hourglass_empty">hourglass_empty</span>
            </div>
          </div>
        </section>

        {/* Appointment Prompt */}
        <section className="pt-4">
          <Link href="/book" className="w-full py-4 px-6 rounded-2xl bg-secondary-container/30 text-secondary border border-secondary-container/50 flex items-center justify-between hover:bg-secondary-container/50 transition-all">
            <span className="text-sm font-semibold">Prefer a set time? Book an appointment</span>
            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
          </Link>
        </section>

        {/* Aesthetic Spacer */}
        <div className="py-10 flex flex-col items-center">
          <div className="w-8 h-8 opacity-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="" 
              className="w-full h-full grayscale" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3fDerhx1fgnhZjnThmsi3VNxriFuq2gKAh1NMnu4UOvryyCXnjTXObRUysdtuOp7K_5duk-sDDbZozyjqcO9rZjKdpaoLjH2mMX-_9Sp092hZy5wbUuNASPfY5NETnucn1G0iZwDlKG8xerEj0_OmyoMG3-u7NzLffrJKaKjfbQZuXSifsbitL3gHkhrt8YC998zAEeffC5jFAL8ANUn5v6OWSykxk_T-Tj2vqMq7P5IlAyXEfxGEzVl2rO3u2AHHmU4L8tWcMe4"
            />
          </div>
        </div>
      </main>

      {/* Sticky Bottom Join Queue CTA */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 pb-8 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-[640px] mx-auto">
          <button className="w-full bg-primary hover:bg-primary-container text-white py-4 px-8 rounded-full font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-900/10">
            <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
            <span>Join Queue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
