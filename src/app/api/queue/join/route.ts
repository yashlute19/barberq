import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const joinSchema = z.object({
  salonId: z.string().min(1, 'salonId is required'),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  barberId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = joinSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { salonId, customerName, customerPhone, barberId } = parsed.data;

    const salon = await prisma.salon.findUnique({
      where: { id: salonId },
      select: { isOpen: true, maxQueueSize: true }
    });

    if (!salon) {
      return NextResponse.json({ success: false, error: 'Salon not found' }, { status: 404 });
    }

    if (!salon.isOpen) {
      return NextResponse.json({ success: false, error: 'Salon is closed' }, { status: 400 });
    }

    const currentCount = await prisma.queueEntry.count({
      where: { salonId, status: { in: ['waiting', 'in_service'] } }
    });

    if (currentCount >= salon.maxQueueSize) {
      return NextResponse.json({ success: false, error: 'Queue is full' }, { status: 400 });
    }

    const lastEntry = await prisma.queueEntry.findFirst({
      where: { salonId, status: { in: ['waiting', 'in_service'] } },
      orderBy: { position: 'desc' }
    });

    const newPosition = lastEntry ? lastEntry.position + 1 : 1;

    const entry = await prisma.queueEntry.create({
      data: {
        salonId,
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        barberId: barberId || null,
        position: newPosition,
        status: 'waiting'
      },
      include: {
        barber: { select: { id: true, name: true, status: true } }
      }
    });

    return NextResponse.json({ success: true, data: entry }, { status: 200 });
  } catch (error) {
    console.error('[QUEUE_JOIN_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
