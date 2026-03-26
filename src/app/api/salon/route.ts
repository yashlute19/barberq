import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const updateSalonSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  tagline: z.string().optional(),
  isOpen: z.boolean().optional(),
  maxQueueSize: z.number().min(1).optional(),
  slotDuration: z.number().min(15).max(120).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get('salonId') || process.env.NEXT_PUBLIC_SALON_ID!;

    const salon = await prisma.salon.findUnique({
      where: { id: salonId }
    });

    if (!salon) return NextResponse.json({ success: false, error: 'Salon not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: salon });
  } catch (error: any) {
    console.error('[SALON_GET_ERROR]', { message: error.message, stack: error.stack });
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAuth();

    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get('salonId') || process.env.NEXT_PUBLIC_SALON_ID!;

    const body = await req.json();
    const parsed = updateSalonSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const salon = await prisma.salon.update({
      where: { id: salonId },
      data: parsed.data
    });

    return NextResponse.json({ success: true, data: salon });
  } catch (error: any) {
    if (error.message === 'Unauthorized') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    console.error('[SALON_PUT_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
