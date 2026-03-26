const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
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
  console.log('Seeded Salon:', salon)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
