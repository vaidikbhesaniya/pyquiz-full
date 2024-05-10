import { PrismaClient } from "@prisma/client";
function singletonPrismaClient() {
    return new PrismaClient();
}
const prisma = globalThis.prismaGlobal ?? singletonPrismaClient();
export default prisma;
if (process.env.NODE_ENV !== "production")
    globalThis.prismaGlobal = prisma;
