'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Supabase automatically picks up the recovery token from the URL hash
    // and establishes a session — we just need to confirm it exists
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidSession(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to login after 3 seconds
    setTimeout(() => router.push('/admin/login'), 3000);
  };

  return (
    <div className="bg-surface text-on-surface overflow-hidden min-h-screen">
      <main className="flex min-h-screen">
        {/* Left Section */}
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
                Create a new<br />
                <span className="text-primary-fixed">secure password.</span>
              </h1>
              <p className="text-lg text-secondary-fixed/80 max-w-sm font-medium">
                Choose a strong password to keep your workspace protected.
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
            {success ? (
              /* Success State */
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock_reset</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-on-surface">Password Updated</h2>
                  <p className="text-on-surface-variant font-medium">
                    Your password has been reset successfully. Redirecting you to sign in...
                  </p>
                </div>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-container transition-all"
                >
                  <span>Go to Sign In</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            ) : (
              <>
                <header className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-on-surface">Reset Password</h2>
                  <p className="text-on-surface-variant font-medium">Enter your new password below.</p>
                </header>

                <form className="space-y-6" onSubmit={handleReset}>
                  {error && (
                    <div className="p-4 rounded-xl bg-error/10 text-error text-sm font-medium border border-error/20">
                      {error}
                    </div>
                  )}

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant ml-1" htmlFor="password">
                      New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined">lock</span>
                      </div>
                      <input
                        className="block w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-2xl text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                      />
                      <button
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline-variant hover:text-on-surface-variant transition-colors"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <span className="material-symbols-outlined">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-widest uppercase text-on-surface-variant ml-1" htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined">lock_open</span>
                      </div>
                      <input
                        className="block w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    {/* Live match indicator */}
                    {confirmPassword.length > 0 && (
                      <p className={`text-xs font-medium ml-1 ${password === confirmPassword ? 'text-green-600' : 'text-error'}`}>
                        {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary-container text-white font-bold py-4 px-6 rounded-full transition-all shadow-lg shadow-primary/10 active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{loading ? 'Updating...' : 'Update Password'}</span>
                      {!loading && <span className="material-symbols-outlined text-lg">check_circle</span>}
                    </button>
                  </div>
                </form>
              </>
            )}

            <footer className="pt-8 text-center">
              <p className="text-sm text-outline font-medium">
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