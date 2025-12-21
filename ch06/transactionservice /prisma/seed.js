// prisma/seed.ts
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
// initialize Prisma Client
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prismaClient = new PrismaClient({ adapter });
async function seedData() {
    // create two dummy recipes
    const first_transaction = await prismaClient.transaction.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            status: 'CREATED',
            accountId: '662c081370bd2ba6b5f04e94',
            description: 'simple transaction'
        }
    });
    console.log(first_transaction);
}
// execute the seed function
seedData()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    // close Prisma Client at the end
    await prismaClient.$disconnect();
});
//# sourceMappingURL=seed.js.map