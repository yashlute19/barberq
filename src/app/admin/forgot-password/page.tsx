'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/admin/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Always show success — never reveal if email exists or not
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-surface text-on-surface overflow-hidden min-h-screen">
      <main className="flex min-h-screen">
        {/* Left Section — same as login */}
        <section className="hidden lg:flex lg:w-[40%] bg-secondary relative overflow-hidden flex-col justify-between p-12 text-white">
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
                Reset your<br />
                <span className="text-primary-fixed">access securely.</span>
              </h1>
              <p className="text-lg text-secondary-fixed/80 max-w-sm font-medium">
                Enter your staff email and we'll send a secure reset link straight to your inbox.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-secondary-fixed/40">Powered by The Precision Atelier</p>
          </div>
        </section>

        {/* Right Section */}
        <section className="w-full lg:w-[60%] flex items-center justify-center p-6 bg-surface-container-lowest relative">
          <div className="absolute top-8 left-8 flex items-center space-x-2 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
            </div>
            <span className="text-lg font-black tracking-widest uppercase text-on-surface">BarberQ</span>
          </div>

          <div className="w-full max-w-md space-y-10">
            {!submitted ? (
              <>
                <header className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-on-surface">Forgot Password</h2>
                  <p className="text-on-surface-variant font-medium">
                    Enter your staff email address and we'll send a reset link.
                  </p>
                </header>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {error && (
                    <div className="p-4 rounded-xl bg-error/10 text-error text-sm font-medium border border-error/20">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant ml-1" htmlFor="email">
                      Staff Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <input
                        className="block w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                        id="email"
                        type="email"
                        placeholder="barber@precisionatelier.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
                      {!loading && <span className="material-symbols-outlined text-lg">send</span>}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-on-surface">Check your inbox</h2>
                  <p className="text-on-surface-variant font-medium max-w-sm mx-auto">
                    If <span className="font-bold text-on-surface">{email}</span> is registered as a staff account, you'll receive a password reset link shortly.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low text-on-surface-variant text-sm">
                  Didn't receive it? Check your spam folder or wait a minute before trying again.
                </div>
              </div>
            )}

            <footer className="pt-8 text-center">
              <p className="text-sm text-outline font-medium">
                Remember your password?{' '}
                <Link className="text-primary font-bold hover:underline" href="/admin/login">
                  Back to Sign In
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}