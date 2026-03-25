import Link from 'next/link';

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen pb-32">
      {/* TopNavBar - Fixed Shell */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl h-16 flex justify-between items-center px-6 py-3">
        <Link href="/" className="text-xl font-bold tracking-tighter text-teal-800 dark:text-teal-300">BarberQ</Link>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-slate-500 hover:text-teal-600 transition-colors" data-icon="notifications">notifications</button>
          <button className="material-symbols-outlined text-slate-500 hover:text-teal-600 transition-colors" data-icon="account_circle">account_circle</button>
        </div>
      </header>

      <main className="max-w-[720px] mx-auto px-6 pt-24 pb-12">
        {/* Progress Header */}
        <div className="mb-12">
          <h1 className="text-[2.75rem] font-extrabold tracking-tight leading-none mb-4">Book Your Session</h1>
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 h-1 rounded-full bg-primary overflow-hidden">
              <div className="h-full bg-primary w-1/2"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-xs tracking-widest uppercase">Select Time</span>
              <span className="material-symbols-outlined text-xs text-outline" data-icon="arrow_forward">arrow_forward</span>
              <span className="text-outline font-bold text-xs tracking-widest uppercase">Your Details</span>
            </div>
          </div>
        </div>

        {/* Section 1: Barber Selection */}
        <section className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-1">Step 1</h2>
              <h3 className="text-xl font-semibold">Choose Your Expert</h3>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {/* Selected Barber */}
            <button className="flex-shrink-0 w-44 p-5 rounded-xl bg-surface-container-lowest border-2 border-primary text-left transition-all ring-offset-2 focus:ring-2 ring-primary">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg mb-4">ML</div>
              <div className="text-on-surface font-semibold text-sm">Marcus Laurent</div>
              <div className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1">Available Today</div>
            </button>

            {/* Barber Option */}
            <button className="flex-shrink-0 w-44 p-5 rounded-xl bg-surface-container-lowest border border-transparent hover:bg-surface-container-low text-left transition-all">
              <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold text-lg mb-4">EJ</div>
              <div className="text-on-surface font-semibold text-sm">Elena Jaye</div>
              <div className="text-outline text-[10px] font-bold uppercase tracking-wider mt-1">Next: Tomorrow</div>
            </button>

            {/* Barber Option */}
            <button className="flex-shrink-0 w-44 p-5 rounded-xl bg-surface-container-lowest border border-transparent hover:bg-surface-container-low text-left transition-all">
              <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold text-lg mb-4">TK</div>
              <div className="text-on-surface font-semibold text-sm">Theo Kael</div>
              <div className="text-outline text-[10px] font-bold uppercase tracking-wider mt-1">Fully Booked</div>
            </button>
          </div>
        </section>

        {/* Section 2: Date Picker */}
        <section className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">Select Date</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button className="flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl bg-primary text-on-primary shadow-lg transition-all active:scale-95">
              <span className="text-[10px] font-bold uppercase tracking-tighter">Mon</span>
              <span className="text-xl font-bold">12</span>
            </button>
            <button className="flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low transition-all">
              <span className="text-[10px] font-bold uppercase tracking-tighter">Tue</span>
              <span className="text-xl font-bold">13</span>
            </button>
            <button className="flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low transition-all">
              <span className="text-[10px] font-bold uppercase tracking-tighter">Wed</span>
              <span className="text-xl font-bold">14</span>
            </button>
            <button className="flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low transition-all">
              <span className="text-[10px] font-bold uppercase tracking-tighter">Thu</span>
              <span className="text-xl font-bold">15</span>
            </button>
            <button className="flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low transition-all">
              <span className="text-[10px] font-bold uppercase tracking-tighter">Fri</span>
              <span className="text-xl font-bold">16</span>
            </button>
          </div>
        </section>

        {/* Section 3: Time Grid */}
        <section className="mb-16">
          <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">Morning &amp; Afternoon</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="py-4 px-2 rounded-xl border border-white bg-surface-container-lowest font-medium text-sm hover:border-primary transition-all">09:00 AM</button>
            <button className="py-4 px-2 rounded-xl bg-slate-200 text-slate-400 font-medium text-sm cursor-not-allowed line-through" disabled>09:45 AM</button>
            <button className="py-4 px-2 rounded-xl border border-white bg-surface-container-lowest font-medium text-sm hover:border-primary transition-all">10:30 AM</button>
            <button className="py-4 px-2 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-md ring-2 ring-primary ring-offset-2">11:15 AM</button>
            <button className="py-4 px-2 rounded-xl border border-white bg-surface-container-lowest font-medium text-sm hover:border-primary transition-all">12:00 PM</button>
            <button className="py-4 px-2 rounded-xl border border-white bg-surface-container-lowest font-medium text-sm hover:border-primary transition-all">01:30 PM</button>
            <button className="py-4 px-2 rounded-xl bg-slate-200 text-slate-400 font-medium text-sm cursor-not-allowed line-through" disabled>02:15 PM</button>
            <button className="py-4 px-2 rounded-xl border border-white bg-surface-container-lowest font-medium text-sm hover:border-primary transition-all">03:00 PM</button>
            <button className="py-4 px-2 rounded-xl border border-white bg-surface-container-lowest font-medium text-sm hover:border-primary transition-all">04:45 PM</button>
          </div>
        </section>

        {/* Section 4: Customer Details */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-secondary mb-1">Step 2</h2>
              <h3 className="text-xl font-semibold">Your Details</h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-2 ml-1">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="person">person</span>
                <input className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/50" placeholder="e.g. Julian Pierce" type="text" />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" data-icon="phone">phone</span>
                <input className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/50" placeholder="+1 (555) 000-0000" type="tel" />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-2 ml-1">Notes (Optional)</label>
              <textarea className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/20 transition-all text-on-surface placeholder:text-outline/50 resize-none" placeholder="Any specific requirements or style preferences?" rows={3}></textarea>
            </div>
          </div>
        </section>

        {/* Section 5: Summary Card */}
        <section className="bg-surface-container-low rounded-2xl p-6 mb-12">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">Summary</h4>
            <button className="text-xs font-bold text-primary underline underline-offset-4">edit selection</button>
          </div>

          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <span className="block text-[10px] text-outline uppercase font-bold mb-1">Service With</span>
              <span className="text-sm font-semibold text-on-surface">Marcus Laurent</span>
            </div>
            <div>
              <span className="block text-[10px] text-outline uppercase font-bold mb-1">Date &amp; Time</span>
              <span className="text-sm font-semibold text-on-surface">Mon, June 12 • 11:15 AM</span>
            </div>
            <div>
              <span className="block text-[10px] text-outline uppercase font-bold mb-1">Estimated Cost</span>
              <span className="text-sm font-semibold text-on-surface">$45.00</span>
            </div>
            <div>
              <span className="block text-[10px] text-outline uppercase font-bold mb-1">Duration</span>
              <span className="text-sm font-semibold text-on-surface">45 mins</span>
            </div>
          </div>
        </section>

        {/* CTA Action */}
        <Link href="/book/confirmation/sample-id" className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-5 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 group">
          Confirm Booking
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
        </Link>

      </main>

      {/* BottomNavBar - Navigation Shell (Mobile Only Logic) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center px-4 pb-6 pt-2">
        <Link href="/" className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-4 py-2 hover:text-teal-500 transition-colors">
          <span className="material-symbols-outlined" data-icon="home">home</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
        </Link>
        <Link href="/queue" className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-4 py-2 hover:text-teal-500 transition-colors">
          <span className="material-symbols-outlined" data-icon="reorder">reorder</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Live Queue</span>
        </Link>
        <Link href="/book" className="flex flex-col items-center justify-center bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-2xl px-4 py-2">
          <span className="material-symbols-outlined" data-icon="add_circle" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Book</span>
        </Link>
        <Link href="/admin/login" className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-4 py-2 hover:text-teal-500 transition-colors">
          <span className="material-symbols-outlined" data-icon="person">person</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
