import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const reorderSchema = z.object({
  entries: z.array(z.object({
    id: z.string(),
    position: z.number().int().min(1)
  }))
});

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = reorderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { entries } = parsed.data;

    await prisma.$transaction(
      entries.map((entry) =>
        prisma.queueEntry.update({
          where: { id: entry.id },
          data: { position: entry.position },
        })
      )
    );

    return NextResponse.json({ success: true, data: { message: 'Reordered' } }, { status: 200 });
  } catch (error) {
    console.error('[QUEUE_REORDER_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
