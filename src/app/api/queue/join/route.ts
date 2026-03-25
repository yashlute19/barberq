import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { salonId, customerName, customerPhone, barberId } = body

    if (!salonId || !customerName) {
      return NextResponse.json({ error: 'Salon ID and Customer Name are required' }, { status: 400 })
    }

    // Get the current max position to place new entry at the end
    const lastEntry = await prisma.queueEntry.aggregate({
      where: {
        salonId,
        status: { in: ['waiting', 'in_service'] },
      },
      _max: {
        position: true,
      },
    })

    const newPosition = (lastEntry._max.position || 0) + 1

    const newEntry = await prisma.queueEntry.create({
      data: {
        salonId,
        customerName,
        customerPhone,
        barberId,
        position: newPosition,
        status: 'waiting',
      },
    })

    return NextResponse.json(newEntry)
  } catch (error) {
    console.error('Queue Join Error:', error)
    return NextResponse.json({ error: 'Failed to join queue' }, { status: 500 })
  }
}
