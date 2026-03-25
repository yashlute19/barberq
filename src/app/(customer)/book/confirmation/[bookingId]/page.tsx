import Link from 'next/link';

export default function BookingConfirmationPage({
  params,
}: {
  params: { bookingId: string };
}) {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary/20 min-h-screen relative overflow-hidden flex flex-col">
      {/* TopNavBar Shell */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl h-16 flex justify-center items-center px-6">
        <Link href="/" className="text-xl font-bold tracking-tighter text-teal-800 dark:text-teal-300 font-headline">
          The Precision Atelier
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 z-10 w-full">
        {/* Centered Layout Container (max 480px) */}
        <div className="w-full max-w-[480px] space-y-8 text-center mt-10">
          {/* Success Icon & Message */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-fixed text-primary shadow-sm ring-8 ring-primary/5">
              <span className="material-symbols-outlined text-5xl" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline">
              Booking Confirmed!
            </h1>
            <p className="text-on-surface-variant text-sm max-w-xs mx-auto">
              Your seat is reserved. We&apos;re preparing the tools for your arrival.
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="relative overflow-hidden bg-primary/5 border-l-4 border-primary rounded-xl p-8 text-left transition-all hover:bg-primary/[0.07]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 block mb-1">REFERENCE NUMBER</span>
                <code className="text-sm font-mono font-bold text-on-surface">#{params?.bookingId || 'BK-2041'}</code>
              </div>
              <div className="h-10 w-10 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  alt="Barber Ahmed K." 
                  className="h-full w-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChm8glUGC2imxshk2XzPQbJq4DE5m8o7Wr8XDJvM_Dy6XG89_G9jZNscZ4n1ivnpv0drQ0A_HK9Q5H8s5uduJuLqCndgDjlshB0gobJsWPI4k-ybe9-bX1YOeaZN0QTfFT3RYRqn9kdx1BSY5soip125YtS5XpT1l3Dhpts6Z7XaHxhTYfl_rcKwEQit2ZmuG5KdoU7CnA7GpJl2TvA1BOWvcP18HMEQZgGpp7Obnp9GShL1vRvwYpyCp7hRqpSon8zVq4bITOD1Q"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 block mb-1">BARBER</span>
                <p className="text-on-surface font-semibold">Ahmed K.</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 block mb-1">SERVICE DURATION</span>
                <p className="text-on-surface font-semibold">30 min</p>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 block mb-1">DATE &amp; TIME</span>
                <div className="flex items-center gap-2 text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-primary text-sm" data-icon="calendar_today">calendar_today</span>
                  <span>Oct 15, 10:30 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-4 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-xl" data-icon="event_available">event_available</span>
              Add to Calendar
            </button>
            <Link href="/queue" className="w-full bg-secondary-container hover:bg-surface-container-high text-on-secondary-container font-bold py-4 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl" data-icon="reorder">reorder</span>
              Check Queue Status
            </Link>
          </div>

          {/* Contextual Navigation Alternative */}
          <div className="pt-4">
            <Link href="/" className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-sm" data-icon="arrow_back">arrow_back</span>
              Return to Home
            </Link>
          </div>

          {/* Cancellation Note */}
          <div className="pt-8 border-t border-outline-variant/20">
            <p className="text-xs text-on-surface-variant/80 leading-relaxed">
              Need to change your plans? You can cancel or reschedule up to 2 hours before your appointment.{' '}
              <button className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">Manage Booking</button>
            </p>
          </div>
        </div>
      </main>

      {/* Map Integration (Visual Decor) */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          alt="Map view" 
          className="w-full h-full object-cover grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjJEkwYKXkPGr9t3DtWgUZvxQGxyyr7jxkd6IcmLjcBUHPSS2hl3T21ERbdW69RvrjF0CBi8aovhVCns62D5RJyjYPl20fQwLQuOh8dpkXT7JBPrWheASUNwiAC4LTRasapgbtcbqSohQ5GJsaQ6uIEKw5w8n6KNxgHSVunPgfyhjX6GU3IQyFBp8dMHJ1fQEgCyl4l5_26C-kc96pwLqREHgzRaDDXQ_3DKm0uzlSVpUqmg5hqVLUA4G2bPL-9cH0PNhOCiEjC-w"
        />
      </div>
    </div>
  );
}
