import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parse, addMinutes, isBefore, format, parseISO } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const barberId = searchParams.get('barberId');
    const dateStr = searchParams.get('date');
    const salonId = searchParams.get('salonId');

    if (!dateStr || !salonId) {
      return NextResponse.json({ success: false, error: 'date and salonId are required' }, { status: 400 });
    }

    const salon = await prisma.salon.findUnique({
      where: { id: salonId },
      select: { slotDuration: true }
    });

    if (!salon) {
      return NextResponse.json({ success: false, error: 'Salon not found' }, { status: 404 });
    }

    const reqDate = new Date(dateStr);
    const dayOfWeek = reqDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
    let startTime = '09:00';
    let endTime = '20:00';
    let isDayOff = false;

    if (barberId && barberId !== 'any') {
      const schedule = await prisma.schedule.findFirst({
        where: { barberId, dayOfWeek }
      });
      if (schedule) {
        startTime = schedule.startTime;
        endTime = schedule.endTime;
        isDayOff = schedule.isDayOff;
      }
    }

    if (isDayOff) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    // Get booked slots for the date
    let whereClause: any = {
      salonId,
      date: {
        gte: new Date(`${dateStr}T00:00:00.000Z`),
        lte: new Date(`${dateStr}T23:59:59.999Z`),
      },
      status: { not: 'cancelled' }
    };

    if (barberId && barberId !== 'any') {
      whereClause.barberId = barberId;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      select: { timeSlot: true, duration: true }
    });

    // Mark unavailable minutes
    // Time format is HH:mm
    const bookedMinutes: Record<string, boolean> = {};

    bookings.forEach(booking => {
         const t = parse(booking.timeSlot, 'HH:mm', reqDate);
         for (let step = 0; step < booking.duration; step += salon.slotDuration) {
             bookedMinutes[format(addMinutes(t, step), 'HH:mm')] = true;
         }
    });

    const start = parse(startTime, 'HH:mm', reqDate);
    const end = parse(endTime, 'HH:mm', reqDate);

    let slots = [];
    let current = start;

    const now = new Date();
    const isToday = format(now, 'yyyy-MM-dd') === dateStr;

    while (isBefore(current, end)) {
      const timeStr = format(current, 'HH:mm');
      
      let available = !bookedMinutes[timeStr];
      
      // If today, cannot book past times
      if (isToday) {
         if (isBefore(current, now)) {
             available = false;
         }
      }

      slots.push({
        time: timeStr,
        available
      });
      current = addMinutes(current, salon.slotDuration);
    }

    return NextResponse.json({ success: true, data: slots }, { status: 200 });
  } catch (error) {
    console.error('[BOOKING_SLOTS_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
