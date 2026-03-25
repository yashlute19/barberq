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
    const all = await prisma.queueEntry.findMany()
    console.log('ALL QueueEntries in DB:', JSON.stringify(all, null, 2))
  } catch (err) {
    console.error(err)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

main()
