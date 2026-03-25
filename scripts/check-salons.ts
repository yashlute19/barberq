import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const salons = await prisma.salon.findMany()
  console.log('Salons:', JSON.stringify(salons, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
