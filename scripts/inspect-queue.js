require('dotenv').config()
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('@prisma/client')

async function main() {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    const counts = await prisma.queueEntry.groupBy({
      by: ['status'],
      where: { salonId: 'salon-1' },
      _count: true
    })
    console.log('Queue counts for salon-1:', counts)

    const queue = await prisma.queueEntry.findMany({
      where: { 
        salonId: 'salon-1',
        status: { in: ['waiting', 'in_service'] }
      },
      orderBy: { position: 'asc' }
    })
    console.log('Active Queue for salon-1:', queue.length, 'entries')
    queue.forEach(e => {
      console.log(`ID: ${e.id}, Name: ${e.customerName}, Pos: ${e.position}, Status: ${e.status}`)
    })
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()
