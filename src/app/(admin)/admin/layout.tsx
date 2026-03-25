import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col md:flex-row">
      {/* SideNavBar Integration */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-[240px] bg-slate-900 flex-col py-6 z-50 shadow-2xl">
        <div className="px-6 mb-10">
          <h1 className="text-lg font-black text-white tracking-widest">ATELIER ADMIN</h1>
        </div>

        <nav className="flex-1 space-y-1">
          {/* Active State: Dashboard */}
          <Link href="/admin/dashboard" className="flex items-center text-teal-400 border-l-4 border-teal-500 bg-slate-800/50 py-3 px-6 transition-all hover:bg-slate-800/80">
            <span className="material-symbols-outlined mr-3" data-icon="dashboard">dashboard</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Dashboard</span>
          </Link>

          <Link href="/admin/queue" className="flex items-center text-slate-400 hover:text-slate-100 py-3 px-6 transition-all hover:bg-slate-800/80">
            <span className="material-symbols-outlined mr-3" data-icon="hourglass_empty">hourglass_empty</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Queue</span>
          </Link>

          <Link href="/admin/bookings" className="flex items-center text-slate-400 hover:text-slate-100 py-3 px-6 transition-all hover:bg-slate-800/80">
            <span className="material-symbols-outlined mr-3" data-icon="event_note">event_note</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Bookings</span>
          </Link>

          <Link href="/admin/barbers" className="flex items-center text-slate-400 hover:text-slate-100 py-3 px-6 transition-all hover:bg-slate-800/80">
            <span className="material-symbols-outlined mr-3" data-icon="content_cut">content_cut</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Barbers</span>
          </Link>

          <Link href="/admin/settings" className="flex items-center text-slate-400 hover:text-slate-100 py-3 px-6 transition-all hover:bg-slate-800/80">
            <span className="material-symbols-outlined mr-3" data-icon="settings">settings</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Settings</span>
          </Link>
        </nav>

        <div className="px-6 py-4 mt-auto border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              className="w-10 h-10 rounded-full object-cover" 
              alt="close up portrait of a professional male barber with styled hair and beard in a studio setting" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTFjNmaNWukOu_1qMhlA6SiEn3DiS33vdOIRdWUTSCCep9oipjSCzbIXNlTIkESg5zAXZWqxwHbWfNZwjmTXS4f_mgsNlc6C1CM1O4E6ZCUQX9sbCO-19uaLbaEx0aTDj-v1_R-02a3TGPmckOUbDcYFo-DDwLnPQlGx2hBdwEEegQoujxa662C9D4yjfeYTwouU4fQPgZdgYXo815-BxtoH9QjMpvRiLkrfXW8a7G4KGPBEQwcHKSQg4WHWewZgCvw3mMHVMSm7U"
            />
            <div>
              <p className="text-white text-xs font-bold tracking-tight">Ahmed K.</p>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest">Master Barber</p>
            </div>
          </div>
          <Link href="/admin/login" className="flex items-center text-slate-400 hover:text-red-400 text-xs font-medium uppercase tracking-widest transition-colors">
            <span className="material-symbols-outlined text-sm mr-2" data-icon="logout">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      {/* We add margin-left on medium screens to account for the fixed sidebar */}
      <div className="flex-1 md:ml-[240px]">
        {children}
      </div>

      {/* BottomNavBar Suppression for Admin Web View (Visible on Small Screens only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md flex justify-around items-center px-4 pb-6 pt-2 border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="/admin/dashboard" className="flex flex-col items-center justify-center text-teal-700 bg-teal-50 rounded-2xl px-4 py-2">
          <span className="material-symbols-outlined" data-icon="home" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
        </Link>
        <Link href="/admin/queue" className="flex flex-col items-center justify-center text-slate-400 px-4 py-2 hover:text-teal-600">
          <span className="material-symbols-outlined" data-icon="reorder">reorder</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Live Queue</span>
        </Link>
        <Link href="/admin/bookings" className="flex flex-col items-center justify-center text-slate-400 px-4 py-2 hover:text-teal-600">
          <span className="material-symbols-outlined" data-icon="event_note">event_note</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Bookings</span>
        </Link>
        <Link href="/admin/settings" className="flex flex-col items-center justify-center text-slate-400 px-4 py-2 hover:text-teal-600">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
