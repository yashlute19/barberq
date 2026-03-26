import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  status: z.enum(['waiting', 'in_service', 'done', 'removed']),
  barberId: z.string().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // params is not promise in next14 usually, but await if params might be promise
    
    const body = await req.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { status, barberId } = parsed.data;

    const existing = await prisma.queueEntry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Queue entry not found' }, { status: 404 });
    }

    let servedAt = existing.servedAt;
    
    if (existing.status !== 'in_service' && status === 'in_service') {
      servedAt = new Date();
    }

    const updated = await prisma.queueEntry.update({
      where: { id },
      data: {
        status,
        ...(barberId !== undefined ? { barberId } : {}),
        servedAt
      },
      include: {
        barber: { select: { id: true, name: true, status: true } }
      }
    });

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error('[QUEUE_UPDATE_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
