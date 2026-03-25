import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, barberId } = body

    if (!id) {
      return NextResponse.json({ error: 'Entry ID is required' }, { status: 400 })
    }

    const updatedEntry = await prisma.queueEntry.update({
      where: { id },
      data: {
        status,
        barberId,
        servedAt: status === 'in_service' ? new Date() : undefined,
      },
    })

    return NextResponse.json(updatedEntry)
  } catch (error) {
    console.error('Queue Update Error:', error)
    return NextResponse.json({ error: 'Failed to update queue entry' }, { status: 500 })
  }
}
