import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const salonId = searchParams.get('salonId')

    if (!salonId) {
      return NextResponse.json({ error: 'Salon ID is required' }, { status: 400 })
    }

    const queue = await prisma.queueEntry.findMany({
      where: {
        salonId,
        status: { in: ['waiting', 'in_service'] },
      },
      orderBy: {
        position: 'asc',
      },
      include: {
        barber: true,
      },
    })

    return NextResponse.json(queue)
  } catch (error) {
    console.error('Queue Fetch Error:', error)
    return NextResponse.json({ error: 'Failed to fetch queue' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { entries } = body // Expected: [{ id: string, position: number }, ...]

    if (!Array.isArray(entries)) {
      return NextResponse.json({ error: 'Invalid entries format' }, { status: 400 })
    }

    // Transaction to update positions
    await prisma.$transaction(
      entries.map((entry) =>
        prisma.queueEntry.update({
          where: { id: entry.id },
          data: { position: entry.position },
        })
      )
    )

    return NextResponse.json({ message: 'Queue reordered' })
  } catch (error) {
    console.error('Queue Reorder Error:', error)
    return NextResponse.json({ error: 'Failed to reorder queue' }, { status: 500 })
  }
}
