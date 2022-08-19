import { NewPrismaCliente } from '../../../'
import { IError, errorType } from '../../../../../../application/errorHandling/protocols'
import { IcreateLocationInfra } from '../../../../../../domain/location/protocols'
import { newLocationType, locationType } from '../../../../../../domain/location/model'

export class createLocationInfra implements IcreateLocationInfra {
  private readonly error500: IError

  constructor (error500: IError) {
    this.error500 = error500
  }

  async create (data: newLocationType): Promise<locationType | errorType> {
    const { prisma } = NewPrismaCliente()
    prisma.$connect()
    try {
      const photos = data.photos?.map((photo: number) => ({ id: photo }))
      const response = await prisma.location.create({
        data: {
          latitude: data.latitude,
          longitude: data.longitude,
          name: data.name,
          photos: {
            connect: photos
          }
        },
        include: {
          photos: true
        }
      })
      return response
    } catch (error) {
      return error instanceof Error
        ? this.error500.createError(error.message)
        : this.error500.createError('Something went wrong')
    } finally {
      prisma.$disconnect()
    }
  }
}
