import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get('salonId');

    if (!salonId) {
      return NextResponse.json({ success: false, error: 'salonId required' }, { status: 400 });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 1. Total Bookings Today
    const bookingsToday = await prisma.booking.count({
      where: {
        salonId,
        date: { gte: todayStart, lte: todayEnd },
        status: { not: 'cancelled' }
      }
    });

    // 2. Revenue Today (Assuming sum of price, but price is missing in booking schema from our simplified version. Let's calculate from dummy or count)
    // For now we'll mock revenue based on average service cost 35
    const revenueToday = bookingsToday * 35; // Dummy logic for now

    // 3. Active queue
    const activeQueue = await prisma.queueEntry.count({
      where: {
        salonId,
        status: { in: ['waiting', 'in_service'] }
      }
    });

    // 4. Upcoming Bookings
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        salonId,
        date: { gte: new Date() }, // From now onwards
        status: 'confirmed'
      },
      orderBy: { date: 'asc' },
      take: 4,
      include: { barber: { select: { name: true } } }
    });

    return NextResponse.json({
      success: true,
      data: {
        bookingsToday,
        revenueToday,
        activeQueue,
        upcomingBookings
      }
    });

  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    console.error('[STATS_GET_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
