import { NewPrismaCliente } from '../../../'
import { IError, errorType } from '../../../../../../application/errorHandling/protocols'
import { IcheckUserExistsInfra } from '../../../../../../domain/user/protocols'

export class CheckUserExistsInfra implements IcheckUserExistsInfra {
  private readonly error500: IError

  constructor (error500: IError) {
    this.error500 = error500
  }

  async check (id: number): Promise<boolean | errorType> {
    const { prisma } = NewPrismaCliente()
    prisma.$connect()
    try {
      const response = await prisma.user.findFirst({
        where: {
          id
        }
      })
      return !!response
    } catch (error) {
      return error instanceof Error
        ? this.error500.createError(error.message)
        : this.error500.createError('Something went wrong')
    } finally {
      prisma.$disconnect()
    }
  }
}
