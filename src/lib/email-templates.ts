export function bookingConfirmationTemplate(data: {
  customerName: string
  bookingId: string
  barberName: string
  date: string
  timeSlot: string
  service: string
  salonName: string
  salonPhone: string
}): { subject: string; html: string } {
  const shortId = data.bookingId.slice(-6).toUpperCase()
  return {
    subject: `Booking Confirmed — ${data.salonName}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1e293b;">
        <h1 style="color:#0B1E3D;font-size:22px;margin:0 0 4px;">Booking Confirmed</h1>
        <p style="color:#64748b;margin:0 0 20px;">Hi ${data.customerName}, your appointment is set.</p>
        <div style="background:#F0FDFA;border-left:4px solid #0D9488;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
          <p style="margin:0 0 8px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;">Booking ID</p>
          <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#0B1E3D;font-family:monospace;">#${shortId}</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:4px 0;color:#64748b;width:80px;">Barber</td><td style="padding:4px 0;font-weight:500;">${data.barberName}</td></tr>
            <tr><td style="padding:4px 0;color:#64748b;">Date</td><td style="padding:4px 0;font-weight:500;">${data.date}</td></tr>
            <tr><td style="padding:4px 0;color:#64748b;">Time</td><td style="padding:4px 0;font-weight:500;">${data.timeSlot}</td></tr>
            <tr><td style="padding:4px 0;color:#64748b;">Service</td><td style="padding:4px 0;font-weight:500;">${data.service}</td></tr>
          </table>
        </div>
        <p style="font-size:13px;color:#94a3b8;">Need to cancel? Call us at ${data.salonPhone}</p>
      </div>
    `
  }
}

export function bookingStatusUpdateTemplate(data: {
  customerName: string
  bookingId: string
  newStatus: string
  salonName: string
}): { subject: string; html: string } {
  const labels: Record<string, string> = {
    confirmed: 'Your booking has been confirmed',
    in_progress: 'Your appointment is now in progress',
    completed: 'Your appointment is complete — thank you!',
    cancelled: 'Your booking has been cancelled',
  }
  const shortId = data.bookingId.slice(-6).toUpperCase()
  return {
    subject: `${labels[data.newStatus] ?? 'Booking update'} — ${data.salonName}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1e293b;">
        <h1 style="color:#0B1E3D;font-size:20px;margin:0 0 8px;">Booking Update</h1>
        <p style="color:#475569;">Hi ${data.customerName},</p>
        <p style="color:#475569;">${labels[data.newStatus] ?? 'Your booking status has been updated'}.</p>
        <p style="color:#94a3b8;font-size:13px;">Booking ID: <span style="font-family:monospace;">#${shortId}</span></p>
      </div>
    `
  }
}
