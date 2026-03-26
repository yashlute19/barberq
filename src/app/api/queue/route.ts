import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const salonId = req.nextUrl.searchParams.get('salonId');
    if (!salonId) {
      return NextResponse.json({ success: false, error: 'salonId is required' }, { status: 400 });
    }

    const salon = await prisma.salon.findUnique({
      where: { id: salonId },
      select: { isOpen: true, slotDuration: true }
    });

    if (!salon) {
      return NextResponse.json({ success: false, error: 'Salon not found' }, { status: 404 });
    }

    const entries = await prisma.queueEntry.findMany({
      where: {
        salonId,
        status: { in: ['waiting', 'in_service'] }
      },
      orderBy: { position: 'asc' },
      include: {
        barber: { select: { id: true, name: true, status: true } }
      }
    });

    const waitingCount = entries.filter((e: any) => e.status === 'waiting').length;

    const stats = {
      totalWaiting: waitingCount,
      estimatedWaitMinutes: waitingCount * salon.slotDuration,
      isOpen: salon.isOpen
    };

    return NextResponse.json({ success: true, data: { entries, stats } }, { status: 200 });
  } catch (error) {
    console.error('[QUEUE_GET_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
