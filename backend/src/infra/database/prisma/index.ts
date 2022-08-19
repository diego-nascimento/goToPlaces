import { PrismaClient } from '@prisma/client'

export function NewPrismaCliente () {
  return { prisma: new PrismaClient() }
}
