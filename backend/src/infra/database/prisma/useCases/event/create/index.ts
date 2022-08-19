import { newEventEntryType, EventType } from '../../../../../../domain/event/model/create'
import { IcreateEventInfra } from '../../../../../../domain/event/protocols'
import { NewPrismaCliente } from '../../../'
import { IError, errorType } from '../../../../../../application/errorHandling/protocols'

export class createEventInfra implements IcreateEventInfra {
  private readonly error500: IError

  constructor (error500: IError) {
    this.error500 = error500
  }

  async create (data: newEventEntryType): Promise<EventType | errorType> {
    const { prisma } = NewPrismaCliente()
    prisma.$connect()
    try {
      const response = await prisma.event.create({
        data: {
          name: data.name,
          price: data.price,
          responsable: {
            connect: {
              id: data.responsable
            }
          },
          location: {
            connect: {
              id: data.location
            }
          }
        },
        include: {
          location: {
            select: {
              id: true,
              name: true,
              latitude: true,
              longitude: true,
              photos: true
            }
          }
        }
      })

      return {
        id: response.id,
        name: response.name,
        price: response.price,
        location: response.location
      }
    } catch (error) {
      return error instanceof Error
        ? this.error500.createError(error.message)
        : this.error500.createError('Something went wrong')
    } finally {
      prisma.$disconnect()
    }
  }
}
