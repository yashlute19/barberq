import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import * as dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

async function main() {
  // --- Salon ---
  const salon = await prisma.salon.upsert({
    where: { id: 'default-salon' },
    update: {},
    create: {
      id: 'default-salon',
      name: 'BarberQ Atelier',
      phone: '+91 99999 99999',
      address: 'Precision Street, Elite Hub',
      tagline: 'Precision is our craft.',
      slotDuration: 30,
      maxQueueSize: 10,
    },
  })
  console.log('Seeded Salon:', salon.name)

  // --- Barbers ---
  const passwordHash = await bcrypt.hash('barberq123', 12)

  const barbers = [
    { name: 'Arjun Sharma', phone: '9876543210', role: 'owner' },
    { name: 'Rahul Verma',  phone: '9876543211', role: 'barber' },
    { name: 'Ahmed Khan',   phone: '9876543212', role: 'barber' },
    { name: 'Rohan Das',    phone: '9876543213', role: 'barber' },
  ]

  for (const b of barbers) {
    const barber = await prisma.barber.upsert({
      where: { id: `barber-${b.name.toLowerCase().replace(' ', '-')}` },
      update: {},
      create: {
        id: `barber-${b.name.toLowerCase().replace(' ', '-')}`,
        salonId: salon.id,
        name: b.name,
        phone: b.phone,
        role: b.role,
        status: 'available',
        passwordHash,
      },
    })

    // Delete existing schedule for this barber then recreate
    // (safe to re-run)
    await prisma.schedule.deleteMany({ where: { barberId: barber.id } })
    await prisma.schedule.createMany({
      data: Array.from({ length: 7 }, (_, day) => ({
        barberId: barber.id,
        dayOfWeek: day,
        startTime: '09:00',
        endTime:   '20:00',
        isDayOff:  day === 0, // Sunday off
      })),
    })

    console.log('Seeded Barber:', barber.name)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })