import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const updateBarberSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.string().optional(),
  isActive: z.boolean().optional()
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth();

    const body = await req.json();
    const parsed = updateBarberSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const barber = await prisma.barber.update({
      where: { id: params.id },
      data: parsed.data
    });

    return NextResponse.json({ success: true, data: barber });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    console.error('[BARBER_PATCH_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth();

    // Soft delete
    const barber = await prisma.barber.update({
      where: { id: params.id },
      data: { isActive: false }
    });

    return NextResponse.json({ success: true, data: barber });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    console.error('[BARBER_DELETE_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
