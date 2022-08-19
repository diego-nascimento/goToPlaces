import { NewPrismaCliente } from '../../../'
import { IError, errorType } from '../../../../../../application/errorHandling/protocols'
import { IcheckLocationExistsInfra, ICheckLocationExistsParams } from '../../../../../../domain/location/protocols'

export class CheckLocationExistsInfra implements IcheckLocationExistsInfra {
  private readonly error500: IError

  constructor (error500: IError) {
    this.error500 = error500
  }

  async check (data: ICheckLocationExistsParams): Promise<boolean | errorType> {
    const { prisma } = NewPrismaCliente()
    prisma.$connect()
    try {
      const response = await prisma.location.findFirst({
        where: {
          id: data.id || undefined,
          latitude: data.location?.latitude || undefined,
          longitude: data.location?.longitude || undefined,
          name: data.location?.name
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
