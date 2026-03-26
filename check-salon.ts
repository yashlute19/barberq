import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const salons = await prisma.salon.findMany();
  console.log('SALONS:', salons);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
