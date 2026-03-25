import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 py-3 h-16">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl" data-icon="content_cut">content_cut</span>
          <span className="text-xl font-bold tracking-tighter text-teal-800 dark:text-teal-300">BarberQ</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-600 px-1 py-1" href="/queue">Live Queue</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-teal-600 transition-colors" href="/book">Book Appointment</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/login" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 transition-colors text-sm font-medium">Sign In</Link>
          <Link href="/queue" className="bg-primary text-on-primary rounded-full px-5 py-2 text-sm font-semibold shadow-sm hover:opacity-90 transition-all">Join Queue</Link>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-16 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-12 md:pt-32 md:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <h1 className="text-display-md text-4xl md:text-6xl font-black tracking-tighter text-on-surface mb-6 leading-tight">
                BarberQ — Precision <br />Grooming for <br /><span className="text-primary">Modern Gentlemen</span>.
              </h1>
              <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                Your style, our craft. Experience the next generation of barbering with real-time queue tracking and seamless digital bookings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/queue" className="flex items-center justify-center gap-2 bg-primary text-on-primary rounded-full px-8 py-4 font-bold text-lg shadow-xl hover:scale-105 transition-transform duration-200">
                  <span className="material-symbols-outlined" data-icon="group">group</span>
                  See Current Queue
                </Link>
                <Link href="/book" className="flex items-center justify-center gap-2 bg-surface-container-high text-on-secondary-container rounded-full px-8 py-4 font-bold text-lg hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Bento Style Queue & Stats Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {/* Live Queue Preview Card */}
              <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_40px_80px_-15px_rgba(0,104,95,0.08)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  <span className="material-symbols-outlined text-8xl" data-icon="hourglass_empty">hourglass_empty</span>
                </div>
                <div className="flex justify-between items-start mb-8 relative">
                  <div>
                    <span className="label-sm text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-2 block">Live Status</span>
                    <h3 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" data-icon="schedule" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                      3 people waiting
                    </h3>
                  </div>
                  <div className="bg-teal-50 rounded-full px-3 py-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Live</span>
                  </div>
                </div>

                <div className="space-y-6 relative">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-on-surface-variant text-sm font-medium">Estimated wait time</span>
                      <span className="text-3xl font-black text-primary">~25 <span className="text-sm font-bold uppercase tracking-tighter">min</span></span>
                    </div>
                    <div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-1/2"></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] font-bold text-outline uppercase tracking-widest">3 of 6 slots filled</span>
                      <span className="text-[10px] font-medium text-outline italic">Updated 2 min ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between h-32">
                  <span className="material-symbols-outlined text-teal-600 text-3xl" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase tracking-widest">Shop Status</p>
                    <p className="text-lg font-bold text-on-surface">Open Now</p>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between h-32">
                  <span className="material-symbols-outlined text-on-surface-variant text-3xl" data-icon="query_builder">query_builder</span>
                  <div>
                    <p className="text-xs font-bold text-outline uppercase tracking-widest">Closing Time</p>
                    <p className="text-lg font-bold text-on-surface">8:00 PM</p>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between h-32 sm:col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-primary" data-icon="content_cut">content_cut</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-outline uppercase tracking-widest">Staff Availability</p>
                      <p className="text-lg font-bold text-on-surface">2 Barbers Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background Aesthetic Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-screen bg-surface-container-low -z-10 rounded-l-[100px] opacity-50"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        </section>

        {/* Secondary Detail Section (Atmospheric Image) */}
        <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto w-full">
          <div className="rounded-[40px] overflow-hidden relative h-[400px] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Modern Barber Shop Interior" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIBUye_IaLI2QM-dkOKMeldEm1frAjILiKS6Guja1EQBaBhw7WTXtyfFxtHbuC2kan3_u8rPu8YJG2JqRE3Gi4JRaCbKirEEPixERkkNJ7sDo0zDa4PXvh7fCafmxz89Ylgc5483bXFVT8XXqK-LawOBekzRixC9_o5xFGhVL4IGN_J-2nZS2Ynes2Dyn9N0KOa3yso5EHLINf3m-ku_Hs3-eCVwKnbC6hoKK_a01RPJdjaxdyGCHF5w3CFeYp6sxhwAlFlK-DXXI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent flex flex-col justify-end p-12">
              <h2 className="text-3xl font-bold text-white mb-2">Masterful Craftsmanship</h2>
              <p className="text-white/80 max-w-md">Every cut is a signature. Our master barbers combine traditional technique with modern precision.</p>
            </div>
          </div>
        </section>

        {/* Spacer for Footer */}
        <div className="flex-grow"></div>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-950 px-6 py-16 border-t border-slate-100 dark:border-slate-900 mt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl" data-icon="content_cut">content_cut</span>
                <span className="text-xl font-black tracking-tighter text-teal-800 dark:text-teal-300">BarberQ</span>
              </div>
              <p className="text-on-surface-variant max-w-sm mb-6 leading-relaxed">
                Elevating the grooming experience through technology and artistry. Join the queue digitally and value your time as much as your look.
              </p>
              <div className="flex gap-4">
                <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-sm" data-icon="public">public</span></a>
                <a className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-sm" data-icon="chat">chat</span></a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-6">Visit Us</h4>
              <p className="text-on-surface font-medium mb-2">123 Main St</p>
              <p className="text-on-surface-variant mb-6">Mumbai, MH 400001</p>
              <p className="text-primary font-bold">+91 98765 43210</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-6">Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Mon - Fri</span>
                  <span className="text-on-surface font-bold">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Saturday</span>
                  <span className="text-on-surface font-bold">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Sunday</span>
                  <span className="text-primary font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest">© 2024 The Precision Atelier. All Rights Reserved.</p>
            <div className="flex gap-8 text-[10px] font-bold text-outline uppercase tracking-widest">
              <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Contextual FAB (Only visible on mobile for quick access) */}
      <div className="md:hidden fixed bottom-8 right-6 z-50">
        <Link href="/queue" className="bg-primary text-on-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl" data-icon="add" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
        </Link>
      </div>
    </>
  );
}
