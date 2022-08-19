import { Event } from '../../../../domain/event'
import { newEventEntryType, EventType } from '../../../../domain/event/model/event/create'
import { IcreateEvent, IcreateEventInfra } from '../../../../domain/event/protocols'
import { IcheckUserExists } from '../../../../domain/user'
import { errorType, IError } from '../../../errorHandling/protocols'

export class CreateEventApplication implements IcreateEvent {
  private readonly createEvent: IcreateEventInfra
  private readonly checkUserExists: IcheckUserExists
  private readonly createError404: IError
  private readonly createError500: IError

  constructor (checkUserExists: IcheckUserExists, createUser404: IError, createError500: IError, createEvent: IcreateEventInfra) {
    this.createEvent = createEvent
    this.checkUserExists = checkUserExists
    this.createError404 = createUser404
    this.createError500 = createError500
  }

  async create (data: newEventEntryType): Promise<EventType | errorType> {
    try {
      const eventDomain = new Event(data)
      const userExists = await this.checkUserExists.check(data.responsable)
      if (!userExists) return this.createError404.createError('User not found')
      const event = await this.createEvent.create(eventDomain.asJSON())
      return event
    } catch (error) {
      return error instanceof Error
        ? this.createError500.createError(error.message)
        : this.createError500.createError('Something went wrong')
    }
  }
}
