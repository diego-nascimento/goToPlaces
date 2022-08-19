import { Event } from '../../../domain/event'
import { newEventEntryType, EventType } from '../../../domain/event/model/create'
import { IcreateEvent, IcreateEventInfra } from '../../../domain/event/protocols'
import { IcheckLocationExists } from '../../../domain/location/protocols'
import { IcheckUserExists } from '../../../domain/user/protocols'
import { errorType, IError } from '../../errorHandling/protocols'

export class CreateEventApplication implements IcreateEvent {
  private readonly createEvent: IcreateEventInfra
  private readonly checkUserExists: IcheckUserExists
  private readonly checkLocationExists: IcheckLocationExists
  private readonly createError409: IError
  private readonly createError500: IError

  constructor (checkUserExists: IcheckUserExists, createError409: IError, createError500: IError, createEvent: IcreateEventInfra, checkLocationExists: IcheckLocationExists) {
    this.createEvent = createEvent
    this.checkUserExists = checkUserExists
    this.createError409 = createError409
    this.createError500 = createError500
    this.checkLocationExists = checkLocationExists
  }

  async create (data: newEventEntryType): Promise<EventType | errorType> {
    try {
      const eventDomain = new Event(data)
      const userExists = await this.checkUserExists.check(data.responsable)
      if (!userExists) return this.createError409.createError('User not found')
      const locationExists = await this.checkLocationExists.check({
        id: data.location
      })
      if (!locationExists) return this.createError409.createError('Location does not exists')
      const event = await this.createEvent.create(eventDomain.asJSON())
      return event
    } catch (error) {
      return error instanceof Error && error.message !== ''
        ? this.createError500.createError(error.message)
        : this.createError500.createError('Something went wrong')
    }
  }
}
