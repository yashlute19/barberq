'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/admin/LogoutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return `flex items-center py-3 px-6 transition-all hover:bg-slate-800/80 ${
      isActive ? 'text-teal-400 border-l-4 border-teal-500 bg-slate-800/50' : 'text-slate-400 hover:text-slate-100'
    }`;
  };

  const getMobileLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return `flex flex-col items-center justify-center px-4 py-2 transition-colors ${
      isActive ? 'text-teal-700 bg-teal-50 rounded-2xl' : 'text-slate-400 hover:text-teal-600'
    }`;
  };

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col md:flex-row">
      {/* SideNavBar Integration */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-[240px] bg-slate-900 flex-col py-6 z-50 shadow-2xl">
        <div className="px-6 mb-10">
          <h1 className="text-lg font-black text-white tracking-widest uppercase">Atelier Admin</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/admin/dashboard" className={getLinkStyles('/admin/dashboard')}>
            <span className="material-symbols-outlined mr-3" style={{ fontVariationSettings: pathname === '/admin/dashboard' ? "'FILL' 1" : "" }}>dashboard</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Dashboard</span>
          </Link>

          <Link href="/admin/queue" className={getLinkStyles('/admin/queue')}>
            <span className="material-symbols-outlined mr-3" style={{ fontVariationSettings: pathname === '/admin/queue' ? "'FILL' 1" : "" }}>hourglass_empty</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Queue</span>
          </Link>

          <Link href="/admin/bookings" className={getLinkStyles('/admin/bookings')}>
            <span className="material-symbols-outlined mr-3" style={{ fontVariationSettings: pathname === '/admin/bookings' ? "'FILL' 1" : "" }}>event_note</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Bookings</span>
          </Link>

          <Link href="/admin/barbers" className={getLinkStyles('/admin/barbers')}>
            <span className="material-symbols-outlined mr-3" style={{ fontVariationSettings: pathname === '/admin/barbers' ? "'FILL' 1" : "" }}>content_cut</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Barbers</span>
          </Link>

          <Link href="/admin/settings" className={getLinkStyles('/admin/settings')}>
            <span className="material-symbols-outlined mr-3" style={{ fontVariationSettings: pathname === '/admin/settings' ? "'FILL' 1" : "" }}>settings</span>
            <span className="font-sans text-sm font-medium tracking-wide uppercase">Settings</span>
          </Link>
        </nav>

        <div className="px-6 py-4 mt-auto border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <img 
              className="w-10 h-10 rounded-full object-cover" 
              alt="barber" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTFjNmaNWukOu_1qMhlA6SiEn3DiS33vdOIRdWUTSCCep9oipjSCzbIXNlTIkESg5zAXZWqxwHbWfNZwjmTXS4f_mgsNlc6C1CM1O4E6ZCUQX9sbCO-19uaLbaEx0aTDj-v1_R-02a3TGPmckOUbDcYFo-DDwLnPQlGx2hBdwEEegQoujxa662C9D4yjfeYTwouU4fQPgZdgYXo815-BxtoH9QjMpvRiLkrfXW8a7G4KGPBEQwcHKSQg4WHWewZgCvw3mMHVMSm7U"
            />
            <div>
              <p className="text-white text-xs font-bold tracking-tight">BarberQ Admin</p>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest">Salon Manager</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex-1 md:ml-[240px]">
        {children}
      </div>

      {/* BottomNavBar Integration */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md flex justify-around items-center px-4 pb-6 pt-2 border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="/admin/dashboard" className={getMobileLinkStyles('/admin/dashboard')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/dashboard' ? "'FILL' 1" : "" }}>home</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Dashboard</span>
        </Link>
        <Link href="/admin/queue" className={getMobileLinkStyles('/admin/queue')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/queue' ? "'FILL' 1" : "" }}>reorder</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Live Queue</span>
        </Link>
        <Link href="/admin/bookings" className={getMobileLinkStyles('/admin/bookings')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/bookings' ? "'FILL' 1" : "" }}>event_note</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Bookings</span>
        </Link>
        <Link href="/admin/settings" className={getMobileLinkStyles('/admin/settings')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/settings' ? "'FILL' 1" : "" }}>settings</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
