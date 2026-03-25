import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
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

  await prisma.barber.upsert({
    where: { id: 'barber-1' },
    update: {},
    create: {
      id: 'barber-1',
      salonId: salon.id,
      name: 'Marco (Master)',
      role: 'admin',
      passwordHash: 'hashed-password',
    },
  })

  await prisma.barber.upsert({
    where: { id: 'barber-2' },
    update: {},
    create: {
      id: 'barber-2',
      salonId: salon.id,
      name: 'Dante',
      role: 'barber',
      passwordHash: 'hashed-password',
    },
  })

  console.log('Seeded default salon and barbers')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
