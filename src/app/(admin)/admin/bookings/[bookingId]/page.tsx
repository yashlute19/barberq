import Link from 'next/link';

export default function BookingDetailPage({ params }: { params: { bookingId: string } }) {
  const bookingId = params.bookingId || 'BK-2041';

  return (
    <div className="flex-1 p-6 md:p-8 min-h-screen bg-surface xl:max-w-7xl mx-auto">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 mt-8 md:mt-0">
        <div>
          <nav className="flex items-center space-x-2 text-label-sm text-outline mb-2 uppercase tracking-[0.05em] font-medium text-[11px]">
            <Link href="/admin/bookings" className="hover:text-primary transition-colors">Bookings</Link>
            <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
            <span className="text-on-surface">#{bookingId}</span>
          </nav>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Booking #{bookingId}</h1>
            <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">Confirmed</span>
          </div>
          <p className="text-sm text-outline mt-1 italic">Created: Oct 14, 2:00 PM</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex justify-center items-center w-full md:w-auto px-4 py-2 rounded-full bg-surface-container-high text-on-secondary-container font-semibold text-sm transition-all hover:bg-surface-container whitespace-nowrap">
            <span className="material-symbols-outlined mr-2 text-lg" data-icon="print">print</span>
            Print Receipt
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column (65%) */}
        <div className="col-span-12 xl:col-span-8 space-y-8">
          
          {/* Progress Stepper */}
          <section className="bg-surface-container-low rounded-xl p-8">
            <h3 className="text-label-sm text-outline uppercase tracking-widest font-bold mb-8">Service Status</h3>
            <div className="relative flex justify-between">
              {/* Connecting Line */}
              <div className="absolute top-5 left-0 w-full h-[2px] bg-outline-variant z-0"></div>
              <div className="absolute top-5 left-0 w-1/2 h-[2px] bg-primary z-0"></div>
              
              {/* Step 1: Pending */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined" data-icon="check">check</span>
                </div>
                <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-primary">Pending</span>
              </div>
              
              {/* Step 2: Confirmed */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined" data-icon="check">check</span>
                </div>
                <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-primary text-center">Confirmed</span>
              </div>
              
              {/* Step 3: In Progress */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-outline-variant text-outline flex items-center justify-center bg-white">
                  <span className="material-symbols-outlined" data-icon="content_cut">content_cut</span>
                </div>
                <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-outline text-center">In Progress</span>
              </div>
              
              {/* Step 4: Completed */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-2 border-outline-variant text-outline flex items-center justify-center bg-white">
                  <span className="material-symbols-outlined" data-icon="flag">flag</span>
                </div>
                <span className="mt-3 text-[11px] font-bold uppercase tracking-wider text-outline text-center">Completed</span>
              </div>
            </div>
          </section>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-label-sm text-outline uppercase tracking-widest font-bold text-xs">Customer Profile</h3>
                <span className="material-symbols-outlined text-outline" data-icon="person">person</span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full shrink-0 bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-lg">RS</div>
                <div>
                  <h4 className="text-xl font-bold text-on-surface leading-tight">Rahul S.</h4>
                  <p className="text-sm text-primary font-medium tracking-tight">+91 98765 43210</p>
                </div>
              </div>
              <div className="p-4 bg-surface-container-low rounded-lg italic text-on-surface-variant text-sm border-l-4 border-secondary">
                &quot;Regular client, likes low fade.&quot;
              </div>
            </section>

            {/* Appointment Details */}
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-label-sm text-outline uppercase tracking-widest font-bold text-xs">Appointment Info</h3>
                <span className="material-symbols-outlined text-outline" data-icon="event">event</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-outline uppercase text-[11px] font-bold tracking-wider">Barber</span>
                  <span className="font-bold">Ahmed K.</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-outline uppercase text-[11px] font-bold tracking-wider">Service</span>
                  <span className="font-bold">Haircut</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-outline uppercase text-[11px] font-bold tracking-wider">Schedule</span>
                  <span className="font-bold">Oct 15, 10:30 AM</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-outline uppercase text-[11px] font-bold tracking-wider">Duration</span>
                  <span className="font-bold">30 min</span>
                </div>
                <div className="pt-4 mt-4 border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="text-outline uppercase text-[11px] font-bold tracking-wider">Total Fee</span>
                  <span className="text-xl font-extrabold text-primary">₹500</span>
                </div>
              </div>
            </section>
          </div>

          {/* Detailed Service Description */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="text-label-sm text-outline uppercase tracking-widest font-bold mb-4 text-xs">Service Description</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Standard men&apos;s haircut including hair wash and styling with premium matte clay. Client prefers a low taper fade with 1.5 guard on the sides and scissor cut on top to maintain length for a messy-textured look. 
            </p>
          </section>
        </div>

        {/* Right Column (35%) */}
        <aside className="col-span-12 xl:col-span-4 space-y-8">
          
          {/* Quick Actions */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
            <h3 className="text-label-sm text-outline uppercase tracking-widest font-bold mb-6 text-xs">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 py-3 bg-primary rounded-full text-on-primary font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 text-sm">
                <span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
                <span>Edit Booking</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 py-3 bg-surface-container-high text-on-secondary-container rounded-full font-bold transition-all hover:bg-secondary-container text-sm">
                <span className="material-symbols-outlined text-lg" data-icon="notifications">notifications</span>
                <span>Send Reminder</span>
              </button>
              <div className="pt-4 border-t border-outline-variant/30 mt-4">
                <button className="w-full flex items-center justify-center space-x-2 py-3 text-error bg-error-container/20 rounded-full font-bold transition-all hover:bg-error-container hover:text-on-error-container text-sm">
                  <span className="material-symbols-outlined text-lg" data-icon="cancel">cancel</span>
                  <span>Cancel Booking</span>
                </button>
              </div>
            </div>
          </section>

          {/* Audit Log */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10 relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-label-sm text-outline uppercase tracking-widest font-bold text-xs">Audit Log</h3>
              <span className="material-symbols-outlined text-outline text-lg" data-icon="history">history</span>
            </div>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30">
              
              {/* Log Item 1 */}
              <div className="relative flex items-start space-x-4">
                <div className="relative z-10 w-6 h-6 rounded-full bg-surface-container-highest border-2 border-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[12px] text-primary" data-icon="schedule" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-on-surface">Booking Confirmed</p>
                    <span className="text-[10px] text-outline font-medium">Oct 14, 2:15 PM</span>
                  </div>
                  <p className="text-xs text-outline mt-1 leading-tight">Confirmed by Admin: Ahmed K.</p>
                </div>
              </div>

              {/* Log Item 2 */}
              <div className="relative flex items-start space-x-4">
                <div className="relative z-10 w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[12px] text-outline" data-icon="schedule">schedule</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-on-surface">Payment Link Sent</p>
                    <span className="text-[10px] text-outline font-medium">Oct 14, 2:05 PM</span>
                  </div>
                  <p className="text-xs text-outline mt-1 leading-tight">Automated system message</p>
                </div>
              </div>

              {/* Log Item 3 */}
              <div className="relative flex items-start space-x-4">
                <div className="relative z-10 w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[12px] text-outline" data-icon="schedule">schedule</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-bold text-on-surface">Booking Created</p>
                    <span className="text-[10px] text-outline font-medium">Oct 14, 2:00 PM</span>
                  </div>
                  <p className="text-xs text-outline mt-1 leading-tight">Customer initiated via Web App</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 text-xs text-primary font-bold uppercase tracking-widest text-center hover:underline focus:outline-none">View Full History</button>
          </section>

          {/* Support Ticket */}
          <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl text-on-primary">
            <p className="text-xs opacity-80 uppercase tracking-widest font-bold mb-2">Internal Note</p>
            <p className="text-sm leading-relaxed mb-4">&quot;Verify customer ID for first-time discount applied. Do not forget to offer the beard trim upsell.&quot;</p>
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-lg" data-icon="account_circle">account_circle</span>
              <span className="text-xs font-bold uppercase tracking-wider">Assigned to: Front Desk</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
