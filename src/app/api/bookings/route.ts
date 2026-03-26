import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';
import { sendBookingConfirmation } from '@/lib/notifications';

const createBookingSchema = z.object({
  salonId: z.string(),
  customerName: z.string().min(2),
  customerPhone: z.string(),
  customerEmail: z.string().email().optional(),
  service: z.string(),
  date: z.string(),
  timeSlot: z.string(),
  barberId: z.string().optional(),
  notes: z.string().max(200).optional()
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get('salonId');
    const status = searchParams.get('status');
    const barberId = searchParams.get('barberId');
    const page = parseInt(searchParams.get('page') || '1') || 1;
    const limit = parseInt(searchParams.get('limit') || '10') || 10;

    // 1. Basic Validation
    if (!salonId || salonId === 'undefined' || salonId === 'null') {
      console.warn('[BOOKINGS_GET_WARN] Missing or invalid salonId');
      return NextResponse.json({ 
        success: true, 
        data: { bookings: [], total: 0, page: 1, totalPages: 0 } 
      });
    }

    // 2. Auth Check
    try {
      await requireAuth();
    } catch (authError) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Query Construction
    const where: any = { salonId };
    if (status && status !== 'all') where.status = status;
    if (barberId && barberId !== 'all') where.barberId = barberId;

    const skip = (page - 1) * limit;

    // 4. Database Fetch
    console.log('[BOOKINGS_GET_QUERY]', { where, skip, limit });
    
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          barber: { select: { id: true, name: true } }
        }
      }),
      prisma.booking.count({ where })
    ]).catch(err => {
      console.error('[BOOKINGS_PRISMA_ERROR]', err);
      throw new Error(`Database error: ${err.message}`);
    });

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('[BOOKINGS_GET_CRITICAL_ERROR]', { 
      message: error.message, 
      stack: error.stack 
    });
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { salonId, customerName, customerPhone, customerEmail, service, date, timeSlot, notes } = parsed.data;
    const barberId = parsed.data.barberId === 'any' ? undefined : parsed.data.barberId;
    
    const reqDate = new Date(`${date}T12:00:00.000Z`);

    const salon = await prisma.salon.findUnique({ where: { id: salonId } });
    if (!salon) return NextResponse.json({ success: false, error: 'Salon not found' }, { status: 404 });

    const existing = await prisma.booking.findFirst({
      where: {
        barberId,
        date: {
            gte: new Date(`${date}T00:00:00.000Z`),
            lte: new Date(`${date}T23:59:59.999Z`),
        },
        timeSlot,
        status: { not: 'cancelled' }
      }
    });

    if (existing) {
      return NextResponse.json({ success: false, error: 'Slot is no longer available' }, { status: 409 });
    }

    const booking = await prisma.booking.create({
      data: {
        salonId,
        barberId,
        customerName,
        customerPhone,
        customerEmail,
        service,
        date: reqDate,
        timeSlot,
        duration: salon.slotDuration,
        status: 'pending',
        notes
      },
      include: {
        barber: { select: { id: true, name: true } },
        salon: { select: { name: true, phone: true } }
      }
    });

    sendBookingConfirmation(booking as any);
    return NextResponse.json({ success: true, data: booking });

  } catch (error: any) {
    console.error('[BOOKINGS_POST_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
