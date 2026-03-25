require('dotenv').config()
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('@prisma/client')

async function main() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is not defined')

  const pool = new Pool({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    console.log('Seeding salon-1...')
    const salon = await prisma.salon.upsert({
      where: { id: 'salon-1' },
      update: {},
      create: {
        id: 'salon-1',
        name: 'Precision Atelier',
        tagline: 'Modern Master Barbering',
        maxQueueSize: 20,
      },
    })
    console.log('Created Salon:', salon.id)

    const barber = await prisma.barber.upsert({
      where: { id: 'barber-1' },
      update: {},
      create: {
        id: 'barber-1',
        salonId: 'salon-1',
        name: 'Marco (Master)',
        role: 'admin',
        passwordHash: 'hashed-password',
      },
    })
    console.log('Created Barber:', barber.id)

  } catch (err) {
    console.error('Seeding failed:', err)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()
