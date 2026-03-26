import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined')
}

// In Prisma 7, direct database connections (like PostgreSQL) require an adapter.
// We use 'pg' with @prisma/adapter-pg to connect to Supabase.
const pool = new Pool({ 
  connectionString,
  // Supabase/AWS often requires SSL for direct connections.
  ssl: {
    rejectUnauthorized: false
  }
})
const adapter = new PrismaPg(pool as any)

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma