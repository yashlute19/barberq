import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <div className="bg-surface text-on-surface overflow-hidden min-h-screen">
      <main className="flex min-h-screen">
        {/* Left Section (Identity & Brand) */}
        <section className="hidden lg:flex lg:w-[40%] bg-secondary relative overflow-hidden flex-col justify-between p-12 text-white">
          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-on-secondary-fixed/90 z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-16">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
              </div>
              <span className="text-2xl font-black tracking-widest uppercase">BarberQ</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tighter leading-tight">
                Manage your queue.<br />
                <span className="text-primary-fixed">Serve your clients.</span>
              </h1>
              <p className="text-lg text-secondary-fixed/80 max-w-sm font-medium">
                The ultimate precision toolkit for the modern master barber and atelier manager.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="grid gap-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary-fixed">format_list_numbered</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Live queue visibility</p>
                  <p className="text-sm text-secondary-fixed/60">Real-time tracking of every chair and client.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary-fixed">calendar_today</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Appointment management</p>
                  <p className="text-sm text-secondary-fixed/60">Seamlessly transition between walk-ins and bookings.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary-fixed">query_stats</span>
                </div>
                <div>
                  <p className="font-bold text-lg">Daily analytics</p>
                  <p className="text-sm text-secondary-fixed/60">Track your performance and peak hours instantly.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-fixed/40">Powered by The Precision Atelier</p>
            </div>
          </div>
        </section>

        {/* Right Section (Login Form) */}
        <section className="w-full lg:w-[60%] flex items-center justify-center p-6 bg-surface-container-lowest relative">
          {/* Mobile Brand Header */}
          <div className="absolute top-8 left-8 flex items-center space-x-2 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
            </div>
            <span className="text-lg font-black tracking-widest uppercase text-on-surface">BarberQ</span>
          </div>

          <div className="w-full max-w-md space-y-10">
            <header className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-on-surface">Staff Login</h2>
              <p className="text-on-surface-variant font-medium">Access your barber dashboard to manage the floor.</p>
            </header>

            <form className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant ml-1" htmlFor="email">Staff Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <input className="block w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" id="email" name="email" placeholder="barber@precisionatelier.com" type="email" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant" htmlFor="password">Secure Password</label>
                  <button type="button" className="text-xs font-bold text-primary hover:text-primary-container transition-colors tracking-tight">Forgot password?</button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <input className="block w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-2xl text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all" id="password" name="password" placeholder="••••••••" type="password" />
                  <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline-variant hover:text-on-surface-variant transition-colors" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between px-1">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input className="sr-only" type="checkbox" />
                    <div className="w-5 h-5 bg-surface-container-high rounded border-none group-hover:bg-surface-container-highest transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm hidden group-has-[:checked]:block">check</span>
                    </div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-on-surface-variant">Remember me for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Link href="/admin/dashboard" className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center space-x-2">
                  <span>Sign In to Workspace</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </form>

            <footer className="pt-8 text-center space-y-4">
              <p className="text-sm text-outline font-medium">Not staff? <Link className="text-primary font-bold hover:underline" href="/">Back to client bookings</Link></p>
              <div className="flex items-center justify-center space-x-2 opacity-30 grayscale pointer-events-none">
                <span className="text-[10px] font-bold tracking-widest uppercase">Verified Secure Workspace</span>
                <span className="material-symbols-outlined text-xs">verified_user</span>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
