import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    try {

    } catch (err) {
        console.log(err);
    } finally {
        async () => {
            await prisma.$disconnect();
        }
    }
}

main();