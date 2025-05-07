import { PrismaClient } from '@prisma/client'

const globalForPrisma:any = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV == "production")
globalForPrisma.prisma =  prisma;

// const prisma = new PrismaClient();

export default prisma;