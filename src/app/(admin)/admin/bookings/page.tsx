import Link from 'next/link';

export default function AdminBookingsPage() {
  return (
    <div className="flex-1 p-6 md:p-10 bg-surface min-h-screen xl:max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-10 mt-8 md:mt-0">
        <div>
          <h1 className="text-3xl md:text-[2.75rem] font-bold tracking-tighter text-on-surface leading-tight">Appointments</h1>
          <p className="text-secondary font-medium mt-1">Manage and schedule your atelier sessions.</p>
        </div>
        <div className="flex flex-col sm:flex-row shadow-sm gap-4 items-stretch md:items-center">
          <div className="flex items-center justify-between bg-surface-container-low px-4 py-2.5 rounded-full border border-outline-variant/10 whitespace-nowrap">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-outline text-lg mr-2" data-icon="calendar_today">calendar_today</span>
              <span className="text-sm font-medium text-on-surface-variant">Oct 24, 2023 - Oct 31, 2023</span>
            </div>
            <button className="material-symbols-outlined text-outline text-lg ml-4 hover:text-primary transition-colors focus:outline-none" data-icon="expand_more">expand_more</button>
          </div>
          <button className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 whitespace-nowrap">
            <span className="material-symbols-outlined" data-icon="add">add</span>
            New Booking
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button className="bg-primary text-on-primary px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap">All</button>
        <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap">Confirmed</button>
        <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap">Pending</button>
        <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap">Cancelled</button>
        <button className="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap">Completed</button>
      </div>

      {/* Table Container */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-100/80 border-b border-outline-variant/5">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Booking ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Barber</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Date &amp; Time</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Service</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">

              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors group">
                <td className="px-6 py-5 text-sm font-medium text-outline">#AT-8921</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-xs font-bold text-on-secondary-container">JS</div>
                    <span className="text-sm font-semibold text-on-surface">Julian Schmidt</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface">Marco V.</td>
                <td className="px-6 py-5">
                  <p className="text-sm font-semibold text-on-surface">Oct 26, 2023</p>
                  <p className="text-xs text-outline font-medium">10:30 AM</p>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-container/20 px-2 py-1 rounded whitespace-nowrap">Executive Cut</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-600 border border-teal-100">
                    Confirmed
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/admin/bookings/AT-8921" className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-primary transition-colors inline-block" title="View Details">
                      <span className="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
                    </Link>
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-primary transition-colors inline-block" title="Edit">
                      <span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-error transition-colors inline-block" title="Cancel Booking">
                      <span className="material-symbols-outlined text-lg" data-icon="close">close</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors group">
                <td className="px-6 py-5 text-sm font-medium text-outline">#AT-8922</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-xs font-bold text-on-secondary-container">DB</div>
                    <span className="text-sm font-semibold text-on-surface">David Beckham</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface">Luca S.</td>
                <td className="px-6 py-5">
                  <p className="text-sm font-semibold text-on-surface">Oct 26, 2023</p>
                  <p className="text-xs text-outline font-medium">11:15 AM</p>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-container/20 px-2 py-1 rounded whitespace-nowrap">Beard Sculpt</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/admin/bookings/AT-8922" className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-primary transition-colors inline-block" title="View Details">
                      <span className="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
                    </Link>
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-primary transition-colors inline-block" title="Edit">
                      <span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-error transition-colors inline-block" title="Cancel Booking">
                      <span className="material-symbols-outlined text-lg" data-icon="close">close</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low/30 transition-colors group">
                <td className="px-6 py-5 text-sm font-medium text-outline">#AT-8923</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container/30 flex items-center justify-center text-xs font-bold text-on-secondary-container">MW</div>
                    <span className="text-sm font-semibold text-on-surface">Marcus Wright</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-on-surface">Marco V.</td>
                <td className="px-6 py-5">
                  <p className="text-sm font-semibold text-on-surface">Oct 26, 2023</p>
                  <p className="text-xs text-outline font-medium">01:00 PM</p>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-container/20 px-2 py-1 rounded whitespace-nowrap">The Full Atelier</span>
                </td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/admin/bookings/AT-8923" className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-primary transition-colors inline-block" title="View Details">
                      <span className="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
                    </Link>
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-primary transition-colors inline-block" title="Edit">
                      <span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
                    </button>
                    <button className="p-1.5 hover:bg-surface-container-high rounded-lg text-outline-variant hover:text-error transition-colors inline-block" title="Cancel Booking">
                      <span className="material-symbols-outlined text-lg" data-icon="close">close</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Empty State (Hidden) */}
        <div className="hidden flex-col items-center justify-center py-32 px-10 text-center">
          <div className="relative w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-outline-variant" data-icon="calendar_today">calendar_today</span>
            <span className="material-symbols-outlined absolute right-0 bottom-0 text-xl text-error bg-white rounded-full border-2 border-white" data-icon="close">close</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-2">No bookings found</h3>
          <p className="text-outline max-w-sm mx-auto">Try adjusting your filters or date range to find what you&apos;re looking for.</p>
          <button className="mt-8 text-primary font-bold hover:underline focus:outline-none">Clear all filters</button>
        </div>

        {/* Pagination */}
        <div className="px-6 py-6 border-t border-surface-container-low flex items-center justify-between">
          <p className="text-xs font-medium text-outline uppercase tracking-widest hidden sm:block">Showing 1-10 of 124 bookings</p>
          <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-low transition-colors disabled:opacity-30 focus:outline-none" disabled>
              <span className="material-symbols-outlined text-lg" data-icon="chevron_left">chevron_left</span>
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm focus:outline-none">1</button>
              <button className="w-10 h-10 rounded-full border border-outline-variant/30 hidden sm:flex items-center justify-center hover:bg-surface-container-low transition-colors font-bold text-sm focus:outline-none">2</button>
              <button className="w-10 h-10 rounded-full border border-outline-variant/30 hidden sm:flex items-center justify-center hover:bg-surface-container-low transition-colors font-bold text-sm focus:outline-none">3</button>
            </div>
            <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-low transition-colors focus:outline-none">
              <span className="material-symbols-outlined text-lg" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
