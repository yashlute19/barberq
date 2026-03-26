'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center text-slate-400 hover:text-red-400 text-xs font-medium uppercase tracking-widest transition-colors w-full text-left"
    >
      <span className="material-symbols-outlined text-sm mr-2">logout</span>
      Logout
    </button>
  );
}
