'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-on-surface p-8">
      <div className="max-w-md w-full text-center space-y-8 bg-surface-container-low p-12 rounded-3xl shadow-xl">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
        <p className="text-on-surface-variant font-medium">Welcome to the BarberQ management portal. You are securely authenticated.</p>
        
        <div className="pt-8 border-t border-outline-variant/30">
          <button 
            onClick={handleLogout}
            className="w-full bg-error text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg hover:shadow-error/20 hover:bg-error/90 active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Secure Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
