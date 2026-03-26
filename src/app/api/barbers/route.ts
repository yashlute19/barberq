import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const createBarberSchema = z.object({
  salonId: z.string(),
  name: z.string().min(2),
  role: z.string()
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get('salonId');

    if (!salonId) {
      return NextResponse.json({ success: false, error: 'salonId required' }, { status: 400 });
    }

    const barbers = await prisma.barber.findMany({
      where: { salonId, isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: barbers });
  } catch (error) {
    console.error('[BARBERS_GET_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth();

    const body = await req.json();
    const parsed = createBarberSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const barber = await prisma.barber.create({
      data: {
        ...parsed.data,
        passwordHash: 'PBKDF2_PLACEHOLDER_CHANGE_ON_FIRST_LOGIN'
      }
    });

    // Create default schedule (7 days)
    const schedules = Array.from({ length: 7 }).map((_, i) => ({
      barberId: barber.id,
      dayOfWeek: i,
      startTime: '09:00',
      endTime: '18:00',
      isDayOff: i === 0 || i === 6 // Weekend off by default
    }));

    await prisma.schedule.createMany({ data: schedules });

    return NextResponse.json({ success: true, data: barber });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    console.error('[BARBERS_POST_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
