import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const scheduleSchema = z.array(
  z.object({
    id: z.string(),
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string(),
    endTime: z.string(),
    isDayOff: z.boolean(),
  })
);

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;

    const schedule = await prisma.schedule.findMany({
      where: { barberId: id },
      orderBy: { dayOfWeek: 'asc' },
    });

    return NextResponse.json({ success: true, data: schedule });
  } catch (error: any) {
    if (error.message === 'Unauthorized')
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );

    console.error('[SCHEDULE_GET_ERROR]', error);

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;

    const body = await req.json();
    const parsed = scheduleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const updates = parsed.data.map((schedule) =>
      prisma.schedule.update({
        where: { id: schedule.id },
        data: {
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          isDayOff: schedule.isDayOff,
        },
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({
      success: true,
      data: { message: 'Schedule updated' },
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized')
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );

    console.error('[SCHEDULE_PUT_ERROR]', error);

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}