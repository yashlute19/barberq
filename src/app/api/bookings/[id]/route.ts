import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';
import { sendBookingStatusUpdate } from '@/lib/notifications';

const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        barber: { select: { id: true, name: true } },
        salon: { select: { name: true, phone: true } }
      }
    });

    if (!booking) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    console.error('[BOOKING_GET_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth();

    const body = await req.json();
    const parsed = updateBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const bookingInfo = await prisma.booking.findUnique({
       where: { id: params.id },
       include: { salon: { select: { name: true } } }
    });

    if (!bookingInfo) return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });

    const updated = await prisma.booking.update({
      where: { id: params.id },
      data: { status: parsed.data.status },
      include: {
        barber: { select: { id: true, name: true } },
        salon: { select: { name: true, phone: true } }
      }
    });

    // Notifications
    if (parsed.data.status !== bookingInfo.status) {
        sendBookingStatusUpdate(updated as any, parsed.data.status);
    }

    return NextResponse.json({ success: true, data: updated });

  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    console.error('[BOOKING_PATCH_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth();

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: { status: 'cancelled' },
      include: { salon: { select: { name: true, phone: true } } }
    });

    sendBookingStatusUpdate(booking as any, 'cancelled');

    return NextResponse.json({ success: true, data: { message: 'Cancelled' } });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    console.error('[BOOKING_DELETE_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
